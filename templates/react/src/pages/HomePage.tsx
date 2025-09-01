import { Container } from '../lib/ui-core/components/layouts'
import { QuoteCard, ProjectCard } from '../lib/ui-core/components/cards'
import { homeContent, sampleQuote, reactProjectContent } from '../content'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Container className="pt-20 pb-10 text-center space-y-4">
        <h1 className="text-5xl font-bold">{homeContent.hero.title}</h1>
        <p className="text-muted-foreground text-lg">
          {homeContent.hero.description}
        </p>
        <p className="text-muted-foreground">
          {homeContent.hero.subtitle}
        </p>
        <div className="pt-4">
          <a 
            href={homeContent.hero.actions[0].href}
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {homeContent.hero.actions[0].label} →
          </a>
        </div>
      </Container>

      {/* Features Grid */}
      <Container className="py-10">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {homeContent.features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">
                {feature.icon === 'zap' && '⚡'}
                {feature.icon === 'layers' && '📚'}
                {feature.icon === 'check-circle' && '✅'}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Sample Components */}
      <Container className="pb-20 space-y-8">
        {/* Project Card Demo */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Component Showcase</h2>
          <ProjectCard content={reactProjectContent} />
        </div>

        {/* Quote Card Demo */}
        <QuoteCard content={sampleQuote} />
      </Container>
    </>
  )
}