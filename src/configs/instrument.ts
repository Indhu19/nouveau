export async function getSentryHandlers() {
  if (import.meta.env.PROD) {
    const { reactErrorHandler } = await import('@sentry/react');
    return {
      onCaughtError: reactErrorHandler(),
      onRecoverableError: reactErrorHandler(),
      onUncaughtError: reactErrorHandler((error, errorInfo) => {
        console.warn('Uncaught error', error, errorInfo.componentStack);
      })
    };
  }
  return {};
}

if (import.meta.env.PROD) {
  const {
    addIntegration,
    captureConsoleIntegration,
    init,
    makeBrowserOfflineTransport,
    makeFetchTransport,
    tanstackRouterBrowserTracingIntegration
  } = await import('@sentry/react');

  const { router } = await import('@/routes/router.ts');

  init({
    // dsn: 'https://e9d9f9def621ec688eb7d508b3e90d4e@o528733.ingest.us.sentry.io/4509317086707712',

    integrations: [
      tanstackRouterBrowserTracingIntegration(router),
      captureConsoleIntegration({ levels: ['error'] }) // Only errors in prod
    ],

    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    sendDefaultPii: true,
    tracePropagationTargets: [/^\//, /^https:\/\/yourserver\.io\/api/],
    tracesSampleRate: 0.1,

    transport: makeBrowserOfflineTransport(makeFetchTransport)
  });

  // Lazy load replay integration only when needed
  void import('@sentry/react').then(({ replayIntegration }) => {
    addIntegration(replayIntegration());
  });
}
