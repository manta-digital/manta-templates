import { ContentCard, Container } from '@/lib/ui-core';

export default function TermsPage() {
  return (
    <Container className="py-16">
      <ContentCard>
        <h1 className="mb-4">Terms of Service</h1>
        <div className="prose dark:prose-invert">
          <h3>What you can do</h3>
          <ul>
            <li>Unless specifically mentioned, the software in this template is MIT‑licensed. You can use it, change it, and sell things built with it. Any content with a specific license will provide that license with it.</li>
            <li>Please keep any license files that come with code you reuse.</li>
          </ul>
          
          <h3>Site content (words, images, media)</h3>
          <ul>
            <li>Unless stated otherwise, site content is owned by us.</li>
            <li>You're welcome to read and link to it. If you reuse content, follow the license on that page (if any) or ask first.</li>
          </ul>
          
          <h3>Privacy</h3>
          <ul>
            <li>We try to keep things simple and private. See the Privacy Policy for details.</li>
          </ul>
          
          <h3>No guarantees</h3>
          <ul>
            <li>The site and code are provided "as is." We try to be accurate, but we make no promises.</li>
          </ul>
          
          <h3>Contact</h3>
          <p>Questions? Email us.</p>
          
          <blockquote>
            <p>Note: This content pack is provided as a convenience for MIT‑licensed sites/apps. It is not legal advice.</p>
          </blockquote>
        </div>
      </ContentCard>
    </Container>
  );
}