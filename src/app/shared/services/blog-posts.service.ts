import { Injectable, signal, Signal } from '@angular/core';
import { ContentFile, injectContentFiles } from '@analogjs/content';
import { BlogFilenameIdentifier, BlogPost } from '../types/content/blog.types';
import { standardContentSort } from '../utils/content.utils';

@Injectable({ providedIn: 'root' })
export class BlogPostsService {
  private readonly contentFiles = injectContentFiles();

  public getPosts(): Signal<readonly BlogPost[]> {
    const files = this.getBlogPostFiles();
    const blogPosts: BlogPost[] = files.map(this.mapFileToBlogPost).sort(standardContentSort);
    return signal(blogPosts).asReadonly();
  }

  public getPostBySlug(slug: string): Signal<BlogPost | null> {
    const files = this.getBlogPostFiles();
    const foundFile = files.find(f => f.filename.includes(slug));

    const result = signal<BlogPost | null>(null);
    if (!foundFile) {
      return result.asReadonly();
    }
    result.set(this.mapFileToBlogPost(foundFile));
    return result.asReadonly();
  }

  private getBlogPostFiles(): ContentFile[] {
    return this.contentFiles.filter(file => file.filename.includes(BlogFilenameIdentifier));
  }

  private mapFileToBlogPost(file: ContentFile): BlogPost {
    return {
      ...file.attributes,
      content: file.content,
      filename: file.filename,
      type: 'blog'
    } as BlogPost;
  }
}
