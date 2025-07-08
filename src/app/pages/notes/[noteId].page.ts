import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-note-detail',
  imports: [],
  template: `
    <div>
      <h2>Note: {{ noteId }}</h2>
      <p>This is the content for note: {{ noteId }}</p>
      <a routerLink="/notes">← Back to Notes</a>
    </div>
  `
})
export default class NoteDetailComponent {
  private route = inject(ActivatedRoute);
  noteId = this.route.snapshot.paramMap.get('noteId');
}
