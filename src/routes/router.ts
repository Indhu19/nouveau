import { createRouter } from '@tanstack/react-router';
import { createRootRoute } from '@tanstack/react-router';

import { queryClient } from '@/lib/queryClient';
import NotFoundPage from '@/pages/404.tsx';
import { dashboardRoute, formBuilderRoute, indexRoute } from '@/routes/protected.ts';
import { logoutRoute } from '@/routes/public.ts';
import { formViewRoute } from '@/routes/standalone.ts';

export const rootRoute = createRootRoute();

const routeTree = rootRoute.addChildren([indexRoute.addChildren([dashboardRoute, formBuilderRoute]), logoutRoute, formViewRoute]);

export const router = createRouter({
  context: {
    queryClient
  },
  defaultNotFoundComponent: NotFoundPage,
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  routeTree,
  scrollRestoration: true
});
