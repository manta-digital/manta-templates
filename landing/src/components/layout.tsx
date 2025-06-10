import React from 'react';
import Header from './header';
import Footer from './footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Note: Actual meta tag setting might need to happen in page.tsx or layout.tsx
  // using Next.js metadata APIs, not directly via these props in this component.

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
