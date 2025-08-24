import React from 'react';
import { ContentCard, Container, ContentData } from '@manta-templates/ui-core';
import { nextjsContentProvider } from '@manta-templates/ui-adapters-nextjs';

interface PrivacyContent {
  title?: string;
}

export default async function PrivacyPage() {
  let content: ContentData<PrivacyContent> | null = null;
  
  try {
    content = await nextjsContentProvider.loadContent<PrivacyContent>('privacy', 'legal');
  } catch (error: unknown) {
    console.error('Error loading privacy content:', error);
    // Fallback content
    content = {
      slug: 'privacy',
      frontmatter: { title: 'Privacy Policy' },
      contentHtml: '<p>Privacy policy content not available.</p>'
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


