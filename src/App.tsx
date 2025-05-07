import * as Sentry from '@sentry/react';
import { ErrorFallback } from '@/modules/errors/SentryFallback.tsx';
import { AppRouterProvider } from '@/providers/AppRouterProvider.tsx';

function App() {
  return (
    <Sentry.ErrorBoundary fallback={ErrorFallback}>
      <AppRouterProvider />
    </Sentry.ErrorBoundary>
  );
}

export default App;
