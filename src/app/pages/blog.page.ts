import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blog',
  imports: [RouterOutlet],
  template: `
    <div>
      <h1>Blog</h1>
      <router-outlet></router-outlet>
    </div>
  `
})
export default class BlogPageComponent {}
