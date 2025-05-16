import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import gfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export interface PostFrontmatter {
  title: string;
  description: string;
  image?: string;
  pubDate: string; // Dates are strings in YAML, convert for sorting
  contentType: string;
  cardSize: string;
  tags?: string[];
}

export interface PostData extends PostFrontmatter {
  slug: string;
  contentHtml: string;
}

export interface SortedPostInfo {
  slug: string;
  frontmatter: PostFrontmatter;
}

// Function to get all post slugs for static generation
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

// Function to get sorted post data (frontmatter only) for listings
export function getSortedPostsData(): SortedPostInfo[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        frontmatter: data as PostFrontmatter,
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    const dateA = new Date(a.frontmatter.pubDate);
    const dateB = new Date(b.frontmatter.pubDate);
    return dateB.getTime() - dateA.getTime(); // Descending order
  });
}

// Define a custom schema for rehype-sanitize
const customSanitizeSchema: typeof defaultSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    pre: [
      ...(defaultSchema.attributes?.pre || []),
      'style', // Allow style attribute for background color, etc.
      'tabindex', // Allow tabindex
      ['dataLanguage', 'data-language'], // Allow data-language (rehype-pretty-code uses this)
      ['dataTheme', 'data-theme'], // Allow data-theme
    ],
    code: [
      ...(defaultSchema.attributes?.code || []),
      'style', // Allow style attribute for display: grid, etc.
      ['dataLanguage', 'data-language'],
      ['dataTheme', 'data-theme'],
    ],
    span: [
      ...(defaultSchema.attributes?.span || []),
      'style', // Allow style attribute for token colors
      ['dataLine', 'data-line'], // Allow data-line
    ],
    figure: [
      ...(defaultSchema.attributes?.figure || []),
      ['dataRehypePrettyCodeFigure', 'data-rehype-pretty-code-figure'],
    ],
  },
  tagNames: [...(defaultSchema.tagNames || []), 'figure'], // Ensure figure tag is allowed if not by default
};

// Function to get individual post data (frontmatter + HTML content)
export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(gfm) // GitHub Flavored Markdown
    .use(remarkRehype, { allowDangerousHtml: true }) // Convert mdast to hast
    .use(rehypePrettyCode, {
      theme: 'github-dark', // Shiki theme for syntax highlighting
      // TODO: Add options for line numbers, custom titles, etc. if needed later
    })
    .use(rehypeSanitize, customSanitizeSchema) // Sanitize HTML content with custom schema
    .use(rehypeStringify) // Convert hast to HTML string
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as PostFrontmatter),
  };
}
