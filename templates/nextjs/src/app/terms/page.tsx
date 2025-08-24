import React from 'react';
import { ContentCard, Container, ContentData } from '@manta-templates/ui-core';
import { nextjsContentProvider } from '@manta-templates/ui-adapters-nextjs';

interface TermsContent {
  title?: string;
}

export default async function TermsPage() {
  let content: ContentData<TermsContent> | null = null;
  
  try {
    content = await nextjsContentProvider.loadContent<TermsContent>('terms', 'legal');
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


