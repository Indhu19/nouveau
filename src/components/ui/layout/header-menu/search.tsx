import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CommandDialog, CommandInput } from '@/components/ui/command.tsx';
import { Kbd } from '@/components/ui/kbd.tsx';
import { useIsMobile } from '@/hooks/useMobile.ts';

export function SearchCommand() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };
    document.addEventListener('keydown', down);
    return () => {
      document.removeEventListener('keydown', down);
    };
  }, []);

  return (
    <>
      <SearchTrigger
        onOpen={() => {
          setOpen(true);
        }}
      />
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

function SearchTrigger({ onOpen }: { onOpen: () => void }) {
  const isMobile = useIsMobile();
  return (
    <Button
      variant="outline"
      className="h-9 pl-2 pr-3 text-muted-foreground gap-2 cursor-pointer"
      onClick={onOpen}
    >
      <Search className="h-4 w-4" />
      {!isMobile && (
        <Kbd>
          <span className="text-xs">⌘</span>K
        </Kbd>
      )}
    </Button>
  );
}

function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search..." />
    </CommandDialog>
  );
}
