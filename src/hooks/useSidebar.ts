import * as React from 'react';
import { SidebarContext } from '@/contexts/sidebar.ts';

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}
