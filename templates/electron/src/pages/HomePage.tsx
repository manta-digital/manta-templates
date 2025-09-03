import { Container } from '../lib/ui-core/components/layouts'
import { QuoteCard } from '../lib/ui-core/components/cards'
import { useContent } from '../lib/ui-core/content/hooks'
import { contentProvider } from '../lib/content'
import type { QuoteContent } from '../lib/ui-core/content/schemas'

export default function HomePage() {
  const { content: quoteContent, error } = useContent<QuoteContent>(
    'quotes/developer-testimonial', 
    contentProvider
  );

  // Skip loading state to avoid flash - content loads fast enough

  if (error) {
    return (
      <Container className="pt-6 sm:pt-20 pb-10 text-center">
        <div>Error loading content: {error.message}</div>
      </Container>
    );
  }

  if (!quoteContent) {
    return (
      <Container className="pt-6 sm:pt-20 pb-10 text-center">
        <div>No content found</div>
      </Container>
    );
  }

  return (
    <>
      {/* Sample Components */}
      <Container className="pt-6 sm:pt-20 pb-10 text-center space-y-4">
        <h1 className="text-5xl font-bold">Electron Starter Template</h1>
        <p className="text-muted-foreground text-lg">
          Minimal starter built with Electron, React, Tailwind, and Radix.
        </p>
      </Container>

      <Container className="pb-20">
        <QuoteCard content={quoteContent.frontmatter} />
      </Container>
    </>
  )
}