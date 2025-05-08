import { createRoute } from '@tanstack/react-router';

import PageSkeleton from '@/components/ui/layout/loader/page-skeleton.tsx';
import ChartsDashboard from '@/pages/charts/Index.tsx';
import { root } from '@/router/routes/Root.tsx';

async function prepareMocks() {
  if (import.meta.env.DEV) {
    const { worker } = await import('../../../mocks/browser')
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
}

export const chartsRoute = createRoute({
  getParentRoute: () => root,
  path: '/components',
  component: ChartsDashboard,
  pendingComponent: PageSkeleton,
  beforeLoad: async () => {
    await prepareMocks();
  },
});