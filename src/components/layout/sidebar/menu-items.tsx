import { FormInput, LayoutDashboard, User } from 'lucide-react';

const dashboardMenu = {
  icon: LayoutDashboard,
  title: 'Dashboard',
  url: '/dashboard'
};

const userManagementMenu = {
  icon: User,
  title: 'User Management',
  url: '/users'
};

const formBuilderMenu = {
  icon: FormInput,
  title: 'Form Builder',
  url: '/form-builder'
};



// Example of a submenu with items
// const salesMenu = {
//   icon: ShoppingBag,
//   items: [
//     {
//       title: 'New Sale Order',
//       url: '#'
//     },
//     {
//       title: 'Orders List',
//       url: '#'
//     },
//     {
//       title: 'Cancel Orders',
//       url: '#'
//     }
//   ],
//   title: 'Sales',
//   url: '#'
// };

export default [dashboardMenu, formBuilderMenu, userManagementMenu];
