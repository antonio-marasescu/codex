export enum NavigationItemType {
  Home = 'home',
  Notes = 'notes',
  Blog = 'blog'
}

export interface NavbarItem {
  id: string;
  label?: string;
  icon?: string;
  routerLink?: string | string[];
  items?: NavbarItem[];
  disabled?: boolean;
}
