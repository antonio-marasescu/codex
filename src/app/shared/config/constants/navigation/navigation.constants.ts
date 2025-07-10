import { NavbarItem, NavigationItemType } from '../../../types/navigation/navbar.types';

export const NavigationItems: NavbarItem[] = [
  {
    id: NavigationItemType.Home,
    label: 'Home',
    icon: 'home',
    baseRouterLink: '',
    routerLink: ''
  },
  {
    id: NavigationItemType.Notes,
    label: 'Notes',
    icon: 'note',
    baseRouterLink: '/notes',
    routerLink: '/notes/overview'
  },
  {
    id: NavigationItemType.Blog,
    label: 'Blog',
    icon: 'article',
    baseRouterLink: '/blog',
    routerLink: '/blog/overview'
  }
];
