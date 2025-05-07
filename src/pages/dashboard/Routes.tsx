import { createRoute } from '@tanstack/react-router';
import { root } from '@/router/routes/Root.tsx';

export const dashboardRoute = createRoute({
  getParentRoute: () => root,
  path: '/',
}).lazy(() => import('./Index').then(d => d.Route));
