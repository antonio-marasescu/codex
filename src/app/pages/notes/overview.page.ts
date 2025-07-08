import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ContentService } from '../../shared/services/content.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-notes-overview',
  imports: [RouterLink, AsyncPipe, DatePipe],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Notes</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Welcome to the notes section. Here you'll find all our notes organized by category.
        </p>

        @if (notesData$ | async; as data) {
          <div class="space-y-8">
            @for (category of data.categories; track category) {
              <section
                class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
              >
                <h2
                  class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2"
                >
                  {{ category }}
                </h2>

                <div class="grid gap-4">
                  @for (note of data.notesByCategory[category]; track note.slug) {
                    <article
                      class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                    >
                      <h3 class="text-lg font-medium mb-2">
                        <a
                          [routerLink]="['/notes', note.slug]"
                          class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        >
                          {{ note.title }}
                        </a>
                      </h3>
                      <p class="text-gray-600 dark:text-gray-300 mb-3">{{ note.description }}</p>
                      <div
                        class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400"
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
                    </article>
                  }
                </div>
              </section>
            }
          </div>
        } @else {
          <p class="text-gray-500 dark:text-gray-400">Loading notes...</p>
        }
      </div>
    </div>
  `
})
export default class NotesOverviewComponent {
  private contentService = inject(ContentService);

  notesData$ = combineLatest([
    this.contentService.getNotes(),
    this.contentService.getCategories()
  ]).pipe(
    map(([notes, categories]) => {
      const notesByCategory: Record<string, any[]> = {};
      categories.forEach(category => {
        notesByCategory[category] = notes.filter(note => note.category === category);
      });
      return { notes, categories, notesByCategory };
    })
  );
}
