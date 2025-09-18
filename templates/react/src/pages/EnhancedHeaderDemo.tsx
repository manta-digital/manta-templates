import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EnhancedHeader, convertHeaderContent } from '../lib/ui-core/components/navigation';
import { headerContent } from '../content/headerContent';

export default function EnhancedHeaderDemo() {
  const [currentDemo, setCurrentDemo] = useState<'simple' | 'enhanced' | 'business'>('simple');

  // Create adapter for React Router
  const ReactRouterLinkAdapter = ({ href, children, ...linkProps }: any) => (
    <Link to={href} {...linkProps}>
      {children}
    </Link>
  );

  // Simple header (backward compatible)
  const simpleHeaderContent = convertHeaderContent(headerContent);

  // Enhanced header with dropdowns
  const enhancedHeaderContent = {
    title: 'Enhanced Demo',
    links: [
      { label: 'Home', href: '/' },
      {
        label: 'Products',
        children: [
          { label: 'Web Apps', href: '/products/web' },
          { label: 'Mobile Apps', href: '/products/mobile' },
          { label: 'Desktop Apps', href: '/products/desktop' }
        ]
      },
      { label: 'Examples', href: '/examples' },
      { label: 'Forms Demo', href: '/forms-demo' }
    ],
    showThemeToggle: true,
    showColorSelector: true
  };

  // Business header with CTA
  const businessHeaderContent = {
    title: 'Business Site',
    links: [
      { label: 'Home', href: '/' },
      {
        label: 'Products',
        children: [
          { label: 'Web Development', href: '/products/web' },
          { label: 'Mobile Development', href: '/products/mobile' },
          {
            label: 'Enterprise',
            children: [
              { label: 'Security Solutions', href: '/enterprise/security' },
              { label: 'Analytics Platform', href: '/enterprise/analytics' }
            ]
          }
        ]
      },
      { label: 'Pricing', href: '/pricing' },
      { label: 'About', href: '/about' }
    ],
    cta: {
      label: 'Get Started',
      href: '/signup',
      variant: 'primary' as const
    },
    showThemeToggle: true,
    showColorSelector: true
  };

  const renderCurrentDemo = () => {
    switch (currentDemo) {
      case 'simple':
        return (
          <EnhancedHeader
            content={simpleHeaderContent}
            LinkComponent={ReactRouterLinkAdapter}
            navStyle="simple"
            uiVariant="minimal"
          />
        );
      case 'enhanced':
        return (
          <EnhancedHeader
            content={enhancedHeaderContent}
            LinkComponent={ReactRouterLinkAdapter}
            navStyle="dropdown"
            uiVariant="default"
            sticky={true}
          />
        );
      case 'business':
        return (
          <EnhancedHeader
            content={businessHeaderContent}
            LinkComponent={ReactRouterLinkAdapter}
            navStyle="dropdown"
            uiVariant="glass"
            sticky={true}
            mobileVariant="drawer"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentDemo()}
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-accent-12">Enhanced Header Demo</h1>
        
        <div className="space-y-6">
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setCurrentDemo('simple')}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentDemo === 'simple'
                  ? 'bg-accent-9 text-accent-12'
                  : 'bg-accent-3 text-accent-11 hover:bg-accent-4'
              }`}
            >
              Simple Header
            </button>
            <button
              onClick={() => setCurrentDemo('enhanced')}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentDemo === 'enhanced'
                  ? 'bg-accent-9 text-accent-12'
                  : 'bg-accent-3 text-accent-11 hover:bg-accent-4'
              }`}
            >
              Enhanced Header
            </button>
            <button
              onClick={() => setCurrentDemo('business')}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentDemo === 'business'
                  ? 'bg-accent-9 text-accent-12'
                  : 'bg-accent-3 text-accent-11 hover:bg-accent-4'
              }`}
            >
              Business Header
            </button>
          </div>

          <div className="bg-accent-2 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-accent-12">Current Demo: {currentDemo}</h2>
            
            {currentDemo === 'simple' && (
              <div className="space-y-2 text-accent-11">
                <p><strong>Mode:</strong> Simple navigation (like DefaultHeader)</p>
                <p><strong>Features:</strong> Basic links, theme controls, mobile hamburger menu</p>
                <p><strong>Compatibility:</strong> 100% backward compatible with existing HeaderContent</p>
              </div>
            )}
            
            {currentDemo === 'enhanced' && (
              <div className="space-y-2 text-accent-11">
                <p><strong>Mode:</strong> Enhanced navigation with dropdowns</p>
                <p><strong>Features:</strong> Multi-level navigation, Radix accessibility, responsive</p>
                <p><strong>Style:</strong> Default background with border</p>
              </div>
            )}
            
            {currentDemo === 'business' && (
              <div className="space-y-2 text-accent-11">
                <p><strong>Mode:</strong> Business site with CTA and complex navigation</p>
                <p><strong>Features:</strong> Multi-level dropdowns, CTA button, glass effect, sticky header</p>
                <p><strong>Style:</strong> Glass background with backdrop blur</p>
              </div>
            )}
          </div>

          <div className="bg-accent-2 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-accent-12">Test Instructions</h2>
            <ul className="space-y-2 text-accent-11">
              <li>• Switch between demos to see different header styles</li>
              <li>• Resize window to test mobile responsiveness</li>
              <li>• On mobile: Click hamburger menu to test mobile navigation</li>
              <li>• Test theme toggle and color selector functionality</li>
              <li>• For enhanced/business demos: Hover over "Products" to see dropdown</li>
              <li>• For business demo: Notice the glass effect and CTA button</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}