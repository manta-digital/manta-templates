import { Container, QuoteCard } from '@manta-templates/ui-core';
import { nextjsContentProvider } from '@manta-templates/ui-adapters-nextjs';
import type { QuoteContent } from '@manta-templates/ui-core';

export default async function Home() {
  // Load quote content using ui-adapters
  let quoteContent = null;
  try {
    const quote = await nextjsContentProvider.loadContent<QuoteContent>('sample-quote', 'quotes');
    quoteContent = quote.frontmatter;
  } catch (error: unknown) {
    console.error('Error loading quote content:', error);
  }

  return (
    <>
      {/* Hero */}
      <Container className="pt-20 pb-10 text-center space-y-4">
        <h1 className="text-5xl font-bold">Next.js Starter Template</h1>
        <p className="text-muted-foreground text-lg">
          Minimal starter built with Tailwind CSS v4 and ShadCN.
        </p>
      </Container>

      {/* Sample Content */}
      <Container className="pb-20">
        {quoteContent && <QuoteCard content={quoteContent} />}
      </Container>
    </>
  );
}
