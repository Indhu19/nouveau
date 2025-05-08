import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global default settings for queries
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1, // Only retry failed requests once
      refetchOnWindowFocus: false, // Disable refetching when window regains focus
      refetchOnMount: true, // Refetch on component mount if data is stale
      refetchOnReconnect: true, // Refetch on reconnection if data is stale
    },
    mutations: {
      // Global default settings for mutations
      retry: 1, // Only retry failed mutations once
    },
  },
});
