import { createContext } from 'react';

import { Theme } from '@/providers/theme.tsx';

interface ThemeProviderState {
  setTheme: (theme: Theme) => void;
  theme: Theme;
}

const initialState: ThemeProviderState = {
  setTheme: () => null,
  theme: 'system'
};

export const ThemeContext = createContext<ThemeProviderState>(initialState);
