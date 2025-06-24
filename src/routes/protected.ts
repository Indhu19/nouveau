import { createRoute } from '@tanstack/react-router';

import Layout from '@/components/layout';
import { PageNotFoundModal } from '@/pages/404';
import { rootRoute } from '@/routes/router.ts';

export const indexRoute = createRoute({
  component: Layout,
  getParentRoute: () => rootRoute,
  notFoundComponent: PageNotFoundModal,
  path: '/'
});

export const dashboardRoute = createRoute({
  getParentRoute: () => indexRoute,
  path: 'dashboard'
}).lazy(() => import('@/pages/dashboard').then(d => d.Route));

export const formBuilderRoute = createRoute({
  getParentRoute: () => indexRoute,
  path: 'form-builder',
}).lazy(() =>
  import('@/pages/custom-forms/components/form-builder').then(
    (mod) => mod.Route
  )
);

// export const formViewRoute = createRoute({
//   getParentRoute: () => indexRoute,
//   path: 'forms/$formId',
// }).lazy(() =>
//   import('@/pages/custom-forms/components/form-view').then(
//     (mod) => mod.Route
//   )
// );




