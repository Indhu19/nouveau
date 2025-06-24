import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 1 // Only retry failed mutations once
    },
    queries: {
      retry: 1 // Only retry failed requests once
    }
  }
});
