import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button, Panel } from 'vellum-lib';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Button, Panel],
  template: `
    <div class="w-full max-w-4xl mx-auto text-center">
      <h1
        class="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
      >
        Welcome to my Codex
      </h1>
      <p class="text-xl mb-8">My personal space for thoughts, ideas, and knowledge sharing</p>

      <div class="grid md:grid-cols-2 gap-8 mt-12">
        <div
          class="p-6 rounded-lg shadow-lg bg-[var(--vlm-color-bg-surface)]/80 backdrop-blur-sm border border-[var(--vlm-color-border)]"
        >
          <h2 class="text-2xl font-semibold mb-4">📚 Notes</h2>
          <div class="min-h-35 max-h-35 flex flex-col items-center">
            <p class="mb-4 flex-1">My ideas and personal notes for different categories.</p>
            <a routerLink="/notes/overview">
              <vlm-button [theme]="'info'" [label]="'Explore Notes'" />
            </a>
          </div>
        </div>
        <div
          class="p-6 rounded-lg shadow-lg bg-[var(--vlm-color-bg-surface)]/80 backdrop-blur-sm border border-[var(--vlm-color-border)]"
        >
          <h2 class="text-2xl font-semibold mb-4">📝 Blog</h2>
          <div class="min-h-35 max-h-35 flex flex-col items-center">
            <p class="mb-4 flex-1">My thoughts, experiences, and insights.</p>
            <a routerLink="/blogs/overview">
              <vlm-button [theme]="'info'" [label]="'Explore Blog'" />
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export default class HomePageComponent {}
