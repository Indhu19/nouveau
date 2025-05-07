import { RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { router } from '@/router/Router.tsx';

export function AppRouterProvider() {
  return (
    <>
      <RouterProvider router={router} />
      <TanStackRouterDevtools
        router={router}
        position="bottom-right"
        toggleButtonProps={{
          style: {
            right: '70px',
          },
        }}
      />
    </>
  );
}
