import { Geist, Geist_Mono } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@manta-templates/ui-core";
import { DefaultHeader, Footer, BrandMark, Container, ThemeToggle, ColorSelector } from '@manta-templates/ui-core';
import { getHeaderContent } from '@/lib/headerContent';
import { getFooterContent } from '@/lib/footerContent';
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
import { siteConfig } from '@/content/site.config';

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
    headerContent = await getHeaderContent();
  } catch (error: unknown) {
    console.error('Error loading header content:', error);
  }

  try {
    const footerData = await getFooterContent();
    footerSections = footerData.sections;
  } catch (error: unknown) {
    console.error('Error loading footer content:', error);
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
              <DefaultHeader
                content={headerContent}
                ImageComponent={Image}
                LinkComponent={Link}
                BrandMarkComponent={BrandMark}
                ContainerComponent={Container}
                ThemeToggleComponent={ThemeToggle}
                ColorSelectorComponent={ColorSelector}
              />
            )}
            <main className="flex-1">
              {children}
            </main>
            {footerSections && (
              <Footer
                variant="compact"
                legalPreset="mit"
                sections={footerSections}
                LinkComponent={Link}
                ThemeToggleComponent={ThemeToggle}
              />
            )}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
