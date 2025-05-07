// export function ErrorFallback({
//   error,
//   resetErrorBoundary,
// }: {
//   error: Error;
//   resetErrorBoundary: () => void;
// }) {
//   Sentry.captureException(error);
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4">
//       <div className="max-w-md w-full bg-card p-6 rounded-lg shadow-lg border">
//         <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
//         <div className="bg-muted p-3 rounded mb-4 overflow-auto">
//           <pre className="text-sm">{error.message}</pre>
//         </div>
//         <div className="flex justify-end">
//           <Button onClick={resetErrorBoundary}>Try again</Button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useMemo } from 'react';
import { ErrorCard } from '@/modules/errors/ErrorCard.tsx';

export function ErrorFallback({
  error,
  componentStack,
  resetError,
}: {
  error: unknown;
  componentStack: string;
  eventId: string;
  resetError: () => void;
}) {
  const realError = useMemo(() => {
    return error instanceof Error ? error : new Error(String(error));
  }, [error]);

  return (
    <div className="min-h-screen">
      <ErrorCard
        message={realError.message}
        stack={componentStack}
        onHome={() => (window.location.href = '/')}
        onRetry={resetError}
        className="min-h-screen"
      />
    </div>
  );
}
