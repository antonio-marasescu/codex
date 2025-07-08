import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blog-layout',
  imports: [RouterOutlet, RouterLink],
  template: `
    <div>
      <h1>Blog</h1>
      <nav>
        <a routerLink="/blog">Overview</a>
      </nav>
      <router-outlet />
    </div>
  `
})
export default class BlogLayoutComponent {}
