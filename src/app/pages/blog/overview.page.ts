import { Component, inject } from '@angular/core';
import { BlogPostsService } from '../../shared/services/blog-posts.service';
import { BlogPostPreviewComponent } from '../../shared/components/features/blog/blog-post-preview.component';

@Component({
  selector: 'app-blog-overview',
  imports: [BlogPostPreviewComponent],
  template: `
    <div class="w-full py-8">
      <div class="grid gap-6">
        @for (post of blogPosts(); track post.slug) {
          <app-blog-post-preview [blogPost]="post" />
        }
      </div>
    </div>
  `
})
export default class BlogOverviewComponent {
  private readonly blogPostsService = inject(BlogPostsService);
  protected blogPosts = this.blogPostsService.getPosts();
}
