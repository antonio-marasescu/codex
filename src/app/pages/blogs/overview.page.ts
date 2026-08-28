import { Component, computed, inject } from '@angular/core';
import { BlogPostsService } from '../../shared/services/blog-posts.service';
import { BlogPostPreviewComponent } from '../../shared/components/features/blog/blog-post-preview.component';
import { createBlogFilterForm, serializeBlogPreview } from '../../shared/utils/blog.utils';
import { BlogSearchFilterComponent } from '../../shared/components/features/blog/blog-search-filter.component';
import { startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blog-overview',
  imports: [BlogPostPreviewComponent, BlogSearchFilterComponent],
  template: `
    <div class="w-full py-8">
      @let posts = blogPosts();
      @if (posts) {
        <app-blog-search-filter [form]="blogFilterForm" />
        <section class="grid gap-6 pt-4 md:pt-8">
          @for (post of filteredBlogPosts(); track post.slug) {
            <app-blog-post-preview [blogPost]="post" />
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
