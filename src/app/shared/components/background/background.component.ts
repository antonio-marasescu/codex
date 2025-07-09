import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-background',
  imports: [],
  template: `
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div
        class="absolute top-1/8 left-1/4 w-72 h-72 bg-[radial-gradient(circle,_rgba(255,0,255,0.3)_0%,_transparent_70%)] blur-3xl opacity-60 animate-pulse"
      ></div>
      <div
        class="absolute top-1/3 right-1/8 w-96 h-96 bg-[radial-gradient(circle,_rgba(0,255,255,0.3)_0%,_transparent_70%)] blur-3xl opacity-50 slow-pulse"
      ></div>
      <div
        class="absolute bottom-10 left-20 w-64 h-64 bg-[radial-gradient(circle,_rgba(0,255,0,0.2)_0%,_transparent_70%)] blur-3xl opacity-40 animate-pulse"
      ></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundComponent {}
