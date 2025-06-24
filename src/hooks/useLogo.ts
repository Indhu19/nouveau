import useSidebar from '@/hooks/useSidebar.ts';
import { useResolvedTheme } from '@/hooks/useTheme';
import { Theme } from '@/providers/theme.tsx';

export function useIcon() {
  const theme = useResolvedTheme();
  return `icon-${theme}.svg`;
}

export function useLogo() {
  const theme: Theme = useResolvedTheme();
  const { state: sidebarState } = useSidebar();

  const isSidebarCollapsed = sidebarState === 'collapsed';

  return isSidebarCollapsed ? `/icon-${theme}.svg` : `/logo-${theme}.svg`;
}
