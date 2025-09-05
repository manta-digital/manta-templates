import { ContentCard, Container } from '@/lib/ui-core';

export default function LegalPage() {
  return (
    <Container className="py-16">
      <ContentCard>
        <h1 className="mb-4">Legal Information</h1>
        <div className="prose dark:prose-invert">
          <p><em>Last updated: 2024</em></p>
          
          <h2>Software License</h2>
          <p>The software available through this website is licensed under the <strong>MIT License</strong>. You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, provided you keep the license notices and understand it is provided "as is".</p>
          
          <p><strong>Full MIT License text and copyright details are available in the LICENSE file within the software repository.</strong></p>
          
          <h2>Website Terms of Use</h2>
          
          <h3>Acceptance of Terms</h3>
          <p>By accessing this website, you agree to these terms. If you disagree with any part, please discontinue use.</p>
          
          <h3>Intellectual Property</h3>
          <p>Software is MIT‑licensed. Site content (words, images, design) is owned by us unless otherwise noted. Follow page‑specific licenses where provided.</p>
          
          <h3>Website Use</h3>
          <p>This site is for information about our open-source software. Don't use it unlawfully or in ways that damage the site.</p>
          
          <h3>Limitation of Liability</h3>
          <p>The site and code are provided "as is" without warranties. We are not liable for damages from using the site or code.</p>
          
          <h3>Modifications</h3>
          <p>We may update these terms and will post changes here.</p>
          
          <h2>Privacy Policy (Summary)</h2>
          <p>We aim to keep things simple and private. We may collect basic analytics, voluntary contact information, and technical data needed for security/operation. We use reputable third‑party services (hosting, analytics, email). See their policies for details.</p>
          
          <p>For data requests or questions, contact us via email.</p>
          
          <blockquote>
            <p>Note: This MIT pack text is a convenience, not legal advice.</p>
          </blockquote>
        </div>
      </ContentCard>
    </Container>
  );
}