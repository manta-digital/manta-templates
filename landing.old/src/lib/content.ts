import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import gfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

// Defines the base directory for all content
const contentRoot = path.join(process.cwd(), 'src', 'content');

/**
 * Represents the processed content data returned for a single item.
 * @template T The type of the frontmatter data.
 */
export interface ContentData<T extends object> {
  slug: string;
  contentHtml: string;
  frontmatter: T;
}

/**
 * Represents the metadata for a single content item, used in listings.
 * @template T The type of the frontmatter data.
 */
export interface ContentMeta<T extends object> {
  slug: string;
  frontmatter: T;
}

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
 * Retrieves and processes a single markdown file by its content type and slug.
 *
 * @template T The expected type of the frontmatter.
 * @param {string} contentType - The subdirectory within `src/content` (e.g., 'projects', 'blog').
 * @param {string} slug - The name of the markdown file without the .md extension.
 * @returns {Promise<ContentData<T>>} The processed content, including frontmatter and HTML.
 */
export async function getContentBySlug<T extends object>(
  contentType: string,
  slug: string,
): Promise<ContentData<T>> {
  const contentDir = path.join(contentRoot, contentType);
  const fullPath = path.join(contentDir, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Content not found: ${fullPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(gfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrettyCode, { theme: 'github-dark' })
    .use(rehypeSanitize, customSanitizeSchema)
    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    frontmatter: matterResult.data as T,
  };
}

/**
 * Retrieves the metadata (frontmatter) for all content of a specific type.
 * This is optimized for listing pages as it doesn't process the markdown body.
 *
 * @template T The expected type of the frontmatter.
 * @param {string} contentType - The subdirectory within `src/content`.
 * @returns {ContentMeta<T>[]} An array of content metadata, sorted by date if available.
 */
export function getAllContent<T extends object>(contentType: string): ContentMeta<T>[] {
  const contentDir = path.join(contentRoot, contentType);
  
  if (!fs.existsSync(contentDir)) {
    console.warn(`Content directory not found: ${contentDir}`);
    return [];
  }

  const fileNames = fs.readdirSync(contentDir);
  const allContentData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(contentDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        frontmatter: data as T,
      };
    });

  // Sort by 'pubDate' in descending order if the property exists
  if (allContentData.length > 0 && 'pubDate' in allContentData[0].frontmatter) {
    return allContentData.sort((a, b) => {
      const dateA = new Date((a.frontmatter as { pubDate: string }).pubDate);
      const dateB = new Date((b.frontmatter as { pubDate: string }).pubDate);
      return dateB.getTime() - dateA.getTime();
    });
  }

  return allContentData;
}
