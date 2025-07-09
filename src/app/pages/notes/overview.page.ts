import { Component, computed, inject } from '@angular/core';
import { NotePostsService } from '../../shared/services/note-posts.service';
import { NotesPostPreviewComponent } from '../../shared/components/features/notes/notes-post-preview.component';
import { createNoteFilterForm, serializeNotePreview } from '../../shared/utils/note.utils';
import { NotesCategoriesFilterComponent } from '../../shared/components/features/notes/notes-categories-filter.component';
import { startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { NoteCategory, NotePost } from '../../shared/types/content/note.types';

@Component({
  selector: 'app-notes-overview',
  imports: [NotesPostPreviewComponent, NotesCategoriesFilterComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      @let notes = notesByCategory();
      @let categories = notesCategories();
      @if (notes && categories) {
        <app-notes-categories-filter [form]="notesFilterForm" [categories]="categories" />
        <section class="grid gap-8 pt-4 md:pt-8">
          @for (category of filteredCategories(); track $index) {
            @let notes = filteredNotesByCategory()[category];
            @if (notes && notes.length > 0) {
              <section class="grid gap-4">
                <h2 class="text-2xl font-semibold">
                  {{ category }}
                </h2>
                <div class="grid gap-6">
                  @for (note of notes; track note.slug) {
                    <app-notes-post-preview [notePost]="note" />
                  }
                </div>
              </section>
            }
          }
        </section>
      }
    </div>
  `
})
export default class NotesOverviewComponent {
  private readonly notePostsService = inject(NotePostsService);
  protected notesByCategory = this.notePostsService.getPostsByCategory();
  protected notesCategories = this.notePostsService.getCategories();
  protected notesFilterForm = createNoteFilterForm();
  protected selectedFilter = toSignal(
    this.notesFilterForm.valueChanges.pipe(startWith(this.notesFilterForm.value)),
    { initialValue: this.notesFilterForm.value }
  );
  protected filteredCategories = computed(() => {
    const filter = this.selectedFilter();
    const availableCategories = this.notesCategories();
    if (filter.selectedCategory === NoteCategory.All) {
      return availableCategories;
    }
    return availableCategories.filter(category => category === filter.selectedCategory);
  });
  protected filteredNotesByCategory = computed(() => {
    const filter = this.selectedFilter();
    const notesByCategory = this.notesByCategory();
    const filteredCategories = this.filteredCategories();
    const searchFilter = filter.search;

    if (!searchFilter) {
      return notesByCategory;
    }
    return filteredCategories.reduce(
      (accum, category) => {
        const data = notesByCategory[category].filter(note =>
          serializeNotePreview(note).includes(searchFilter.toLowerCase())
        );
        return {
          ...accum,
          [category]: data
        };
      },
      {} as Record<string, NotePost[]>
    );
  });
}
