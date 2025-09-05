import { ContentCard, Container } from '@/lib/ui-core';

export default function CookiesPage() {
  return (
    <Container className="py-16">
      <ContentCard>
        <h1 className="mb-4">Cookie Policy</h1>
        <div className="prose dark:prose-invert">
          <h3>Types of Cookies</h3>
          <p>This site uses essential cookies only when required for secure operation. No analytics or advertising cookies are used.</p>
          
          <h3>Managing Cookies</h3>
          <p>You can control cookies through your browser settings.</p>
          
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