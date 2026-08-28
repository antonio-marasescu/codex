import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollTopComponent } from './scroll-top.component';
import { BackgroundComponent } from '../background/background.component';

@Component({
  selector: 'app-standard-layout',
  imports: [ScrollTopComponent, BackgroundComponent],
  template: `
    <div class="h-screen w-full flex flex-col justify-start items-start relative">
      <app-background />
      <div class="pb-0 pt-4">
        <ng-content select="[nav]"></ng-content>
      </div>
      <div
        class="p-6 pb-1 lg:p-10 lg:pt-10 lg:pb-10 w-full h-full gap-2 overflow-x-hidden layout-scrollbar scroll-hide-auto relative"
      >
        <ng-content select="[content]"></ng-content>
        <app-scroll-top />
      </div>
    </div>
  `,
  styleUrl: 'standard-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StandardLayoutComponent {}
