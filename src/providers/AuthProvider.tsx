import { AppState, Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from '@tanstack/react-router';
import { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN as string;
const clientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID as string;
const redirectUri = import.meta.env.VITE_APP_AUTH0_CALLBACK_URL as string;
const audience = import.meta.env.VITE_APP_AUTH0_AUDIENCE as string;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState?: AppState) => {
    void navigate({
      to: appState?.returnTo ?? '/',
    });
  };
  if (!(domain && clientId && redirectUri && audience)) return null;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: redirectUri,
        scope: 'openid profile email core.view_user_form',
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
