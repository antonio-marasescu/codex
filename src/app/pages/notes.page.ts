import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-notes',
  imports: [RouterOutlet],
  template: `
    <div>
      <h1>Notes</h1>
      <router-outlet></router-outlet>
    </div>
  `
})
export default class NotesPageComponent {}
