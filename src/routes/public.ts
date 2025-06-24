import { createRoute } from '@tanstack/react-router';

import LogoutPage from '@/pages/logout.tsx';
import { rootRoute } from '@/routes/router.ts';

export const logoutRoute = createRoute({
  component: LogoutPage,
  getParentRoute: () => rootRoute,
  path: 'logout'
});
