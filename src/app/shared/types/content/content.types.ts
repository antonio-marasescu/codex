export type StandardContent = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  content: string;
  filename: string;
  type: 'blog' | 'note';
};
