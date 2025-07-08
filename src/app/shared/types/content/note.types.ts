import { StandardContent } from './content.types';

export enum NoteCategory {
  Cloud = 'Cloud',
  Iac = 'Iac',
  Webdev = 'Webdev',
  Llm = 'Llm',
  Investing = 'Investing'
}

export type NotePost = {
  category: NoteCategory;
} & StandardContent;

export const NoteFilenameIdentifier = '/content/notes/';
