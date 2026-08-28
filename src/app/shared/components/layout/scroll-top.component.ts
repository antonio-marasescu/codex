import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  viewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Button } from 'vellum-lib';

@Component({
  selector: 'app-scroll-top',
  imports: [Button],
  template: `
    @if (isVisible()) {
      <vlm-button
        [variant]="'fab-outlined'"
        class="fixed bottom-6 right-6 z-50"
        (clicked)="scrollToTop()"
      >
        <span class="material-icons-outlined" preIcon>keyboard_arrow_up</span>
      </vlm-button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollTopComponent {
  private readonly platformId = inject(PLATFORM_ID);
  protected isVisible = signal(false);
  private scrollContainer: HTMLElement | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Find the scrolling container after view init
      setTimeout(() => {
        const container = document.querySelector('.layout-scrollbar');
        if (container) {
          this.scrollContainer = container as HTMLElement;
          this.scrollContainer.addEventListener('scroll', () => this.onScroll());
        }
      });
    }
  }

  protected onScroll(): void {
    if (this.scrollContainer) {
      this.isVisible.set(this.scrollContainer.scrollTop > 100);
    }
  }

  protected scrollToTop(): void {
    if (this.scrollContainer) {
      this.scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
