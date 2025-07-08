import { StandardContent } from '../types/content/content.types';

export function standardContentSort(a: StandardContent, b: StandardContent): number {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}
