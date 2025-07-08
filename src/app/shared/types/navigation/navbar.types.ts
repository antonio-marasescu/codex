import { MenuItem } from 'primeng/api';

export enum NavigationItemType {
  Home = 'home',
  Notes = 'notes',
  Blog = 'blog'
}

export type NavbarItem = {
  id: string;
} & MenuItem;
