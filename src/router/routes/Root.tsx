import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';
import RootLayout from '@/components/ui/layout/root-layout.tsx';
import { ProtectedRoute } from '@/modules/auth/ProtectedRoute.tsx';
import { AuthProvider } from '@/providers/AuthProvider.tsx';

export interface QueryClientContext {
  queryClient: QueryClient;
}

export const root = createRootRouteWithContext<QueryClientContext>()({
  component: () => (
    <AuthProvider>
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    </AuthProvider>
  ),
});
