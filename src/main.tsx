import '@/index.css';
import '@/configs/instrument';
import '@/configs/i18n';

import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { LazyMotion } from 'motion/react';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { SplashScreen } from '@/components/splash-screen.tsx';
import { authConfig } from '@/configs/auth';
import { getSentryHandlers } from '@/configs/instrument';
import { splashConfig } from '@/configs/splash';
import { queryClient } from '@/lib/queryClient';
import { AuthProvider } from '@/providers/auth.tsx';
import { ThemeProvider } from '@/providers/theme.tsx';
import { router } from '@/routes/router';

const loadAnimationFeatures = () => import('@/configs/animation.ts').then(res => res.default);

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');
  return worker.start();
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const sentryHandlers = await getSentryHandlers();
const root = createRoot(rootElement, sentryHandlers);

void enableMocking().then(() => {
  root.render(
    <StrictMode>
      <Suspense fallback={<SplashScreen {...splashConfig} />}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Auth0Provider {...authConfig}>
              <AuthProvider>
                <LazyMotion features={loadAnimationFeatures} strict>
                  <RouterProvider router={router} />
                </LazyMotion>
              </AuthProvider>
            </Auth0Provider>
          </ThemeProvider>
        </QueryClientProvider>
      </Suspense>
    </StrictMode>
  );
});
