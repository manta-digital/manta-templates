import { ContentCard, Container } from '@/lib/ui-core';

export default function PrivacyPage() {
  return (
    <Container className="py-16">
      <ContentCard>
        <h1 className="mb-4">Privacy Policy</h1>
        <div className="prose dark:prose-invert">
          <p>We keep things simple and private. This site does not collect, store, or process personal information from visitors.</p>
          
          <h3>Information We Don't Collect</h3>
          <p>We do not use cookies for tracking, analytics, or advertising. We do not store personal data about your visit.</p>
          
          <h3>Third-Party Services</h3>
          <p>This site may be hosted by a third‑party provider and therefore be subject to their policies. We don't add extra tracking.</p>
          
          <h3>Contact</h3>
          <p>Questions? Email us.</p>
          
          <blockquote>
            <p>Note: This content pack is provided as a convenience for MIT-licensed sites/apps. It is not legal advice.</p>
          </blockquote>
        </div>
      </ContentCard>
    </Container>
  );
}