import * as React from 'react';

import menuItems from '@/components/layout/sidebar/menu-items.tsx';
import { Menu } from '@/components/layout/sidebar/menu.tsx';
import { ProductLogo } from '@/components/layout/sidebar/product-logo.tsx';
import { UserMenu } from '@/components/layout/sidebar/user-menu.tsx';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ProductLogo />
      </SidebarHeader>
      <SidebarContent>
        <Menu items={menuItems} />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
