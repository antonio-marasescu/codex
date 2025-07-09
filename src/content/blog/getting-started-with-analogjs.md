---
title: 'Getting Started with AnalogJS'
description: 'Learn how to build modern web applications with AnalogJS - a comprehensive guide to getting started with this powerful Angular-based framework'
publishedAt: '2024-01-15'
slug: 'getting-started-with-analogjs'
author: 'Your Name'
draft: false
tags: ['analogjs', 'angular', 'tutorial', 'framework', 'development']
---

# Getting Started with AnalogJS

AnalogJS is a modern full-stack framework for Angular that provides excellent developer experience and performance. It combines the power of Angular with the simplicity of file-based routing and static site generation, making it an ideal choice for building fast, scalable web applications.

## What is AnalogJS?

AnalogJS is a meta-framework for Angular that extends the capabilities of Angular by adding file-based routing, static site generation, and content management features. It's built on top of Vite and provides a seamless development experience with hot module replacement and fast builds.

The framework is designed to be developer-friendly while maintaining the robustness and type safety that Angular developers expect. Whether you're building a simple blog, a complex e-commerce site, or a corporate website, AnalogJS provides the tools you need to succeed.

## Key Features

### File-based Routing

One of the most powerful features of AnalogJS is its file-based routing system. Simply create files in the `src/app/pages` directory, and they automatically become routes in your application. This eliminates the need for complex routing configuration and makes it easy to understand your application structure.

```typescript
// src/app/pages/about.page.ts
import { Component } from '@angular/core';

@Component({
  template: '<h1>About Us</h1>'
})
export default class AboutPage {}
```

### Static Site Generation

AnalogJS excels at static site generation, pre-rendering your pages at build time for optimal performance. This means your users get lightning-fast page loads, and you can deploy to any static hosting service.

### Content Management

The framework includes built-in support for markdown files with frontmatter, making it easy to manage content without a separate CMS. You can organize your content in markdown files and access it through the AnalogJS content API.

### TypeScript Support

Full TypeScript support throughout the framework ensures type safety and better developer experience. You get autocomplete, error checking, and refactoring support out of the box.

## Installation and Setup

Getting started with AnalogJS is straightforward. Here's how to create your first project:

### Prerequisites

Before you begin, make sure you have Node.js (version 18 or higher) installed on your system. You can check your Node.js version by running:

```bash
node --version
```

### Creating a New Project

To create a new AnalogJS project, run the following command:

```bash
npm create @analogjs/platform@latest my-analog-app
```

This command will create a new directory called `my-analog-app` with all the necessary files and dependencies.

### Project Structure

After installation, your project will have the following structure:

```
my-analog-app/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   ├── shared/
│   │   └── app.ts
│   ├── content/
│   │   ├── blog/
│   │   └── notes/
│   └── main.ts
├── public/
├── package.json
└── analog.config.ts
```

## Your First Page

Let's create your first page to see how easy it is to get started:

### Creating a Home Page

Create a file at `src/app/pages/index.page.ts`:

```typescript
import { Component } from '@angular/core';

@Component({
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-4">Welcome to AnalogJS</h1>
      <p class="text-lg text-gray-600">This is your first page built with AnalogJS!</p>
    </div>
  `
})
export default class HomePage {}
```

### Adding More Pages

Create additional pages by adding files to the `pages` directory:

- `src/app/pages/about.page.ts` → `/about`
- `src/app/pages/contact.page.ts` → `/contact`
- `src/app/pages/blog/[slug].page.ts` → `/blog/:slug`

## Content Management

AnalogJS makes it easy to manage content using markdown files. Here's how to set up content management:

### Creating Blog Posts

Create markdown files in the `src/content/blog` directory:

```markdown
---
title: 'My First Blog Post'
description: 'This is my first blog post using AnalogJS'
publishedAt: '2024-01-15'
slug: 'my-first-post'
tags: ['analogjs', 'blog']
---

# My First Blog Post

This is the content of my first blog post...
```

### Accessing Content

You can access your content using the AnalogJS content API:

```typescript
import { inject } from '@angular/core';
import { ContentService } from '@analogjs/content';

@Component({
  template: `
    <div *ngFor="let post of posts()">
      <h2>{{ post.title }}</h2>
      <p>{{ post.description }}</p>
    </div>
  `
})
export default class BlogPage {
  private content = inject(ContentService);
  posts = this.content.getAll('blog');
}
```

## Styling and UI

AnalogJS works seamlessly with popular CSS frameworks and UI libraries:

### Tailwind CSS

AnalogJS has built-in support for Tailwind CSS. To enable it, update your `analog.config.ts`:

```typescript
import { defineConfig } from '@analogjs/platform';

export default defineConfig({
  // ... other config
  tailwind: {
    config: './tailwind.config.js'
  }
});
```

### PrimeNG Components

You can use PrimeNG components for a rich UI experience:

```typescript
import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';

@Component({
  template: `
    <p-card header="Welcome">
      <p>This is a card component from PrimeNG</p>
      <p-button label="Click Me"></p-button>
    </p-card>
  `,
  imports: [Card, Button]
})
export default class WelcomePage {}
```

## Development Workflow

### Development Server

Start the development server with:

```bash
npm run dev
```

This will start a development server with hot module replacement, so your changes will be reflected immediately in the browser.

### Building for Production

When you're ready to deploy, build your application:

```bash
npm run build
```

This will generate static files in the `dist` directory that you can deploy to any static hosting service.

### Preview Build

To preview your production build locally:

```bash
npm run preview
```

## Deployment

AnalogJS applications can be deployed to any static hosting service. Here are some popular options:

### Netlify

1. Connect your repository to Netlify
2. Set build command to `npm run build`
3. Set publish directory to `dist`
4. Deploy!

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts to deploy

### GitHub Pages

1. Add a GitHub Action to build and deploy your site
2. Configure GitHub Pages to serve from the `gh-pages` branch

## Advanced Features

### API Routes

AnalogJS supports API routes for server-side functionality:

```typescript
// src/app/server/api/hello.ts
import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  return { message: 'Hello from AnalogJS!' };
});
```

### Middleware

You can add middleware to handle authentication, logging, and other cross-cutting concerns:

```typescript
// src/app/server/middleware/auth.ts
import { defineEventHandler } from 'h3';

export default defineEventHandler(event => {
  // Add authentication logic here
  console.log('Request to:', event.path);
});
```

### Environment Variables

Manage environment variables using `.env` files:

```bash
# .env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My AnalogJS App
```

## Best Practices

### File Organization

- Keep pages in `src/app/pages`
- Store shared components in `src/app/shared/components`
- Put services in `src/app/shared/services`
- Organize content in `src/content`

### Performance Optimization

- Use lazy loading for large components
- Optimize images and assets
- Implement proper caching strategies
- Use CDNs for static assets

### SEO Optimization

- Add proper meta tags
- Use semantic HTML
- Implement structured data
- Optimize for Core Web Vitals

## Troubleshooting

### Common Issues

**Build Errors**: Make sure all dependencies are installed and TypeScript is properly configured.

**Routing Issues**: Check that your page files follow the correct naming convention and are in the right directory.

**Content Not Loading**: Verify that your markdown files have the correct frontmatter and are in the proper content directory.

### Getting Help

- Check the [AnalogJS documentation](https://analogjs.org)
- Join the [Discord community](https://discord.gg/analogjs)
- Report issues on [GitHub](https://github.com/analogjs/analog)

## Conclusion

AnalogJS provides a powerful and flexible foundation for building modern web applications. With its file-based routing, static site generation, and excellent developer experience, it's an excellent choice for developers who want the power of Angular with the simplicity of modern meta-frameworks.

Whether you're building a personal blog, a corporate website, or a complex web application, AnalogJS has the tools and features you need to succeed. The framework's focus on developer experience and performance makes it a compelling choice for any project.

Start building with AnalogJS today and experience the future of Angular development!
