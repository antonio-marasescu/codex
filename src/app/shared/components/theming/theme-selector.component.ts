import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Button } from 'vellum-lib';
import { AppTheme } from '../../types/theming/theming.types';
import { BrowserApiService } from '../../services/browser-api.service';
import { VellumThemeService } from '../../services/vellum-theme.service';

@Component({
  selector: 'app-theme-selector',
  imports: [Button],
  template: `
    @if (theme() === AppTheme.Light) {
      <vlm-button [variant]="'text'" [theme]="'info'" (clicked)="onThemeChange(AppTheme.Dark)">
        <span class="material-icons-outlined" preIcon>dark_mode</span>
      </vlm-button>
    } @else {
      <vlm-button [variant]="'text'" [theme]="'warning'" (clicked)="onThemeChange(AppTheme.Light)">
        <span class="material-icons-outlined" preIcon>light_mode</span>
      </vlm-button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSelectorComponent {
  private readonly browserApiService = inject(BrowserApiService);
  private readonly vellumThemeService = inject(VellumThemeService);
  protected theme = signal<AppTheme>(this.getInitialTheme());
  protected readonly AppTheme = AppTheme;

  constructor() {
    effect(() => {
      const current = this.theme();
      const vellumTheme = current === AppTheme.Dark ? 'dark' : 'light';
      this.vellumThemeService.setTheme(vellumTheme);
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
    return prefersDark ? AppTheme.Dark : AppTheme.Light; // Default based on system preference or light mode
  }
}
