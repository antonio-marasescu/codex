import { Component } from '@angular/core';

@Component({
  selector: 'app-notes-overview',
  imports: [],
  template: `
    <div>
      <h2>Notes Overview</h2>
      <p>Welcome to the notes section. Here you'll find all our notes.</p>
      <ul>
        <li><a routerLink="/notes/note-1">Note 1</a></li>
        <li><a routerLink="/notes/note-2">Note 2</a></li>
      </ul>
    </div>
  `
})
export default class NotesOverviewComponent {}
