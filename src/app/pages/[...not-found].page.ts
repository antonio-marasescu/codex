import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  imports: [RouterLink, Button],
  template: `
    <h2 class="text-xl md:text-2xl">Page Not Found</h2>
    <p-button routerLink="/" link severity="warn">Go Back Home</p-button>
  `
})
export default class PageNotFoundComponent {}
