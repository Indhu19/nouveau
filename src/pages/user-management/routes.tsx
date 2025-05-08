import { createRoute } from '@tanstack/react-router';
import PageSkeleton from '@/components/ui/layout/loader/page-skeleton.tsx';
import UserEnrollmentForm from '@/pages/user-management/UserForm.tsx';
import UserListPage from '@/pages/user-management/UserList.tsx';
import { root } from '@/router/routes/Root.tsx';

async function prepareMocks() {
  if (import.meta.env.DEV) {
    const { worker } = await import('mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
}

export const usersListRoute = createRoute({
  getParentRoute: () => root,
  path: '/users',
  component: UserListPage,
  pendingComponent: PageSkeleton,
  beforeLoad: async () => {
    await prepareMocks();
  },
});

export const userCreateRoute = createRoute({
  getParentRoute: () => root,
  path: '/users/create',
  component: UserEnrollmentForm,
  pendingComponent: PageSkeleton,
  beforeLoad: async () => {
    await prepareMocks();
  },
});
