import { Link } from '@tanstack/react-router';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar.tsx';
import { useLogo } from '@/hooks/useLogo.ts';

export function ProductLogo() {
  const logo = useLogo();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild className="justify-center" size="lg">
          <Link to="/">
            <div className="flex items-center justify-center">
              <img alt="Company Logo" className="h-8" src={logo} />
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
