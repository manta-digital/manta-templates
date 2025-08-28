"use client";

import { Container } from "@/components"; 
import Layout from '@/components/layout';

interface HomePageClientProps {
  templates: React.ReactNode;
  examples: React.ReactNode;
}

export default function HomePageClient({ templates, examples }: HomePageClientProps) {

  return (
    <Layout>
      {/* Hero */}
      <Container className="pt-20 pb-6">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="text-5xl font-bold">manta-templates</h1>
          <p className="text-lg text-muted-foreground text-left">
            A growing monorepo of customizable, AI-ready templates for modern web and app development. Designed to help developers, designers, and builders move fast with structured guidance and flexible layouts.
          </p>
          <ul className="text-left text-muted-foreground list-disc list-inside text-base">
            <li><strong>Next.js templates</strong> with responsive grid layouts and bento-style UIs</li>
            <li><strong>Astro templates</strong> (coming soon)</li>
            <li><strong>Python apps and Qt templates</strong> (coming soon)</li>
            <li><strong>AI project guidance</strong> with structured prompts and workflows</li>
            <li><strong>Feature-rich components</strong>: cards, quotes, 3D (Three.js), background and player video</li>
          </ul>
        </div>
      </Container>

      {/* Templates Showcase */}
      <Container className="py-16">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-semibold">Templates</h2>
          <p className="text-muted-foreground">
            Choose a starter template to kick off your project.
          </p>
        </div>
        {templates}
      </Container>

      {/* Examples Showcase */}
      <Container className="pb-20">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-semibold">Examples</h2>
          <p className="text-muted-foreground">
            Explore example subprojects and layouts.
          </p>
        </div>
        {examples}
      </Container>
    </Layout>
  );
}
