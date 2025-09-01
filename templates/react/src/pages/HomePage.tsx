import { Container } from '../lib/ui-core/components/layouts'
import { QuoteCard, ProjectCard } from '../lib/ui-core/components/cards'
import { homeContent, sampleQuote, reactProjectContent } from '../content'

export default function HomePage() {
  return (
    <>
      {/* Sample Components */}
      <Container className="pt-20 pb-10 text-center space-y-4">
        <h1 className="text-5xl font-bold">React Starter Template</h1>
        <p className="text-muted-foreground text-lg">
          Minimal starter built with React,Tailwind CSS v4 and ShadCN.
        </p>
      </Container>

      <Container className="pb-20">
        <QuoteCard content={sampleQuote} />
      </Container>
    </>
  )
}