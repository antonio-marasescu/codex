import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AppTheme } from '../../types/theming/theming.types';
import { BrowserApiService } from '../../services/browser-api.service';
import { DarkModeSelector } from '../../config/theming/theming.config';

@Component({
  selector: 'app-theme-selector',
  imports: [Button, Ripple],
  template: `
    @if (theme() === AppTheme.Light) {
      <p-button
        pRipple
        [text]="true"
        [rounded]="true"
        severity="info"
        (onClick)="onThemeChange(AppTheme.Dark)"
      >
        <ng-template #icon>
          <span class="material-icons-outlined">dark_mode</span>
        </ng-template>
      </p-button>
    } @else {
      <p-button
        pRipple
        [text]="true"
        [rounded]="true"
        severity="warn"
        (onClick)="onThemeChange(AppTheme.Light)"
      >
        <ng-template #icon>
          <span class="material-icons-outlined">light_mode</span>
        </ng-template>
      </p-button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSelectorComponent {
  private readonly browserApiService = inject(BrowserApiService);
  protected theme = signal<AppTheme>(this.getInitialTheme());
  protected readonly AppTheme = AppTheme;

  constructor() {
    effect(() => {
      const current = this.theme();
      this.setBodyThemeClass(current);
      this.browserApiService.setLocalStorageItem('theme', current);
    });
  }

  protected onThemeChange(theme: AppTheme) {
    this.theme.set(theme);
  }

  private getInitialTheme(): AppTheme {
    const saved = this.browserApiService.getLocalStorageItem('theme') as AppTheme;
    if (saved) {
      return saved;
    }

    // Check user's system preference for dark mode
    const prefersDark = this.browserApiService.matchMediaDocument(
      '(prefers-color-scheme: dark)'
    )?.matches;
    return prefersDark ? AppTheme.Dark : AppTheme.Dark; // Default to dark mode
  }

  private setBodyThemeClass(theme: AppTheme) {
    const darkClass = DarkModeSelector;
    const html = this.browserApiService.queryDocument('html');
    if (!html) return;

    if (theme === AppTheme.Dark) {
      html.classList.add(darkClass);
    } else {
      html.classList.remove(darkClass);
    }
  }
}
