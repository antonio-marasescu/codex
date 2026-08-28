import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeSelectorComponent } from '../theming/theme-selector.component';
import { Menu, MenuItem } from 'vellum-lib';
import { NavigationItems } from '../../config/constants/navigation/navigation.constants';
import { SearchPostsFieldComponent } from '../search/search-posts-field.component';
import { NavbarItem } from '../../types/navigation/navbar.types';

@Component({
  selector: 'app-navbar',
  imports: [
    ThemeSelectorComponent,
    Menu,
    MenuItem,
    RouterLink,
    RouterLinkActive,
    SearchPostsFieldComponent
  ],
  template: `
    <nav class="w-screen min-h-20 flex flex-row justify-center">
      <div
        class="rounded-full min-w-62 w-164 m-2 flex items-center gap-4 px-6 py-2 bg-[var(--vlm-color-bg-surface)]/90 backdrop-blur-md"
      >
        <!-- Start: Logo -->
        <span class="text-lg font-bold text-primary flex items-center gap-2 animate-fade-in">
          <span
            class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
          >
            Codex
          </span>
        </span>

        <!-- Menu Items -->
        <vlm-menu [vertical]="false" class="flex-1">
          @for (item of NavigationItems; track item.label) {
            <vlm-menu-item>
              <a
                [routerLink]="item.routerLink"
                routerLinkActive="active-link"
                [routerLinkActiveOptions]="getRouterLinkActiveOptions(item)"
                class="flex items-center gap-2 px-3 py-2 hover:opacity-80"
              >
                @if (item.icon) {
                  <span class="material-icons-outlined">{{ item.icon }}</span>
                }
                <span>{{ item.label }}</span>
              </a>
            </vlm-menu-item>
          }
        </vlm-menu>

        <!-- End: Actions -->
        <div class="flex items-center gap-1">
          <app-search-posts-field />
          <app-theme-selector />
        </div>
      </div>
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
