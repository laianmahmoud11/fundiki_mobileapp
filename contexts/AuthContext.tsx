import { createContext, useContext } from 'react';
import { useEmailAuth } from '@/hooks/use-auth-email';
import { UseMutationResult } from '@tanstack/react-query';
import { AppUser } from '@/types/user';

interface AuthContextType {
  login: UseMutationResult<AppUser, Error, { email: string; password: string; }, unknown>;
  signup: UseMutationResult<AppUser, Error, { email: string; password: string; }, unknown>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const loginMutation = useEmailAuth("login");
  const signupMutation = useEmailAuth("signup");

  const value: AuthContextType = {
    login: loginMutation,
    signup: signupMutation,
    isLoading: loginMutation.isPending || signupMutation.isPending
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() { 
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
}