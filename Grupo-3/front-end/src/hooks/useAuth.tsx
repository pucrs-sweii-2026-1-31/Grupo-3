import React, { createContext, useContext, useMemo, useState } from 'react';
import { authService } from '../services/authService';
import { tokenStorage } from '../services/tokenStorage';
import { LoginCredentials, RegisterCredentials, UserSummary } from '../types/auth';

interface AuthContextValue {
  token: string | null;
  authenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<string>;
  register: (credentials: RegisterCredentials) => Promise<UserSummary>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => tokenStorage.getToken());

  const value = useMemo<AuthContextValue>(() => ({
    token,
    authenticated: Boolean(token),
    async login(credentials) {
      const response = await authService.login(credentials);
      tokenStorage.setToken(response.token);
      setToken(response.token);
      return response.token;
    },
    async register(credentials) {
      return authService.register(credentials);
    },
    logout() {
      tokenStorage.clearToken();
      setToken(null);
    },
  }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }

  return context;
}
