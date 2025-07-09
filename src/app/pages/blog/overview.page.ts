import { Component, computed, inject } from '@angular/core';
import { BlogPostsService } from '../../shared/services/blog-posts.service';
import { BlogPostPreviewComponent } from '../../shared/components/features/blog/blog-post-preview.component';
import { createBlogFilterForm, serializeBlogPreview } from '../../shared/utils/blog.utils';
import { BlogSearchFilterComponent } from '../../shared/components/features/blog/blog-search-filter.component';
import { startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { AnimateOnScroll } from 'primeng/animateonscroll';

@Component({
  selector: 'app-blog-overview',
  imports: [BlogPostPreviewComponent, BlogSearchFilterComponent, AnimateOnScroll],
  template: `
    <div class="w-full py-8">
      @let posts = blogPosts();
      @if (posts) {
        <app-blog-search-filter [form]="blogFilterForm" />
        <section class="grid gap-6 pt-4 md:pt-8">
          @for (post of filteredBlogPosts(); track post.slug) {
            <app-blog-post-preview
              [blogPost]="post"
              pAnimateOnScroll
              [once]="true"
              enterClass="animate-enter fade-in-0 slide-in-from-b-4 animate-duration-700"
              leaveClass="animate-leave fade-out"
            />
          }
        </section>
      }
    </div>
  `
})
export default class BlogOverviewComponent {
  private readonly blogPostsService = inject(BlogPostsService);
  protected blogPosts = this.blogPostsService.getPosts();
  protected blogFilterForm = createBlogFilterForm();
  protected selectedFilter = toSignal(
    this.blogFilterForm.valueChanges.pipe(startWith(this.blogFilterForm.value)),
    { initialValue: this.blogFilterForm.value }
  );
  protected filteredBlogPosts = computed(() => {
    const filter = this.selectedFilter();
    const posts = this.blogPosts();
    const searchFilter = filter.search;

    if (!searchFilter) {
      return posts;
    }
    return posts.filter(post => serializeBlogPreview(post).includes(searchFilter.toLowerCase()));
  });
}
