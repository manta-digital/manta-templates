/**
 * Mock for @manta-templates/ui-core to avoid ESM import issues with remark
 * 
 * This mock provides simplified versions of ui-core components for testing
 * without pulling in the complex content processing dependencies.
 */

import React from 'react';

// Mock ProjectCard component
const ProjectCard = ({ title, description, techStack = [], content, className, children, ...props }) => {
  const displayTitle = title || content?.title || 'Untitled Project';
  const displayDescription = description || content?.description || '';
  const displayTechStack = techStack.length ? techStack : (content?.techStack || []);
  
  return React.createElement('div', 
    { 
      'data-testid': 'project-card',
      className,
      ...props
    },
    React.createElement('h3', null, displayTitle),
    displayDescription && React.createElement('p', null, displayDescription),
    displayTechStack.length > 0 && displayTechStack.map((tech, index) => 
      React.createElement('span', { key: tech || index }, tech)
    ),
    children
  );
};

// Mock QuoteCard component  
const QuoteCard = ({ quote, author, className, ...props }) => {
  if (!quote) return null;
  
  return React.createElement('div',
    {
      'data-testid': 'quote-card', 
      className,
      ...props
    },
    React.createElement('blockquote', null, quote),
    author && React.createElement('cite', null, author)
  );
};

// Mock BlogCardImage component (client component)
const BlogCardImage = ({ 
  title, 
  excerpt, 
  coverImageUrl, 
  category, 
  author, 
  date, 
  slug,
  className,
  LinkComponent,
  ...props 
}) => {
  // Return null if required props missing (matches real component behavior)
  if (!title || !coverImageUrl) {
    return null;
  }

  const content = React.createElement('div',
    {
      'data-testid': 'blog-card-image',
      className,
      ...props
    },
    category && React.createElement('p', null, category),
    React.createElement('h3', null, title),
    excerpt && React.createElement('p', null, excerpt),
    React.createElement('img', { 
      src: coverImageUrl, 
      alt: `Background for ${title}` 
    }),
    author && React.createElement('span', null, `By ${author}`),
    date && React.createElement('span', null, date)
  );

  // Wrap in link if slug provided
  if (slug) {
    if (LinkComponent) {
      return React.createElement(LinkComponent, 
        { 
          href: slug,
          'aria-label': `Read more about ${title}`
        },
        content
      );
    } else {
      return React.createElement('a',
        {
          href: slug,
          'aria-label': `Read more about ${title}`
        },
        content
      );
    }
  }

  return content;
};

// Mock BaseCard component
const BaseCard = ({ className, children, ...props }) => {
  return React.createElement('div',
    {
      'data-testid': 'base-card',
      className,
      ...props
    },
    children
  );
};

// Mock other commonly used components
const BentoLayout = ({ children, className, ...props }) => {
  return React.createElement('div', 
    { 
      'data-testid': 'bento-layout',
      className,
      ...props 
    }, 
    children
  );
};

const GridItem = ({ children, className, ...props }) => {
  return React.createElement('div', 
    { 
      'data-testid': 'grid-item',
      className,
      ...props 
    }, 
    children
  );
};

const GradientCard = ({ title, description, className, ...props }) => {
  return React.createElement('div',
    {
      'data-testid': 'gradient-card',
      className,
      ...props
    },
    title && React.createElement('h3', null, title),
    description && React.createElement('p', null, description)
  );
};

// Export all components
module.exports = {
  ProjectCard,
  QuoteCard, 
  BlogCardImage,
  BaseCard,
  BentoLayout,
  GridItem,
  GradientCard,
  // Add other components as needed
};