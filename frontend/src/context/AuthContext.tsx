import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/api';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  streak?: number;
  targetExam?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (user: UserProfile, token?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => authService.getUser());

  useEffect(() => {
    const stored = authService.getUser();
    if (stored) {
      setUser(stored);
    }
  }, []);

  const login = (newUser: UserProfile, token?: string) => {
    authService.setUser(newUser, token);
    setUser(newUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
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
