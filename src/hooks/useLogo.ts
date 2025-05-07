import { useSidebar } from './useSidebar.ts';
import { useResolvedTheme } from './useTheme.ts';

export function useLogo() {
  const theme = useResolvedTheme();
  const { state: sidebarState } = useSidebar();

  const isSidebarCollapsed = sidebarState === 'collapsed';

  return isSidebarCollapsed
    ? theme === 'dark'
      ? '/logo-small-dark.svg'
      : '/logo-small-light.svg'
    : theme === 'dark'
      ? '/logo-dark.svg'
      : '/logo-light.svg';
}

export function useSmallLogo() {
  const theme = useResolvedTheme();
  return theme === 'dark' ? '/logo-small-dark.svg' : '/logo-small-light.svg';
}
