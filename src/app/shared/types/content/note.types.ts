import { StandardContent } from './content.types';
import { FormControl } from '@angular/forms';

export enum NoteCategory {
  Cloud = 'Cloud',
  Iac = 'Iac',
  Webdev = 'Webdev',
  Llm = 'Llm',
  Investing = 'Investing',
  All = 'All'
}

export type NotePost = {
  category: NoteCategory;
  folder: string;
  type: 'note';
} & StandardContent;

export type NoteFilterForm = {
  selectedCategory: FormControl<NoteCategory>;
  search: FormControl<string>;
};

export type NoteFilterFormValues = {
  selectedCategory: NoteCategory;
  search: string;
};

export const NoteFilenameIdentifier = '/content/notes/';
