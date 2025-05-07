import { useContext } from 'react';
import { ThemeProviderContext } from '@/contexts/theme.ts';

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

export function useResolvedTheme() {
  const { theme } = useTheme();
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return theme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : theme;
}
