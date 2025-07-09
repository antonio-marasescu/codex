import { Component } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { injectContent, MarkdownComponent } from '@analogjs/content';
import { BlogPost } from '../../shared/types/content/blog.types';

@Component({
  selector: 'app-blog-detail',
  imports: [DatePipe, Card, Tag, MarkdownComponent, AsyncPipe],
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
                @if (post.attributes) {
                  <div>
                    <h1 class="text-4xl font-bold mb-4">
                      {{ post.attributes.title }}
                    </h1>
                    <div class="flex items-center justify-between text-sm mb-4 font-light">
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
                }
              </ng-template>
              <div class=" w-full">
                <analog-markdown [content]="post.content" class="prose dark:prose-invert" />
              </div>
            </p-card>
          </article>
        }
      </div>
    </div>
  `
})
export default class BlogDetailComponent {
  readonly blogPostContent$ = injectContent<BlogPost>({ param: 'slug', subdirectory: 'blog' });
}
