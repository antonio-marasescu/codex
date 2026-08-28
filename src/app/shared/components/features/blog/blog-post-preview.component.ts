import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BlogPost } from '../../../types/content/blog.types';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Chip } from 'vellum-lib';

@Component({
  selector: 'app-blog-post-preview',
  imports: [RouterLink, DatePipe, Chip],
  template: `
    <article class="w-full">
      <div
        class="p-2 md:p-6 rounded-lg shadow-lg bg-[var(--vlm-color-bg-surface)]/80 backdrop-blur-sm border border-[var(--vlm-color-border)]"
      >
        <h3 class="text-2xl font-bold">
          <a [routerLink]="['/blogs', blogPost().slug]" class="hover:opacity-80">
            {{ blogPost().title }}
          </a>
        </h3>
        <div class="grid gap-4">
          <span class="text-sm opacity-70">{{ blogPost().publishedAt | date: 'mediumDate' }}</span>
          <div>{{ blogPost().description }}</div>
          @if (blogPost().tags) {
            <div class="w-full flex flex-row-reverse gap-2">
              @for (tag of blogPost().tags; track tag) {
                <vlm-chip [clickable]="false">{{ tag }}</vlm-chip>
              }
            </div>
          }
        </div>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostPreviewComponent {
  blogPost = input.required<BlogPost>();
}
