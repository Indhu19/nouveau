import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { SplashScreen } from '@/components/ui/layout/loader/splash-screen.tsx';
import { useSmallLogo } from '@/hooks/useLogo.ts';
import { splashScreenConfig } from '@/lib/splashScreenConfig.ts';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const logo = useSmallLogo();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      const desired = window.location.pathname + window.location.search;
      const excludedPaths = ['/logout'];
      void loginWithRedirect({
        appState: {
          returnTo: excludedPaths.includes(desired) ? '/' : desired,
        },
      });
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading || !isAuthenticated) {
    return <SplashScreen isLoading={isLoading} logoSrc={logo} {...splashScreenConfig} />;
  }

  return <>{children}</>;
};
