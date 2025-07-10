import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoteCategory, NoteFilterForm, NotePost } from '../types/content/note.types';

export function createNoteFilterForm(): FormGroup<NoteFilterForm> {
  return new FormGroup<NoteFilterForm>({
    selectedCategory: new FormControl<NoteCategory>(NoteCategory.All, {
      validators: [Validators.required],
      nonNullable: true
    }),
    search: new FormControl<string>('', { nonNullable: true })
  });
}

export function serializeNotePreview(note: NotePost): string {
  return `${note.title} ${note.category} ${note.description} ${note.tags.toString()}`.toLowerCase();
}
