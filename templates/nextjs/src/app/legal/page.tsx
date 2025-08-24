import React from 'react';
import { ContentCard, Container, ContentData } from '@manta-templates/ui-core';
import { nextjsContentProvider } from '@manta-templates/ui-adapters-nextjs';

interface LegalContent {
  title?: string;
}

export default async function LegalPage() {
  let content: ContentData<LegalContent> | null = null;
  
  try {
    content = await nextjsContentProvider.loadContent<LegalContent>('legal', 'legal');
  } catch (error: unknown) {
    console.error('Error loading legal content:', error);
    // Fallback content
    content = {
      slug: 'legal',
      frontmatter: { title: 'Legal Information' },
      contentHtml: '<p>Legal content not available.</p>'
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


