import React from 'react';
import { getPresetContent } from '@/lib/presetContent';
import { siteConfig } from '@/content/site.config';
import ContentCard from '@/components/layouts/ContentCard';

export default async function CookiesPage() {
  const content = await getPresetContent<{ title?: string }>('legal', 'cookies', siteConfig.presets.legal);
  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <ContentCard>
        {content.frontmatter.title && (
          <h1 className="mb-4">{content.frontmatter.title}</h1>
        )}
        <div dangerouslySetInnerHTML={{ __html: content.contentHtml }} />
      </ContentCard>
    </main>
  );
}


