// Minimal content system types for React template
// Only the interfaces needed for content consumption, not processing

export interface ContentResult<T = Record<string, any>> {
  frontmatter: T;
  contentHtml: string;
  excerpt?: string;
  slug: string;
  lastModified: Date;
  meta: {
    readingTime: number;
    wordCount: number;
    headings: Array<{ depth: number; text: string; id: string }>;
  };
}

export interface ContentFilters {
  type?: string;
  tags?: string[];
  category?: string;
}

export interface ContentEngine {
  loadContent<T = Record<string, any>>(slug: string): Promise<ContentResult<T>>;
  loadContentCollection<T = Record<string, any>>(filters?: ContentFilters): Promise<ContentResult<T>[]>;
  renderMarkdown(content: string, options?: any): Promise<string>;
  validateContent<S>(content: unknown, schema: S): any;
}