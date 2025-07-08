/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
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
        routes: [
          '/blog/overview',
          '/blog/getting-started-with-analogjs',
          '/blog/why-static-site-generation',
          '/notes/overview',
          '/notes/cloud/aws-lambda-basics',
          '/notes/cloud/azure-functions-overview',
          '/notes/iac/terraform-fundamentals',
          '/notes/investing/value-investing-principles'
        ]
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
