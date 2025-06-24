import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu.tsx';
import { useTheme } from '@/hooks/useTheme.ts';
import { Theme } from '@/providers/theme.tsx';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const { t } = useTranslation();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <div className="relative mr-2 h-4 w-4">
          <Sun className="absolute h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-muted-foreground" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-muted-foreground" />
        </div>
        <span>{t('theme')}</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup
          onValueChange={val => {
            setTheme(val as Theme);
          }}
          value={theme}
        >
          <DropdownMenuRadioItem value="light">{t('light')}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">{t('dark')}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">{t('system')}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
