import { LayoutDashboard, type LucideIcon, Users } from 'lucide-react';

export interface BaseMenuItem {
  title: string;
  url: string;
  isActive?: boolean;
  subMenu?: BaseMenuItem[];
}

export interface MenuItem extends BaseMenuItem {
  icon: LucideIcon;
}

export const menuConfig: MenuItem[] = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: 'Users',
    url: '/users',
    icon: Users,
    isActive: true,
    subMenu: [
      {
        title: 'User List',
        url: '/users',
        isActive: true,
      },
      {
        title: 'Add User',
        url: '/users/create',
        isActive: true,
      },
    ],
  },
];
