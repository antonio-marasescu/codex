import { NavbarItem, NavigationItemType } from '../../../types/navigation/navbar.types';

export const NavigationItems: NavbarItem[] = [
  {
    id: NavigationItemType.Home,
    label: 'Home',
    icon: 'home',
    routerLink: '/home'
  },
  {
    id: NavigationItemType.Notes,
    label: 'Notes',
    icon: 'note',
    routerLink: '/notes/overview'
  },
  {
    id: NavigationItemType.Blog,
    label: 'Blog',
    icon: 'article',
    routerLink: '/blog/overview'
  }
];
