import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Panel, Chip } from 'vellum-lib';
import { NotePost } from '../../../types/content/note.types';

@Component({
  selector: 'app-notes-post-preview',
  imports: [RouterLink, DatePipe, Chip],
  template: `
    <article class="w-full">
      <div
        class="p-2 md:p-6 rounded-lg shadow-lg bg-[var(--vlm-color-bg-surface)]/80 backdrop-blur-sm border border-[var(--vlm-color-border)]"
      >
        <h3 class="text-2xl">
          <a [routerLink]="['/notes', notePost().slug]" class="hover:opacity-80">
            {{ notePost().title }}
          </a>
        </h3>
        <div class="grid gap-4">
          <span class="text-sm opacity-70">{{ notePost().publishedAt | date: 'mediumDate' }}</span>
          <div>{{ notePost().description }}</div>
          @if (notePost().tags) {
            <div class="w-full flex flex-wrap flex-row-reverse gap-2">
              @for (tag of notePost().tags; track tag) {
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
export class NotesPostPreviewComponent {
  notePost = input.required<NotePost>();
}
