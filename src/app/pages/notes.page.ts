import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-notes-layout',
  imports: [RouterOutlet, RouterLink],
  template: `
    <div>
      <h1>Notes</h1>
      <nav>
        <a routerLink="/notes/overview">Overview</a>
      </nav>
      <router-outlet />
    </div>
  `
})
export default class NotesLayoutComponent {}
