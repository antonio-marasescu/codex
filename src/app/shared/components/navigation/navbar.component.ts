import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeSelectorComponent } from '../theming/theme-selector.component';
import { Menubar } from 'primeng/menubar';
import { Ripple } from 'primeng/ripple';
import { NavigationItems } from '../../config/constants/navigation/navigation.constants';
import { SearchPostsFieldComponent } from '../search/search-posts-field.component';
import { NavbarItem } from '../../types/navigation/navbar.types';

@Component({
  selector: 'app-navbar',
  imports: [
    ThemeSelectorComponent,
    Menubar,
    Ripple,
    RouterLink,
    RouterLinkActive,
    SearchPostsFieldComponent
  ],
  template: `
    <nav class="w-screen min-h-20 flex flex-row justify-center">
      <p-menubar [model]="NavigationItems" class="rounded-full min-w-62 w-164 m-2">
        <ng-template #start>
          <span class="text-lg font-bold text-primary flex items-center gap-2 animate-fade-in">
            <span
              class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
            >
              Codex
            </span>
          </span>
        </ng-template>
        <ng-template #item let-item let-root="root" class="rounded-full">
          <a
            [routerLink]="item.routerLink"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="getRouterLinkActiveOptions(item)"
            tabindex="0"
            pRipple
            class="flex items-center p-menubar-item-link text-base"
          >
            @if (item.icon) {
              <span class="material-icons-outlined">{{ item.icon }}</span>
            }
            <span>
              {{ item.label }}
            </span>
            @if (item.items) {
              <span class="material-icons-outlined ml-auto">{{
                root ? 'expand_more' : 'chevron_right'
              }}</span>
            }
          </a>
        </ng-template>
        <ng-template #end>
          <div class="flex items-center gap-1">
            <app-search-posts-field />
            <app-theme-selector />
          </div>
        </ng-template>
      </p-menubar>
    </nav>
  `,
  styleUrl: 'navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  protected readonly NavigationItems = NavigationItems;

  protected getRouterLinkActiveOptions(item: NavbarItem): {
    exact: boolean;
  } {
    if (item.routerLink === '') {
      return { exact: true };
    }

    return { exact: false };
  }
}
