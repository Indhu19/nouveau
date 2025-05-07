import { createLazyRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import '../../../i18n.config';
import PageSkeleton from '@/components/ui/layout/loader/page-skeleton.tsx';

export const Route = createLazyRoute('/about')({
  component: Index,
  pendingComponent: PageSkeleton,
});

export default function Index() {
  const { t } = useTranslation('common');

  return (
    <div className="h-full p-5">
      <h1 className="font-bold text-2xl">{t('Dashboard')}</h1>
      <div className="mt-5">Dashboard Content...</div>
    </div>
  );
}
