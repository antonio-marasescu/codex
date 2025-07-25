import { StandardContent } from './content.types';
import { FormControl } from '@angular/forms';

export type BlogPost = { type: 'blog' } & StandardContent;

export type BlogFilterForm = {
  search: FormControl<string>;
};

export type BlogFilterFormValues = {
  search: string;
};

export const BlogFilenameIdentifier = '/content/blog/';
