import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ContentService } from '../../shared/services/content.service';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-note-detail',
  imports: [RouterLink, AsyncPipe, DatePipe],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        @if (note$ | async; as note) {
          <article
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700"
          >
            <header class="mb-8">
              <a
                routerLink="/notes/overview"
                class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4 transition-colors"
              >
                ← Back to Notes
              </a>
              <div class="mb-4">
                <span
                  class="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm rounded mb-4"
                >
                  {{ note.category }}
                </span>
              </div>
              <h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {{ note.title }}
              </h1>
              <p class="text-xl text-gray-600 dark:text-gray-300 mb-4">{{ note.description }}</p>
              <div
                class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6"
              >
                <span>{{ note.publishedAt | date: 'mediumDate' }}</span>
                @if (note.tags && note.tags.length > 0) {
                  <div class="flex gap-2">
                    @for (tag of note.tags; track tag) {
                      <span
                        class="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded"
                      >
                        {{ tag }}
                      </span>
                    }
                  </div>
                }
              </div>
            </header>

            <div class="prose prose-lg dark:prose-invert max-w-none">
              <div [innerHTML]="note.content"></div>
            </div>
          </article>
        } @else {
          <div class="text-center py-12">
            <p class="text-gray-500 dark:text-gray-400">Note not found.</p>
            <a
              routerLink="/notes/overview"
              class="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              ← Back to Notes
            </a>
          </div>
        }
      </div>
    </div>
  `
})
export default class NoteDetailComponent {
  private route = inject(ActivatedRoute);
  private contentService = inject(ContentService);

  note$ = this.route.paramMap.pipe(
    map(params => params.get('slug')),
    switchMap(slug => this.contentService.getNote(slug || ''))
  );
}
