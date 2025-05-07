'use client';

import { Link, useRouterState } from '@tanstack/react-router';
import { clsx } from 'clsx';
import { ChevronRight } from 'lucide-react';

import { useTranslation } from 'react-i18next';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible.tsx';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar.tsx';
import { BaseMenuItem, menuConfig } from '@/lib/menuConfig.ts';

export function NavMenu() {
  const { t } = useTranslation('common');
  const { location } = useRouterState();

  const isLinkActive = (url: string) => location.pathname === url;

  const isSubmenuActive = (subItem: BaseMenuItem): boolean => {
    if (location.pathname === subItem.url) return true;
    return !!subItem.subMenu?.some(child => isSubmenuActive(child));
  };

  const renderSubMenu = (items: BaseMenuItem[]) => {
    return (
      <SidebarMenuSub>
        {items.map(subItem => {
          const hasChildren = subItem.subMenu?.length;

          return (
            <Collapsible key={subItem.title} asChild defaultOpen={subItem.isActive}>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <Link
                    to={subItem.url}
                    className={clsx({
                      'bg-muted font-semibold': isLinkActive(subItem.url),
                    })}
                  >
                    {t(subItem.title)}
                  </Link>
                </SidebarMenuSubButton>

                {hasChildren && subItem.subMenu && (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>{renderSubMenu(subItem.subMenu)}</CollapsibleContent>
                  </>
                )}
              </SidebarMenuSubItem>
            </Collapsible>
          );
        })}
      </SidebarMenuSub>
    );
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {menuConfig.map(item => {
          const open = location.pathname === item.url || item.subMenu?.some(isSubmenuActive);

          return (
            <Collapsible key={item.title} asChild defaultOpen={open}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={t(item.title)}>
                  <Link
                    to={item.url}
                    className={clsx({
                      'bg-muted font-semibold': isLinkActive(item.url),
                    })}
                  >
                    <item.icon />
                    <span>{t(item.title)}</span>
                  </Link>
                </SidebarMenuButton>

                {item.subMenu?.length && (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>{renderSubMenu(item.subMenu)}</CollapsibleContent>
                  </>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
