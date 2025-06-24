import { createRoute } from '@tanstack/react-router';

import ProtectedFormView from '@/pages/custom-forms/components/protected-form-view.tsx';
import { rootRoute } from '@/routes/router.ts';


export const formViewRoute = createRoute({
  component: ProtectedFormView,
  getParentRoute: () => rootRoute,
  path: 'forms/$formId'
});