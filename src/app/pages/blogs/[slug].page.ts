import { Component } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Chip } from 'vellum-lib';
import { injectContent, MarkdownComponent } from '@analogjs/content';
import { BlogPost } from '../../shared/types/content/blog.types';

@Component({
  selector: 'app-blog-detail',
  imports: [DatePipe, Chip, MarkdownComponent, AsyncPipe],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        @let post = blogPostContent$ | async;
        @if (post) {
          <article class="w-full">
            <div
              class="p-2 md:p-6 rounded-lg shadow-lg bg-[var(--vlm-color-bg-surface)]/80 backdrop-blur-sm border border-[var(--vlm-color-border)] overflow-hidden"
            >
              @if (post.attributes) {
                <div class="p-4">
                  <h1 class="text-4xl font-bold mb-4">
                    {{ post.attributes.title }}
                  </h1>
                  <div class="flex items-center justify-between text-sm mb-4 font-light">
                    <span>{{ post.attributes.publishedAt | date: 'mediumDate' }}</span>
                  </div>
                  @if (post.attributes.tags && post.attributes.tags.length > 0) {
                    <div class="flex flex-wrap gap-2">
                      @for (tag of post.attributes.tags; track tag) {
                        <vlm-chip [clickable]="false">{{ tag }}</vlm-chip>
                      }
                    </div>
                  }
                </div>
              }
              <div class="w-full p-4">
                <analog-markdown [content]="post.content" class="prose dark:prose-invert" />
              </div>
            </div>
          </article>
        }
      </div>
    </div>
  `
})
export default class BlogDetailComponent {
  readonly blogPostContent$ = injectContent<BlogPost>({ param: 'slug', subdirectory: 'blog' });
}
