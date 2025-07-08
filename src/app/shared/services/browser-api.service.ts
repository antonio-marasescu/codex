import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class BrowserApiService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setLocalStorageItem(key: string, value: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(key, value);
    }
  }

  getLocalStorageItem(key: string): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(key);
    }
    return null;
  }

  queryDocument(query: string): HTMLHtmlElement | null {
    if (this.isBrowser()) {
      return document.querySelector(query);
    }
    return null;
  }

  matchMediaDocument(query: string): MediaQueryList | null {
    if (this.isBrowser()) {
      return window.matchMedia(query);
    }
    return null;
  }
}
