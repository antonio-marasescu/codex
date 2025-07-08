import { Injectable } from '@angular/core';
import { injectContentFiles } from '@analogjs/content';
import { map, of } from 'rxjs';

export interface BlogPost {
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  tags: string[];
  slug: string;
  content: string;
}

export interface Note {
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  slug: string;
  content: string;
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly contentFiles = injectContentFiles();

  getBlogPosts() {
    return of(this.contentFiles).pipe(
      map(files =>
        files
          .filter(file => file.filename.includes('/blog/'))
          .map(
            file =>
              ({
                ...file.attributes,
                slug: file.filename.replace('/blog/', '').replace('.md', ''),
                content: file.content
              }) as BlogPost
          )
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      )
    );
  }

  getBlogPost(slug: string) {
    return of(this.contentFiles).pipe(
      map(files => {
        const file = files.find(f => f.filename === `/blog/${slug}.md`);
        if (!file) return null;
        return {
          ...file.attributes,
          slug,
          content: file.content
        } as BlogPost;
      })
    );
  }

  getNotes() {
    console.log(this.contentFiles);
    return of(this.contentFiles).pipe(
      map(files =>
        files
          .filter(file => file.filename.includes('/notes/'))
          .map(
            file =>
              ({
                ...file.attributes,
                slug: file.filename.replace('/notes/', '').replace('.md', ''),
                content: file.content
              }) as Note
          )
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      )
    );
  }

  getNotesByCategory(category: string) {
    return this.getNotes().pipe(map(notes => notes.filter(note => note.category === category)));
  }

  getNote(slug: string) {
    return of(this.contentFiles).pipe(
      map(files => {
        const file = files.find(f => f.filename === `/notes/${slug}.md`);
        if (!file) return null;
        return {
          ...file.attributes,
          slug,
          content: file.content
        } as Note;
      })
    );
  }

  getCategories() {
    return this.getNotes().pipe(
      map(notes => {
        const categories = new Set(notes.map(note => note.category));
        return Array.from(categories).sort();
      })
    );
  }
}
