import { NavbarItem, NavigationItemType } from '../../../types/navigation/navbar.types';

export const NavigationItems: NavbarItem[] = [
  {
    id: NavigationItemType.Home,
    label: 'Home',
    icon: 'home',
    routerLink: '/'
  },
  {
    id: NavigationItemType.Notes,
    label: 'Notes',
    icon: 'note',
    routerLink: '/notes'
  },
  {
    id: NavigationItemType.Blog,
    label: 'Blog',
    icon: 'article',
    routerLink: '/blog'
  }
];
