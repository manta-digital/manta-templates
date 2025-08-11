import React from 'react';
import ArticleCardContentLoader from '@/components/cards/articles/ArticleCardContentLoader';
import BlogIndexCard from '@/components/cards/articles/BlogIndexCard';
import AboutCardContentLoader from '@/components/cards/people/AboutCardContentLoader';
import ProjectCardContentLoader from '@/components/cards/projects/ProjectCardContentLoader';
import { TechnologyScroller } from '@/components/ui/TechnologyScroller';
import { CosineTerrainCard } from '@/components/cards';
import { getContentBySlug } from '@/lib/content';
import type { TechnologiesContent } from '@/types/content';

export default async function CardsExamplesPage() {
  const technologies = await getContentBySlug<TechnologiesContent>('main-grid', 'technologies');
  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-2xl font-semibold">Cards Examples</h1>

        <section>
          <h2 className="text-lg font-medium mb-3">ArticleCard (from content)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ArticleCardContentLoader slug="featured-article-sample" />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-3">BlogIndexCard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BlogIndexCard />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-3">TechnologyScroller (from content)</h2>
          <div className="border rounded-2xl p-4">
            <TechnologyScroller items={technologies.frontmatter.techs} />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-3">CosineTerrainCard (Three.js)</h2>
          <div className="border rounded-2xl overflow-hidden" style={{ height: 360 }}>
            <CosineTerrainCard className="w-full h-full" />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-3">AboutCard (from content)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AboutCardContentLoader />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-3">ProjectCard showcase (from content)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCardContentLoader slug="sample-project" />
          </div>
        </section>
      </div>
    </main>
  );
}


