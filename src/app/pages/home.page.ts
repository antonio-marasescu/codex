import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ButtonDirective, Card],
  template: `
    <div class="w-full max-w-4xl mx-auto text-center">
      <h1
        class="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
      >
        Welcome to Codex
      </h1>
      <p class="text-xl mb-8">My personal space for thoughts, ideas, and knowledge sharing</p>

      <div class="grid md:grid-cols-2 gap-8 mt-12">
        <p-card
          class="p-6 rounded-lg shadow-lg bg-surface-100 dark:bg-surface-900/20 border border-surface-200 dark:border-surface-900"
        >
          <ng-template #header>
            <h2 class="text-2xl font-semibold mb-4">📚 Notes</h2>
          </ng-template>
          <div class="min-h-35 max-h-35 flex flex-col items-center">
            <p class="mb-4 flex-1">My ideas and personal notes for different categories.</p>
            <a pButton routerLink="/notes/overview" severity="info">Explore Notes</a>
          </div>
        </p-card>
        <p-card
          class="p-6 rounded-lg shadow-lg bg-surface-100 dark:bg-surface-900/20 border border-surface-200 dark:border-surface-900"
        >
          <ng-template #header>
            <h2 class="text-2xl font-semibold mb-4">📝 Blog</h2>
          </ng-template>
          <div class="min-h-35 max-h-35 flex flex-col items-center">
            <p class="mb-4 flex-1">My thoughts, experiences, and insights.</p>
            <a pButton routerLink="/blog/overview" severity="help">Explore Blog</a>
          </div>
        </p-card>
      </div>
    </div>
  `
})
export default class HomePageComponent {}
