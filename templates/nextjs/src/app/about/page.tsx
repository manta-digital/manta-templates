import React from 'react';
import Link from 'next/link';
import { BaseCard } from '@/components/cards';
import Container from '@/components/container';

const AboutPage: React.FC = () => {
  return (
    <Container className="py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About This Template</h1>
        </div>

        <div className="space-y-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed">
              This is a modern Next.js starter template provided by Manta Templates. It features 
              a clean, professional design with essential components and layouts to help you build 
              your next project quickly and efficiently.
            </p>
            
            <p className="text-lg leading-relaxed">
              The template includes blog functionality, portfolio layouts, grid systems, and a 
              comprehensive theming system built with Tailwind CSS and Radix UI components.
            </p>
          </div>

          <BaseCard className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">
              Explore More Features
            </h3>
            <p className="text-blue-800 dark:text-blue-200 mb-4">
              This template is part of a comprehensive collection of modern web components and layouts. 
              Discover advanced grid systems, interactive components, animation variants, and many more 
              examples in our full showcase.
            </p>
            <Link 
              href="https://templates.manta.digital" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Visit Full Showcase →
            </Link>
          </BaseCard>

          <BaseCard className="p-6 bg-muted/50">
            <h3 className="text-xl font-semibold mb-4">Template Features</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Modern Next.js 15 with App Router
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Tailwind CSS v4 with custom theming
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Radix UI components and accessibility
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Responsive grid layouts and card systems
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Dark/light mode support
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Blog and portfolio examples
              </li>
            </ul>
          </BaseCard>

          <div className="text-center">
            <p className="text-muted-foreground">
              Ready to customize this template for your project? Start by exploring the examples 
              and components provided.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutPage; 