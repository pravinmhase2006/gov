/**
 * REST API client helper for React SPA
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('govtprep_token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const authService = {
  getToken: () => localStorage.getItem('govtprep_token'),
  getUser: () => {
    try {
      const user = localStorage.getItem('govtprep_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },
  setUser: (user: any, token?: string) => {
    localStorage.setItem('govtprep_user', JSON.stringify(user));
    if (token) localStorage.setItem('govtprep_token', token);
  },
  logout: () => {
    localStorage.removeItem('govtprep_user');
    localStorage.removeItem('govtprep_token');
  },
  isAuthenticated: () => !!localStorage.getItem('govtprep_token'),
};
