import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-notes-layout',
  imports: [RouterOutlet],
  template: `
    <div class="w-full max-w-4xl mx-auto">
      <router-outlet />
    </div>
  `
})
export default class NotesLayoutComponent {}
