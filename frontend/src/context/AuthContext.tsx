import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, authApi } from '@/services/api';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  streak?: number;
  targetExam?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<UserProfile>;
  register: (name: string, email: string, password: string, targetExam?: string) => Promise<UserProfile>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => authService.getUser());
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const token = authService.getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const data = await authApi.getMe();
      if (data?.user) {
        setUser(data.user);
        authService.setUser(data.user, token);
      } else {
        authService.logout();
        setUser(null);
      }
    } catch (err) {
      console.warn('Session verification failed, cleared local session:', err);
      authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string): Promise<UserProfile> => {
    const res = await authApi.login({ email, password });
    authService.setUser(res.user, res.token);
    setUser(res.user);
    return res.user;
  };

  const register = async (name: string, email: string, password: string, targetExam?: string): Promise<UserProfile> => {
    const res = await authApi.register({ name, email, password, targetExam });
    authService.setUser(res.user, res.token);
    setUser(res.user);
    return res.user;
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

