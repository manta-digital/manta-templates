import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Legacy Layout Component
 * 
 * Used by pages that haven't been fully migrated to the app router layout yet.
 * The header and footer are now provided by app/layout.tsx globally, so this
 * component just provides the main content wrapper.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header and Footer are provided globally in app/layout.tsx */}
      <main className="grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;
