import { User } from '@auth0/auth0-react';
import { createContext } from 'react';

interface AuthContextType {
  error: Error | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  user: undefined | User;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
