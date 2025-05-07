import { createBrowserHistory, createRouter } from '@tanstack/react-router';
import { queryClient } from '@/lib/queryClient.ts';
import { ErrorPage } from '@/modules/errors/ErrorPage.tsx';
import { NotFoundPage } from '@/modules/errors/NotFoundPage.tsx';
import { chartsRoute } from '@/pages/charts/Routes.tsx';
import { dashboardRoute } from '@/pages/dashboard/Routes.tsx';
import { userCreateRoute, usersListRoute } from '@/pages/user-management/routes.tsx';
import { root } from '@/router/routes/Root.tsx';


const routeTree = root.addChildren([dashboardRoute, usersListRoute, userCreateRoute, chartsRoute]);

const history = createBrowserHistory();

export const router = createRouter({
  routeTree,
  history,
  context: {
    queryClient,
  },
  defaultNotFoundComponent: NotFoundPage,
  defaultErrorComponent: ErrorPage,
});
