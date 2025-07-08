import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-overview',
  imports: [],
  template: `
    <div>
      <h2>Blog Overview</h2>
      <p>Welcome to the blog section. Here you'll find all our blog posts.</p>
      <ul>
        <li><a routerLink="/blog/example-post">Example Post</a></li>
      </ul>
    </div>
  `
})
export default class BlogOverviewComponent {}
