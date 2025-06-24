export const authConfig = {
  audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  authorizationParams: {
    redirect_uri: window.location.origin
  },
  cacheLocation: 'localstorage' as const,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  scope: 'openid profile email',
  useRefreshTokens: true
};
