import React from 'react';
import { ContentCard, Container } from '@manta-templates/ui-core';
import { getPresetContent } from '@/lib/presetContent';

export default async function LegalPage() {
  let content: { frontmatter: { title?: string }; contentHtml: string } | null = null;
  
  try {
    content = await getPresetContent('legal', 'legal', 'mit');
  } catch (error: unknown) {
    console.error('Error loading legal content:', error);
    // Fallback content
    content = {
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


