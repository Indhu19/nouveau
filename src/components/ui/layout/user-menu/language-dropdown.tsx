import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../../../../../i18n.config.ts';
import { Badge } from '@/components/ui/badge.tsx';
import {
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu.tsx';

type LanguageKey = keyof typeof supportedLanguages;

export function LanguageDropdown() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as LanguageKey;

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <div className="flex flex-1">
          <Languages className="mr-2 h-4 w-4" />
          <div className="me-2">Language</div>
        </div>
        <Badge variant="secondary">{supportedLanguages[currentLang].nativeName}</Badge>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup
            value={currentLang}
            onValueChange={val => void changeLanguage(val)}
          >
            {Object.entries(supportedLanguages).map(([shortCode, langInfo]) => (
              <DropdownMenuRadioItem key={shortCode} value={shortCode}>
                {langInfo.nativeName}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
