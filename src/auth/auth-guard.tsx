import { useNavigate } from '@tanstack/react-router';
import React, { ReactNode, useEffect } from 'react';

import { SplashScreen } from '@/components/splash-screen.tsx';
import { splashConfig } from '@/configs/splash';
import { useAuth } from '@/hooks/useAuth';
import InternalErrorPage from '@/pages/500.tsx';

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { error, isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      if (window.location.pathname.startsWith('/forms/')) {
        localStorage.setItem('postLoginRedirect', window.location.pathname);
      }
      login();
    }
  }, [isAuthenticated, isLoading, login]);

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = localStorage.getItem('postLoginRedirect');
      if (redirectPath && window.location.pathname === '/') {
        localStorage.removeItem('postLoginRedirect');
        void navigate({ to: redirectPath });
      }
    }
  }, [isAuthenticated, navigate]);

  if (error) {
    return <InternalErrorPage error={error} />;
  }

  if (isLoading || !isAuthenticated) {
    return <SplashScreen {...splashConfig} />;
  }

  return <>{children}</>;
};
