import React from 'react';
import Footer from './footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Note: Actual meta tag setting might need to happen in page.tsx or layout.tsx
  // using Next.js metadata APIs, not directly via these props in this component.

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header is provided globally in app/layout.tsx; keep this component for legacy pages */}
      <main className="grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
