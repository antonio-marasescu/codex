/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog, { PrerenderContentFile } from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020']
  },
  resolve: {
    mainFields: ['module']
  },
  plugins: [
    analog({
      content: {
        highlighter: 'shiki'
      },
      prerender: {
        routes: async () => [
          '/',
          '/blog',
          '/notes',
          {
            contentDir: 'src/content/blog',
            transform: (file: PrerenderContentFile) => {
              if (file.attributes['draft']) {
                return false;
              }
              const slug = file.attributes['slug'] || file.name;
              console.log(slug);
              return `/blog/${slug}`;
            }
          },
          {
            contentDir: 'src/content/notes',
            transform: (file: PrerenderContentFile) => {
              if (file.attributes['draft']) {
                return false;
              }
              const slug = file.attributes['slug'] || file.name;
              return `/notes/${slug}`;
            }
          }
        ],
        postRenderingHooks: [async route => console.log(route)]
      }
    }),
    tailwindcss()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default']
  },
  define: {
    'import.meta.vitest': mode !== 'production'
  }
}));
