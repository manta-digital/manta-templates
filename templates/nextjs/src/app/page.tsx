import { Container } from '@/components';
import Layout from '@/components/layout';
import QuoteCardContainer from '@/components/cards/QuoteCardContainer';

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <Container className="pt-20 pb-10 text-center space-y-4">
        <h1 className="text-5xl font-bold">Next.js Starter Template</h1>
        <p className="text-muted-foreground text-lg">
          Minimal starter built with Tailwind CSS v4 and ShadCN.
        </p>
      </Container>

      {/* Sample Content */}
      <Container className="pb-20">
        <QuoteCardContainer slug="sample-quote" />
      </Container>
    </Layout>
  );
}
