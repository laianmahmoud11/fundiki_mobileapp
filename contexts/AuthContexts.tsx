import { createContext, useContext } from 'react';
import { useAuthEmail } from '@/hooks/use-auth-email';

interface AuthContextType {
  login: any;
  signup: any;
  logout: any;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { login, signup, logout } = useAuthEmail();

  const value: AuthContextType = {
    login,
    signup,
    logout,
    isLoading: login.isPending || signup.isPending
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() { // 👈 useAuthContext مش useAuth
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
}