'use client';

import { Link } from '@tanstack/react-router';
import * as React from 'react';

import { NavMenu } from '@/components/ui/layout/sidebar/nav-menu.tsx';
import { NavUser } from '@/components/ui/layout/sidebar/nav-user.tsx';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar.tsx';
import { useLogo } from '@/hooks/useLogo.ts';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const logo = useLogo();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/" className="w-full flex justify-center items-center py-4">
                <img src={logo} alt="Company Logo" className="h-8" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMenu />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
