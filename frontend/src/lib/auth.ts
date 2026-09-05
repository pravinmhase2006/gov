/**
 * Authentication and Session Management Utility for GovtPrep
 * Provides secure token decoding, cookie/localStorage synchronization,
 * role validation, and route protection guards.
 */

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN' | string;
  isVerified?: boolean;
  streak?: number;
  targetExam?: string;
  createdAt?: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
  name?: string;
  iat?: number;
  exp?: number;
  [key: string]: unknown;
}

export const AUTH_TOKEN_KEY = 'govtprep_token';
export const AUTH_USER_KEY = 'govtprep_user';
export const AUTH_COOKIE_NAME = 'govtprep_token';

/**
 * Safely retrieves a cookie value by name in browser environments.
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + encodeURIComponent(name) + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Safely sets a cookie with configurable expiry and SameSite attributes.
 */
export function setCookie(name: string, value: string, days = 7): void {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

/**
 * Removes a cookie by setting its expiry in the past.
 */
export function removeCookie(name: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

/**
 * Safely parses and decodes a JWT payload with Unicode support.
 */
export function parseJwtPayload<T = JwtPayload>(token: string): T | null {
  try {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload) as T;
  } catch {
    return null;
  }
}

/**
 * Checks if a JWT token has expired based on its `exp` claim.
 */
export function isTokenExpired(token: string): boolean {
  const payload = parseJwtPayload<JwtPayload>(token);
  if (!payload || !payload.exp) return false;
  // payload.exp is in seconds, convert to milliseconds
  return Date.now() >= payload.exp * 1000;
}

/**
 * Retrieves the current active auth token from localStorage or cookies.
 */
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem(AUTH_TOKEN_KEY) || getCookie(AUTH_COOKIE_NAME);
  if (token && isTokenExpired(token)) {
    clearAuth();
    return null;
  }
  return token;
}

/**
 * Stores the authentication token and optional user profile.
 */
export function setAuthToken(token: string, user?: AuthUser | null): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  setCookie(AUTH_COOKIE_NAME, token, 7);

  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }
}

/**
 * Clears all authentication state from cookies and localStorage.
 */
export function clearAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  removeCookie(AUTH_COOKIE_NAME);
}

/**
 * Retrieves the current logged in user from cached storage or decoded JWT.
 */
export function getCurrentUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;

  const token = getToken();
  if (!token) return null;

  // 1. Try retrieving the full structured user object from localStorage
  try {
    const rawUser = localStorage.getItem(AUTH_USER_KEY);
    if (rawUser) {
      const parsed = JSON.parse(rawUser) as AuthUser;
      if (parsed && parsed.id && parsed.email) {
        return parsed;
      }
    }
  } catch {
    // Ignore JSON parse error and fallback to JWT decoding
  }

  // 2. Fallback: Parse from JWT payload
  const payload = parseJwtPayload<JwtPayload>(token);
  if (!payload || !payload.id) return null;

  return {
    id: payload.id,
    name: payload.name || payload.email.split('@')[0] || 'User',
    email: payload.email,
    role: (payload.role as 'USER' | 'ADMIN') || 'USER',
    isVerified: true,
  };
}

/**
 * Checks if a user is currently authenticated with a valid token.
 */
export function isAuthenticated(): boolean {
  return !!getToken();
}

/**
 * Checks if the current authenticated user has an ADMIN role.
 */
export function isAdmin(): boolean {
  const user = getCurrentUser();
  return user?.role === 'ADMIN';
}

/**
 * Checks if the current authenticated user has a specific role.
 */
export function hasRole(role: string): boolean {
  const user = getCurrentUser();
  return user?.role === role;
}

/**
 * Helper to construct Authorization header for HTTP requests.
 */
export function getAuthHeader(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Guard that enforces user authentication. Throws if unauthenticated.
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = getCurrentUser();
  if (!user) {
    throw new Error('UNAUTHORIZED');
  }
  return user;
}

/**
 * Guard that enforces ADMIN role. Throws if unauthenticated or not an admin.
 */
export async function requireAdmin(): Promise<AuthUser> {
  const user = getCurrentUser();
  if (!user) {
    throw new Error('UNAUTHORIZED');
  }
  if (user.role !== 'ADMIN') {
    throw new Error('FORBIDDEN');
  }
  return user;
}
