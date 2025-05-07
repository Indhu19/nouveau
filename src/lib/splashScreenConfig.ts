import { SplashScreenProps } from '@/components/ui/layout/loader/splash-screen.tsx';

export type SplashScreenOptions = Omit<SplashScreenProps, 'isLoading'>;

export const splashScreenConfig: SplashScreenOptions = {
  title: 'Neohorizon Analytics ERP',
  logoAnimation: 'pulse',
  loadingStyle: 'dot-bounce',
};
