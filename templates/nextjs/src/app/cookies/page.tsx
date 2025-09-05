import React from 'react';
import { ContentCard, Container, ContentData } from '@/lib/ui-core';
import { nextjsContentProvider, NextjsTokenProvider } from '@/lib/ui-adapters/nextjs';
import { siteConfig } from '@/content/site.config';

interface CookiesContent {
  title?: string;
}

export default async function CookiesPage() {
  let content: ContentData<CookiesContent> | null = null;
  
  try {
    content = await nextjsContentProvider.loadContent<CookiesContent>('cookies', 'presets/mit/legal', {
      tokenConfig: {
        enableTokens: true,
        tokenProvider: new NextjsTokenProvider(siteConfig)
      }
    });
  } catch (error: unknown) {
    console.error('Error loading cookies content:', error);
    // Fallback content
    content = {
      slug: 'cookies',
      frontmatter: { title: 'Cookie Policy' },
      contentHtml: '<p>Cookie policy content not available.</p>'
    };
  }
  return (
    <Container className="py-16">
      <ContentCard>
        {content?.frontmatter.title && (
          <h1 className="mb-4">{content.frontmatter.title}</h1>
        )}
        <div dangerouslySetInnerHTML={{ __html: content?.contentHtml || '' }} />
      </ContentCard>
    </Container>
  );
}


