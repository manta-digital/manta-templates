import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import gfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import matter from 'gray-matter';

import { getContentBySlug } from './content';
import { siteConfig, type PresetKey, deriveContacts } from '@/content/site.config';

const contentRoot = path.join(process.cwd(), 'src', 'content');

const customSanitizeSchema: typeof defaultSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    pre: [ ...(defaultSchema.attributes?.pre || []), 'style', 'tabindex', ['dataLanguage', 'data-language'], ['dataTheme', 'data-theme'] ],
    code: [ ...(defaultSchema.attributes?.code || []), 'style', ['dataLanguage', 'data-language'], ['dataTheme', 'data-theme'] ],
    span: [ ...(defaultSchema.attributes?.span || []), 'style', ['dataLine', 'data-line'] ],
    figure: [ ...(defaultSchema.attributes?.figure || []), ['dataRehypePrettyCodeFigure', 'data-rehype-pretty-code-figure'] ],
  },
  tagNames: [ ...(defaultSchema.tagNames || []), 'figure' ],
};

export function buildTokens() {
  const contacts = deriveContacts(siteConfig);
  const tokens: Record<string, string> = {
    'site.name': siteConfig.site.name,
    'site.url': siteConfig.site.url,
    'author.name': siteConfig.author.name,
    'contacts.primaryEmail': contacts.primary,
    'contacts.businessEmail': contacts.business,
    'contacts.supportEmail': contacts.support,
  };
  return tokens;
}

function applyTokens(raw: string, tokens: Record<string, string>): string {
  let out = raw;
  for (const [key, val] of Object.entries(tokens)) {
    const re = new RegExp(`\\{\\{${key.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\}\\}`, 'g');
    out = out.replace(re, val);
  }
  return out;
}

export async function getPresetContent<T extends object>(contentType: string, slug: string, preset: PresetKey) {
  // Try preset path first when not placeholder
  if (preset !== 'placeholder') {
    const presetDir = path.join(contentRoot, 'presets', preset, contentType);
    const presetPath = path.join(presetDir, `${slug}.md`);
    if (fs.existsSync(presetPath)) {
      const raw = fs.readFileSync(presetPath, 'utf8');
      const parsed = matter(raw);
      const withTokens = applyTokens(parsed.content, buildTokens());
      const processed = await remark()
        .use(gfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypePrettyCode, { theme: 'github-dark' })
        .use(rehypeSanitize, customSanitizeSchema)
        .use(rehypeStringify)
        .process(withTokens);
      return {
        slug,
        contentHtml: processed.toString(),
        frontmatter: parsed.data as T,
      };
    }
  }
  // Fallback to default content loader
  return getContentBySlug<T>(contentType, slug);
}


