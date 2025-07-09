import React from 'react';
import Link from 'next/link';
import { BaseCard } from '@/components/cards';
import Container from '@/components/container';

const ExamplesPage: React.FC = () => {
  const examples = [
    {
      title: 'Blog Layout',
      description: 'A clean, modern blog layout with image cards, perfect for content-focused websites.',
      href: '/examples/blog',
      features: ['Image cards', 'Responsive design', 'Clean typography']
    },
    {
      title: 'Bento Grid',
      description: 'A versatile grid layout system perfect for dashboards and varied content display.',
      href: '/examples/bentogrid',
      features: ['CSS Grid', 'Responsive breakpoints', 'Flexible layouts']
    },
    {
      title: 'Portfolio',
      description: 'A professional portfolio layout showcasing projects and work samples.',
      href: '/examples/portfolio',
      features: ['Project showcase', 'Grid system', 'Professional styling']
    }
  ];

  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Template Examples</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of example layouts and components. Each example demonstrates 
            different use cases and can be customized for your specific needs.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <Link key={example.href} href={example.href} className="group">
              <BaseCard className="h-full transition-shadow duration-300 hover:shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {example.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {example.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {example.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </BaseCard>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Looking for More Examples?</h3>
            <p className="text-muted-foreground mb-4">
              Visit our comprehensive showcase for advanced layouts, grid systems, and interactive components.
            </p>
            <Link 
              href="https://templates.manta.digital" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:underline font-medium"
            >
              View Full Showcase →
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ExamplesPage; 