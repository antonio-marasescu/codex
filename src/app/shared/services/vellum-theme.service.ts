import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class VellumThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly darkModeClass = 'dark';

  setTheme(theme: 'light' | 'dark'): void {
    if (isPlatformBrowser(this.platformId)) {
      const html = document.documentElement;

      // Set data-theme attribute for vellum-lib components
      html.setAttribute('data-theme', theme);

      // Set/remove 'dark' class for Tailwind dark: variant
      if (theme === 'dark') {
        html.classList.add(this.darkModeClass);
      } else {
        html.classList.remove(this.darkModeClass);
      }
    }
  }

  getTheme(): 'light' | 'dark' {
    if (isPlatformBrowser(this.platformId)) {
      const theme = document.documentElement.getAttribute('data-theme');
      return theme === 'dark' ? 'dark' : 'light';
    }
    return 'dark'; // Default for SSR
  }
}
