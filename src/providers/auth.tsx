import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';

import { AuthStrategyManager } from '@/auth/strategies/auth-strategy-manager.ts';
import { AuthStrategyConfig } from '@/auth/strategies/auth-strategy.ts';
import { AuthContext } from '@/contexts/auth.ts';

const getAuthConfig = (): AuthStrategyConfig => {
  const authType = import.meta.env.VITE_AUTH_TYPE as AuthStrategyConfig['type'];

  return {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    tokenExchangeEndpoint: import.meta.env.VITE_TOKEN_EXCHANGE_ENDPOINT,
    type: authType ?? 'django-token-exchange'
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    error: auth0Error,
    getAccessTokenSilently,
    isAuthenticated: auth0Authenticated,
    isLoading: auth0Loading,
    loginWithRedirect,
    logout: auth0Logout,
    user
  } = useAuth0();

  const [strategyManager] = useState(() => new AuthStrategyManager(getAuthConfig()));
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Initialize strategy when authenticated
  useEffect(() => {
    const initializeAuth = async () => {
      if (auth0Authenticated && !isInitialized) {
        try {
          const auth0Token = await getAccessTokenSilently();
          const strategy = strategyManager.getStrategy();

          await strategy.initialize(auth0Token);
          setIsInitialized(true);
          setError(null);
        } catch (err) {
          console.error('Auth initialization failed:', err);
          setError(err as Error);
        }
      }
    };

    void initializeAuth();
  }, [auth0Authenticated, isInitialized, getAccessTokenSilently, strategyManager]);

  const login = () => {
    void loginWithRedirect();
  };

  const logout = () => {
    strategyManager.getStrategy().cleanup();
    void auth0Logout({
      logoutParams: {
        returnTo: `${window.location.origin}/logout`
      }
    });
  };

  const authToken = strategyManager.getStrategy().getAuthToken();
  const isLoading = auth0Loading || (auth0Authenticated && !isInitialized);
  const isAuthenticated = auth0Authenticated && isInitialized && !!authToken;

  return (
    <AuthContext.Provider
      value={{
        error: error ?? auth0Error,
        isAuthenticated,
        isLoading,
        login,
        logout,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
