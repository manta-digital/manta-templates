import React from 'react';
import { ContentCard, Container } from '@/lib/ui-core';
import { nextjsContentProvider, NextjsTokenProvider } from '@/lib/ui-adapters';
import { siteConfig } from '@/content/site.config';

export default async function LegalPage() {
  let content: { frontmatter: { title?: string }; contentHtml: string; tokens?: Record<string, string> } | null = null;
  
  try {
    // Determine legal content path based on preset configuration
    const preset = siteConfig.presets.legal || 'mit';
    let contentData;
    
    if (preset === 'mit') {
      // Try loading from presets/mit/legal first
      try {
        contentData = await nextjsContentProvider.loadContent('legal', 'presets/mit/legal', {
          tokenConfig: {
            enableTokens: true,
            tokenProvider: new NextjsTokenProvider(siteConfig)
          }
        });
      } catch {
        // Fallback to default legal content
        contentData = await nextjsContentProvider.loadContent('legal', 'legal', {
          tokenConfig: {
            enableTokens: true,
            tokenProvider: new NextjsTokenProvider(siteConfig)
          }
        });
      }
    } else {
      // Load from default legal directory
      contentData = await nextjsContentProvider.loadContent('legal', 'legal', {
        tokenConfig: {
          enableTokens: true,
          tokenProvider: new NextjsTokenProvider(siteConfig)
        }
      });
    }
    
    content = {
      frontmatter: contentData.frontmatter as { title?: string },
      contentHtml: contentData.contentHtml || '',
      tokens: contentData.tokens
    };
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


