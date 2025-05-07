import { Link, useRouterState } from '@tanstack/react-router';
import { Fragment } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import { SearchCommand } from '@/components/ui/layout/header-menu/search.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { SidebarTrigger } from '@/components/ui/sidebar.tsx';
import { BaseMenuItem, menuConfig } from '@/lib/menuConfig.ts';

export default function Header() {
  const pathname = useRouterState({ select: state => state.location.pathname });
  const breadcrumbItems = findBreadcrumbPath(menuConfig, pathname);
  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList className="flex items-center">
            {breadcrumbItems.map((item, idx) => (
              <Fragment key={item.url}>
                <BreadcrumbItem className="whitespace-nowrap">
                  {idx < breadcrumbItems.length - 1 ? (
                    <Link to={item.url} className="hover:underline">
                      {item.title}
                    </Link>
                  ) : (
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>

                {idx < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="ml-auto flex items-center px-3">
        <SearchCommand />
      </div>
    </header>
  );
}

function findBreadcrumbPath(
  items: BaseMenuItem[],
  pathname: string,
  trail: BaseMenuItem[] = []
): BaseMenuItem[] {
  for (const item of items) {
    const currentTrail = [...trail, item];
    if (item.url === pathname) return currentTrail;
    if (item.subMenu) {
      const result = findBreadcrumbPath(item.subMenu, pathname, currentTrail);
      if (result.length) return result;
    }
  }
  return [];
}
