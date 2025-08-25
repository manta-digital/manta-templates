import React from 'react';
import { DefaultFooterProps } from '../../types/footer';
import { FooterLinkComponent } from './FooterLinkComponent';
import { ThemeToggle } from '../ui/ThemeToggle';
import { cn } from '../../utils/cn';

export function DefaultFooter({ 
  sections, 
  legalPreset = 'full',
  LinkComponent, 
  className 
}: DefaultFooterProps) {
  // Apply legal preset logic
  const s = {
    ...sections,
    legal: legalPreset === 'mit' 
      ? [{ label: 'Legal', href: '/legal' }]
      : legalPreset === 'full'
      ? [
          { label: 'Privacy', href: '/privacy' },
          { label: 'Terms', href: '/terms' },
          { label: 'Cookies', href: '/cookies' },
        ]
      : sections.legal
  };
  
  // Default components
  const AnchorComponent = LinkComponent || 'a';

  return (
    <footer className={cn("bg-background border-t border-border text-foreground mt-auto dark:border-none", className)}>
      <div className="max-w-[120rem] mx-auto px-4 py-6 sm:px-6 sm:py-8 md:px-12 md:py-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Quick Links + Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              {s.quickLinks.map((link, i) => (
                <FooterLinkComponent 
                  key={i} 
                  link={link} 
                  LinkComponent={LinkComponent}
                />
              ))}
            </div>
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Contact</h4>
              <div className="space-y-2 text-sm">
                {s.primaryContact.email && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <AnchorComponent 
                      href={`mailto:${s.primaryContact.email}`} 
                      className="hover:text-foreground transition-colors"
                    >
                      {s.primaryContact.email}
                    </AnchorComponent>
                  </div>
                )}
                {s.primaryContact.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{s.primaryContact.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Column 2 - Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
            <div className="space-y-2">
              {s.resources.map((link, i) => (
                <FooterLinkComponent 
                  key={i} 
                  link={link} 
                  LinkComponent={LinkComponent}
                />
              ))}
            </div>
          </div>

          {/* Column 3 - Social & Community */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Social & Community</h3>
            <div className="space-y-2">
              {s.socialProfessional.map((link, i) => (
                <FooterLinkComponent 
                  key={i} 
                  link={link} 
                  LinkComponent={LinkComponent}
                />
              ))}
              {s.socialCommunity.map((link, i) => (
                <FooterLinkComponent 
                  key={i} 
                  link={link} 
                  LinkComponent={LinkComponent}
                />
              ))}
            </div>
          </div>

          {/* Column 4 - Legal & Professional */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal & Professional</h3>
            <div className="space-y-2">
              {s.legal.map((link, i) => (
                <FooterLinkComponent 
                  key={i} 
                  link={link} 
                  LinkComponent={LinkComponent}
                />
              ))}
            </div>
            {/* Conditional professional links vs contact emails */}
            {(s.professionalLinks && s.professionalLinks.length > 0) ? (
              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                {s.professionalLinks.map((link, i) => (
                  <AnchorComponent 
                    key={i} 
                    href={link.href} 
                    className="block hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </AnchorComponent>
                ))}
              </div>
            ) : (
              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                {s.professionalContact.business && (
                  <AnchorComponent 
                    href={`mailto:${s.professionalContact.business}`} 
                    className="block hover:text-foreground transition-colors"
                  >
                    Business Inquiries
                  </AnchorComponent>
                )}
                {s.professionalContact.support && (
                  <AnchorComponent 
                    href={`mailto:${s.professionalContact.support}`} 
                    className="block hover:text-foreground transition-colors"
                  >
                    Technical Support
                  </AnchorComponent>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom section with copyright and theme toggle */}
        <div className="mt-6 pt-6 sm:mt-8 sm:pt-8 border-t border-border dark:border-none flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div 
              className="text-sm text-muted-foreground mb-2" 
              dangerouslySetInnerHTML={{ __html: s.copyright.attribution }} 
            />
            <p className="text-sm text-muted-foreground">{s.copyright.notice}</p>
            <p className="mt-1 text-xs text-muted-foreground">Last updated: {s.copyright.lastUpdated}</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}