import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BlogPost } from '../../../types/content/blog.types';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-blog-post-preview',
  imports: [RouterLink, DatePipe, Card, Tag],
  template: `
    <article class="w-full">
      <p-card
        class="p-2 md:p-6 rounded-lg shadow-lg bg-surface-100 dark:bg-surface-900/20 border border-surface-200 dark:border-surface-900"
      >
        <ng-template #title>
          <h3 class="text-2xl font-bold">
            <a [routerLink]="['/blog', blogPost().slug]" class=" hover:opacity-80">
              {{ blogPost().title }}
            </a>
          </h3>
        </ng-template>
        <ng-template #subtitle>
          <span>{{ blogPost().publishedAt | date: 'mediumDate' }}</span>
        </ng-template>
        <div class="grid gap-8">
          <div>{{ blogPost().description }}</div>
          @if (blogPost().tags) {
            <div class="w-full flex flex-row-reverse gap-2">
              @for (tag of blogPost().tags; track tag) {
                <p-tag>{{ tag }}</p-tag>
              }
            </div>
          }
        </div>
      </p-card>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostPreviewComponent {
  blogPost = input.required<BlogPost>();
}
