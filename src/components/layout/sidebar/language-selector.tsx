import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu.tsx';

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (code: string) => {
    void i18n.changeLanguage(code);
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <div className="relative mr-2 h-4 w-4">
          <Languages className="absolute h-4 w-4 rotate-0 scale-100 transition-all text-muted-foreground" />
        </div>
        <span>{t('language')}</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup
          onValueChange={val => {
            handleLanguageChange(val);
          }}
          value={i18n.language}
        >
          <DropdownMenuRadioItem value="en">{t('english')}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="ta">{t('tamil')}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="hi">{t('hindi')}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
