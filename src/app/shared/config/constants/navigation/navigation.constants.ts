import { NavbarItem, NavigationItemType } from '../../../types/navigation/navbar.types';

export const NavigationItems: NavbarItem[] = [
  {
    id: NavigationItemType.Home,
    label: 'Home',
    icon: 'home'
  },
  {
    id: NavigationItemType.Notes,
    label: 'Notes',
    icon: 'note'
  },
  {
    id: NavigationItemType.Blog,
    label: 'Blog',
    icon: 'article'
  }
];
