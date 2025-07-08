import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  imports: [],
  template: `
    <div>
      <h2>Blog Post: {{ blogId }}</h2>
      <p>This is the content for blog post: {{ blogId }}</p>
      <a routerLink="/blog">← Back to Blog</a>
    </div>
  `
})
export default class BlogDetailComponent {
  private route = inject(ActivatedRoute);
  blogId = this.route.snapshot.paramMap.get('blogId');
}
