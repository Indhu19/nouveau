import { AuthGuard } from '@/auth/auth-guard.tsx';
import { FormView } from '@/pages/custom-forms/components/form-view';

export default function ProtectedFormView() {
  return (
    <AuthGuard>
    <FormView />
  </AuthGuard>
);
}