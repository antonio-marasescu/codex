import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BlogPostsService } from '../../shared/services/blog-posts.service';

@Component({
  selector: 'app-blog-overview',
  imports: [RouterLink, DatePipe],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Blog</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Welcome to the blog section. Here you'll find all our blog posts.
        </p>

        <div class="grid gap-6">
          @for (post of blogPosts(); track post.slug) {
            <article
              class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
            >
              <h2 class="text-2xl font-semibold mb-2">
                <a
                  [routerLink]="['/blog', post.slug]"
                  class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  {{ post.title }}
                </a>
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ post.description }}</p>
              <div
                class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400"
              >
                <span>{{ post.publishedAt | date: 'mediumDate' }}</span>
              </div>
              @if (post.tags && post.tags.length > 0) {
                <div class="mt-4 flex flex-wrap gap-2">
                  @for (tag of post.tags; track tag) {
                    <span
                      class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                    >
                      {{ tag }}
                    </span>
                  }
                </div>
              }
            </article>
          }
        </div>
      </div>
    </div>
  `
})
export default class BlogOverviewComponent {
  private readonly blogPostsService = inject(BlogPostsService);
  protected blogPosts = this.blogPostsService.getPosts();
}
