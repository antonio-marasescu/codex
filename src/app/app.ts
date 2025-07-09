import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navigation/navbar.component';
import { StandardLayoutComponent } from './shared/components/layout/standard-layout.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, StandardLayoutComponent],
  template: `
    <app-standard-layout>
      <app-navbar nav />
      <main content class="flex flex-col gap-24">
        <router-outlet />
      </main>
    </app-standard-layout>
  `
})
export class AppComponent {}
