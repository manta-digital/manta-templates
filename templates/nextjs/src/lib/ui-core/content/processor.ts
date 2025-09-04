import matter from 'gray-matter';
import { remark } from 'remark';
import gfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { ContentProcessError } from './types';

// Define a custom schema for rehype-sanitize to allow styles from rehype-pretty-code
const customSanitizeSchema: typeof defaultSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    pre: [
      ...(defaultSchema.attributes?.pre || []),
      'style',
      'tabindex',
      ['dataLanguage', 'data-language'],
      ['dataTheme', 'data-theme'],
    ],
    code: [
      ...(defaultSchema.attributes?.code || []),
      'style',
      ['dataLanguage', 'data-language'],
      ['dataTheme', 'data-theme'],
    ],
    span: [
      ...(defaultSchema.attributes?.span || []),
      'style',
      ['dataLine', 'data-line'],
    ],
    figure: [
      ...(defaultSchema.attributes?.figure || []),
      ['dataRehypePrettyCodeFigure', 'data-rehype-pretty-code-figure'],
    ],
  },
  tagNames: [...(defaultSchema.tagNames || []), 'figure'],
};

/**
 * Content Processor Configuration
 * 
 * Configurable options for the markdown processing pipeline.
 */
export interface ProcessorConfig {
  /** Theme for code highlighting (single theme or object with light/dark) */
  theme?: string | { light: string; dark: string };
  /** Custom sanitization schema (defaults to customSanitizeSchema) */
  sanitizeSchema?: any;
  /** Additional remark plugins to use */
  remarkPlugins?: any[];
  /** Additional rehype plugins to use */
  rehypePlugins?: any[];
}

/**
 * Content Processor
 * 
 * Handles markdown processing and frontmatter parsing with configurable options.
 * Provides a consistent processing pipeline that can be shared across different
 * content providers and framework adapters.
 */
export class ContentProcessor {
  private theme: string | { light: string; dark: string };
  private sanitizeSchema: any;
  private remarkPlugins: any[];
  private rehypePlugins: any[];

  constructor(private config: ProcessorConfig = {}) {
    this.theme = config.theme || 'github-dark';
    this.sanitizeSchema = config.sanitizeSchema || customSanitizeSchema;
    this.remarkPlugins = config.remarkPlugins || [];
    this.rehypePlugins = config.rehypePlugins || [];
  }

  /**
   * Process markdown content into HTML
   * 
   * @param content - Raw markdown content to process
   * @returns Promise resolving to processed HTML string
   * @throws ContentProcessError - When markdown processing fails
   */
  async processMarkdown(content: string): Promise<string> {
    try {
      const processedContent = await remark()
        .use(gfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypePrettyCode, { theme: this.theme as any })
        .use(rehypeSanitize, this.sanitizeSchema)
        .use(rehypeStringify)
        .process(content);
      
      return processedContent.toString();
    } catch (error) {
      throw new ContentProcessError(
        `Failed to process markdown content: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof Error ? error : undefined
      );
    }
  }

  /**
   * Parse frontmatter from markdown content
   * 
   * @param content - Raw markdown content with frontmatter
   * @returns Object containing parsed frontmatter and content body
   * @throws ContentProcessError - When frontmatter parsing fails
   */
  parseFrontmatter(content: string): { frontmatter: any; content: string } {
    try {
      const matterResult = matter(content);
      return { 
        frontmatter: matterResult.data, 
        content: matterResult.content 
      };
    } catch (error) {
      throw new ContentProcessError(
        `Failed to parse frontmatter: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof Error ? error : undefined
      );
    }
  }
}