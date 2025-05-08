'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { ChevronsUpDown } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { ModeToggle } from '@/components/ui/layout/header-menu/mode-toggle.tsx';
import { AppLogout } from '@/components/ui/layout/user-menu/app-logout.tsx';
import { LanguageDropdown } from '@/components/ui/layout/user-menu/language-dropdown.tsx';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar.tsx';
import { useSidebar } from '@/hooks/useSidebar.ts';

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user } = useAuth0();

  if (!user) return null;

  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    return nameParts.map(part => part.charAt(0).toUpperCase()).join('');
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.picture ?? ''} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {getInitials(user.name ?? 'User')}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.picture} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {getInitials(user.name ?? 'User')}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <ModeToggle />
              <LanguageDropdown />
              {/*<DropdownMenuItem>*/}
              {/*  <Bell />*/}
              {/*  Notifications*/}
              {/*</DropdownMenuItem>*/}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <AppLogout />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
