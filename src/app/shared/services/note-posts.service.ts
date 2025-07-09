import { Injectable, signal, Signal } from '@angular/core';
import { ContentFile, injectContentFiles } from '@analogjs/content';
import { standardContentSort } from '../utils/content.utils';
import { NoteCategory, NoteFilenameIdentifier, NotePost } from '../types/content/note.types';

@Injectable({ providedIn: 'root' })
export class NotePostsService {
  private readonly contentFiles = injectContentFiles();

  public getPosts(): Signal<readonly NotePost[]> {
    const notePosts = this.getNotePosts().sort(standardContentSort);
    return signal(notePosts).asReadonly();
  }

  public getPostBySlug(slug: string): Signal<NotePost | null> {
    const files = this.getNotePostFiles();
    const foundFile = files.find(f => f.filename.includes(slug));

    const result = signal<NotePost | null>(null);
    if (!foundFile) {
      return result.asReadonly();
    }

    result.set(this.mapFileToNotePost(foundFile));
    return result.asReadonly();
  }

  public getPostsByCategory(): Signal<Record<string, NotePost[]>> {
    const posts = this.getNotePosts();
    const postsByCategory = posts.reduce(
      (accum, post) => {
        const previous = accum[post.category] ?? [];
        return {
          ...accum,
          [post.category]: [...previous, post]
        };
      },
      {} as Record<string, NotePost[]>
    );

    return signal(postsByCategory).asReadonly();
  }

  public getCategories(): Signal<NoteCategory[]> {
    const posts = this.getNotePosts();
    const categories = posts.map(p => p.category);
    const categoriesSet = new Set(categories);
    return signal(Array.from(categoriesSet)).asReadonly();
  }

  private getNotePostFiles(): ContentFile[] {
    return this.contentFiles.filter(file => file.filename.includes(NoteFilenameIdentifier));
  }

  private getNotePosts(): NotePost[] {
    const files = this.getNotePostFiles();
    return files.map(this.mapFileToNotePost);
  }

  private mapFileToNotePost(file: ContentFile): NotePost {
    return {
      ...file.attributes,
      category: file.attributes['category'],
      content: file.content,
      filename: file.filename,
      folder: file.attributes['category'].toLowerCase()
    } as NotePost;
  }
}
