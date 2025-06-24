import { useContext } from 'react';

import { ThemeContext } from '@/contexts/theme';

export const useTheme = () => {
  return useContext(ThemeContext);
};

export function useResolvedTheme() {
  const { theme } = useTheme();
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return theme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : theme;
}
