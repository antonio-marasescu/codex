import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogFilterForm, BlogPost } from '../types/content/blog.types';

export function createBlogFilterForm(): FormGroup<BlogFilterForm> {
  return new FormGroup<BlogFilterForm>({
    search: new FormControl<string>('', { nonNullable: true })
  });
}

export function serializeBlogPreview(blog: BlogPost): string {
  return `${blog.title} ${blog.description} ${blog.tags.toString()}`.toLowerCase();
}
