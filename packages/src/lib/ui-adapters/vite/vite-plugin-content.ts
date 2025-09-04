import type { Plugin } from 'vite';
import path from 'node:path';
import fs from 'node:fs/promises';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

export interface ViteContentPluginOptions {
  sanitize?: boolean;
  contentAlias?: string;
}

export function viteContentPlugin({
  sanitize = true,
  contentAlias = '@manta-templates/content',
}: {
  sanitize?: boolean; 
  contentAlias?: string;
} = {}): Plugin {
  let aliasRootAbs: string | null = null;

  return {
    name: 'vite-plugin-content',
    configResolved(c) {
      const alias = c.resolve.alias.find(a =>
        typeof a.find === 'string' && a.find === contentAlias
      );
      aliasRootAbs = alias ? (alias.replacement as string) : null;
    },
    async transform(code, id) {
      if (!id.endsWith('.md')) return null;
      
      try {
        // Parse frontmatter and content
        const { data: frontmatter, content, excerpt } = matter(code, { excerpt: true });
        
        // Initialize headings array
        const headings: { depth: number; text: string; id: string }[] = [];
        
        // Build remark processor pipeline properly
        const processor = remark()
          .use(remarkGfm)
          .use(remarkRehype, { allowDangerousHtml: true })
          // All rehype plugins must be chained after remarkRehype
          .use(rehypeRaw) // CRITICAL: Always parse raw HTML
          .use(sanitize ? rehypeSanitize : () => {}) // Optional sanitization
          .use(rehypeSlug) // Generate heading IDs
          .use(rehypeAutolinkHeadings) // Add autolinks to headings
          .use(rehypeExternalLinks, { 
            target: '_blank', 
            rel: ['noopener','noreferrer'] 
          })
          // Headings collection plugin
          .use(() => (tree) => {
            visit(tree, 'element', (node: any) => {
              if (/^h[1-6]$/.test(node.tagName)) {
                const depth = Number(node.tagName[1]);
                const id = (node.properties?.id as string) ?? '';
                const text = (node.children ?? [])
                  .filter((c: any) => c.type === 'text')
                  .map((c: any) => c.value)
                  .join('');
                headings.push({ depth, text, id });
              }
            });
          })
          .use(rehypeStringify); // Final stringify step
        
        // Process content and generate HTML
        const html = String(await processor.process(content));
        
        // Calculate accurate word count
        const wordCount = (content.trim().match(/\S+/g) ?? []).length;
        const readingTime = Math.ceil(wordCount / 200);
        
        // Get file modification time
        const stats = await fs.stat(id);
        
        // Generate nested slug from file path
        const rel = aliasRootAbs ? path.relative(aliasRootAbs, id) : path.basename(id);
        const slug = rel.split(path.sep).join('/').replace(/\.md$/, '');
        
        // Generate ESM module with proper Date constructor
        const iso = stats.mtime.toISOString();
        const js = `
const compiled = {
  frontmatter: ${JSON.stringify(frontmatter)},
  contentHtml: ${JSON.stringify(html)},
  excerpt: ${excerpt ? JSON.stringify(excerpt) : 'undefined'},
  slug: ${JSON.stringify(slug)},
  lastModified: new Date(${JSON.stringify(iso)}),
  meta: {
    readingTime: ${readingTime},
    wordCount: ${wordCount},
    headings: ${JSON.stringify(headings)}
  }
};
export default compiled;`;
        
        return { code: js, map: null };
      } catch (error) {
        console.error(`Error processing markdown file ${id}:`, error);
        throw error;
      }
    },
    handleHotUpdate(ctx) {
      if (ctx.file.endsWith('.md')) {
        return ctx.modules; // hot-update the transformed module(s)
      }
    }
  };
}
