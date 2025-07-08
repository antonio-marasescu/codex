import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BlogPostsService } from '../../shared/services/blog-posts.service';

@Component({
  selector: 'app-blog-detail',
  imports: [RouterLink, DatePipe],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        @let post = blogPost();
        @if (post) {
          <article
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700"
          >
            <header class="mb-8">
              <a
                routerLink="/blog/overview"
                class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4 transition-colors"
              >
                ← Back to Blog
              </a>
              <h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {{ post.title }}
              </h1>
              <p class="text-xl text-gray-600 dark:text-gray-300 mb-4">{{ post.description }}</p>
              <div
                class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6"
              >
                <span>{{ post.publishedAt | date: 'mediumDate' }}</span>
              </div>
              @if (post.tags && post.tags.length > 0) {
                <div class="flex flex-wrap gap-2">
                  @for (tag of post.tags; track tag) {
                    <span
                      class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded"
                    >
                      {{ tag }}
                    </span>
                  }
                </div>
              }
            </header>

            <div class="prose prose-lg dark:prose-invert max-w-none">
              <div [innerHTML]="post.content"></div>
            </div>
          </article>
        } @else {
          <div class="text-center py-12">
            <p class="text-gray-500 dark:text-gray-400">Blog post not found.</p>
            <a
              routerLink="/blog/overview"
              class="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              ← Back to Blog
            </a>
          </div>
        }
      </div>
    </div>
  `
})
export default class BlogDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly blogPostsService = inject(BlogPostsService);
  private readonly slug = this.route.snapshot.params['slug'];
  protected blogPost = this.blogPostsService.getPostBySlug(this.slug);
}
