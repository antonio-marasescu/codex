import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { injectContent, MarkdownComponent } from '@analogjs/content';
import { BlogPost } from '../../shared/types/content/blog.types';

@Component({
  selector: 'app-blog-detail',
  imports: [RouterLink, DatePipe, Card, Tag, MarkdownComponent, AsyncPipe],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        @let post = blogPostContent$ | async;
        @if (post) {
          <article class="w-full">
            <p-card
              class="p-2 md:p-6 rounded-lg shadow-lg bg-surface-100 dark:bg-surface-900/20 border border-surface-200 dark:border-surface-900"
            >
              <ng-template #title>
                <div class="mb-4">
                  <a
                    routerLink="/blog/overview"
                    class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4 transition-colors"
                  >
                    ← Back to Blog
                  </a>
                  <h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                    {{ post.attributes.title }}
                  </h1>
                  <div
                    class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4"
                  >
                    <span>{{ post.attributes.publishedAt | date: 'mediumDate' }}</span>
                  </div>
                  @if (post.attributes.tags && post.attributes.tags.length > 0) {
                    <div class="flex flex-wrap gap-2">
                      @for (tag of post.attributes.tags; track tag) {
                        <p-tag>{{ tag }}</p-tag>
                      }
                    </div>
                  }
                </div>
              </ng-template>
              <ng-template #subtitle>
                <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
                  {{ post.attributes.description }}
                </p>
              </ng-template>
              <analog-markdown [content]="post.content" />
            </p-card>
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
  readonly blogPostContent$ = injectContent<BlogPost>({ param: 'slug', subdirectory: 'blog' });
}
