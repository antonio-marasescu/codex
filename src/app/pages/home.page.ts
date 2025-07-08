import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center p-8">
      <div class="text-center max-w-4xl">
        <h1
          class="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
        >
          Welcome to Codex
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Your personal space for thoughts, ideas, and knowledge sharing
        </p>

        <div class="grid md:grid-cols-2 gap-8 mt-12">
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h2 class="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">📝 Blog</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Share your thoughts, experiences, and insights with the world.
            </p>
            <a
              routerLink="/blog/overview"
              class="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Explore Blog
            </a>
          </div>

          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h2 class="text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
              📚 Notes
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Organize your knowledge, ideas, and personal notes by category.
            </p>
            <a
              routerLink="/notes/overview"
              class="inline-block bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              View Notes
            </a>
          </div>
        </div>

        <div class="mt-12 text-center">
          <p class="text-gray-500 dark:text-gray-400">Built with ❤️ using AnalogJS</p>
        </div>
      </div>
    </div>
  `
})
export default class HomePageComponent {}
