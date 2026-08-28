import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'vellum-lib';

@Component({
  imports: [RouterLink, Button],
  template: `
    <section class="w-full max-w-4xl mx-auto flex flex-col items-center">
      <h2 class="text-xl md:text-2xl">Page Not Found</h2>
      <a routerLink="/">
        <vlm-button [variant]="'text'" [theme]="'warning'" [label]="'Go Back Home'" />
      </a>
    </section>
  `
})
export default class PageNotFoundComponent {}
