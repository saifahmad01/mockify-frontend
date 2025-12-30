import React, { createContext } from 'react';
import type { User, AuthResponse } from '@/api/types';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import {
  useCurrentUser,
  useLogin,
  useLogout,
  useRegister,
} from '@/hooks/use-auth';
import { useAuthBootstrap } from '@/hooks/use-auth';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading: bootstrapping } = useAuthBootstrap();
  const { data: user, isLoading: userLoading } = useCurrentUser({
    enabled: !bootstrapping,
  });

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  if (bootstrapping || userLoading) {
    return <LoadingSpinner fullScreen />;
  }

  const value: AuthContextType = {
    user: user ?? null,
    isAuthenticated: !!user,
    isLoading: bootstrapping || userLoading,

    login: (email, password) => loginMutation.mutateAsync({ email, password }),

    register: (name, email, password) =>
      registerMutation.mutateAsync({ name, email, password }),

    logout: () => logoutMutation.mutateAsync(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
