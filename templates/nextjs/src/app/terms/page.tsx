import React from 'react';
import { ContentCard, Container, ContentData } from '@/lib/ui-core';
import { nextjsContentProvider, NextjsTokenProvider } from '@/lib/ui-adapters';
import { siteConfig } from '@/content/site.config';

interface TermsContent {
  title?: string;
}

export default async function TermsPage() {
  let content: ContentData<TermsContent> | null = null;
  
  try {
    content = await nextjsContentProvider.loadContent<TermsContent>('terms', 'legal/presets/mit', {
      tokenConfig: {
        enableTokens: true,
        tokenProvider: new NextjsTokenProvider(siteConfig)
      }
    });
  } catch (error: unknown) {
    console.error('Error loading terms content:', error);
    // Fallback content
    content = {
      slug: 'terms',
      frontmatter: { title: 'Terms of Service' },
      contentHtml: '<p>Terms of service content not available.</p>'
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


