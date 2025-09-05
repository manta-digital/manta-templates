import { Geist, Geist_Mono } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/ui-core";
import { Header, Footer } from '@/lib/ui-core';
import { nextjsContentProvider, NextjsHeaderContent, NextjsFooterContent } from '@/lib/ui-adapters/nextjs';
import { getDefaultFooterSections } from '@/lib/ui-core';
import { siteConfig } from '@/content/site.config';
import Image from 'next/image';
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://templates.manta.digital';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteConfig.site.name,
  description: 'Templates, layouts, and UI components created with the included AI Project Guides',
  openGraph: {
    title: siteConfig.site.name,
    description: 'Templates, layouts, and UI components created with the included AI Project Guides',
    url: '/',
    siteName: siteConfig.site.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${siteConfig.site.name} OG Image`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Load header and footer content server-side
  let headerContent = null;
  let footerSections = null;

  try {
    const content = await nextjsContentProvider.loadContent<NextjsHeaderContent>('header', 'main-grid');
    headerContent = content.frontmatter;
  } catch (error: unknown) {
    console.error('Error loading header content:', error);
    // Fallback header content
    headerContent = {
      title: '',
      links: [
        { href: '/', label: 'Home' },
      ],
    };
  }

  try {
    const content = await nextjsContentProvider.loadContent<NextjsFooterContent>('footer-content', 'footer');
    footerSections = content.frontmatter;
  } catch (error: unknown) {
    console.error('Error loading footer content:', error);
    // Use framework-agnostic fallback content from ui-core
    footerSections = getDefaultFooterSections();
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var stored = localStorage.getItem('ui-theme');
                if (stored) {
                  document.documentElement.classList.add(stored);
                } else {
                  var media = window.matchMedia('(prefers-color-scheme: dark)');
                  document.documentElement.classList.add(media.matches ? 'dark' : 'light');
                }
              } catch (e) {}
            })();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-200 ease-in-out`}
      >
        <ThemeProvider
          defaultTheme="dark" 
          storageKey="ui-theme"
        >
          <div className="min-h-screen flex flex-col">
            {headerContent && (
              <Header
                content={headerContent}
                ImageComponent={Image}
                LinkComponent={Link}
              />
            )}
            <main className="flex-1">
              {children}
            </main>
            {footerSections && (
              <Footer
                variant={siteConfig.variants.footer}
                legalPreset={siteConfig.presets.legal === 'mit' ? 'mit' : 'full'}
                sections={footerSections}
                LinkComponent={Link}
              />
            )}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
