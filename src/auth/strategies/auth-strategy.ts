export interface AuthStrategy {
  // Clean up on logout
  cleanup(): void;

  // Get the token for API requests
  getAuthToken(): null | string;

  // Initialize the strategy with Auth0 token
  initialize(auth0Token: string): Promise<void> | void;
}

export interface AuthStrategyConfig {
  apiBaseUrl: string;
  tokenExchangeEndpoint?: string;
  type?: 'aws-jwt' | 'custom' | 'django-token-exchange';
}
