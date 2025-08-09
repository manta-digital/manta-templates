import React from 'react';
import Link from 'next/link';
import { ExternalLink, Mail, MapPin } from 'lucide-react';
import { ThemeToggle } from '@/components';
import { getFooterContent, type FooterLink, type FooterSections } from '@/lib/footerContent';

const FooterLinkComponent: React.FC<{ link: FooterLink }> = ({ link }) => {
  const base = 'text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1';
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={base}>
      {link.label}
      <ExternalLink className="w-3 h-3" />
    </a>
  ) : (
    <Link href={link.href} className={base}>
      {link.label}
    </Link>
  );
};

const DefaultFooter = async () => {
  const { sections } = await getFooterContent();
  const s: FooterSections = sections;

  return (
    <footer className="bg-background border-t border-border text-foreground mt-auto dark:border-none">
      <div className="max-w-[120rem] mx-auto px-4 py-6 sm:px-6 sm:py-8 md:px-12 md:py-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              {s.quickLinks.map((link, i) => <FooterLinkComponent key={i} link={link} />)}
            </div>
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Contact</h4>
              <div className="space-y-2 text-sm">
                {s.primaryContact.email && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-3 h-3" />
                    <a href={`mailto:${s.primaryContact.email}`} className="hover:text-foreground transition-colors">
                      {s.primaryContact.email}
                    </a>
                  </div>
                )}
                {s.primaryContact.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{s.primaryContact.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
            <div className="space-y-2">
              {s.resources.map((link, i) => <FooterLinkComponent key={i} link={link} />)}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Social & Community</h3>
            <div className="space-y-2">
              {s.socialProfessional.map((link, i) => <FooterLinkComponent key={i} link={link} />)}
              {s.socialCommunity.map((link, i) => <FooterLinkComponent key={i} link={link} />)}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal & Professional</h3>
            <div className="space-y-2">
              {s.legal.map((link, i) => <FooterLinkComponent key={i} link={link} />)}
            </div>
            {(s.professionalLinks && s.professionalLinks.length > 0) ? (
              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                {s.professionalLinks.map((link, i) => (
                  <Link key={i} href={link.href} className="block hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                {s.professionalContact.business && (
                  <a href={`mailto:${s.professionalContact.business}`} className="block hover:text-foreground transition-colors">
                    Business Inquiries
                  </a>
                )}
                {s.professionalContact.support && (
                  <a href={`mailto:${s.professionalContact.support}`} className="block hover:text-foreground transition-colors">
                    Technical Support
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-6 sm:mt-8 sm:pt-8 border-t border-border dark:border-none flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: s.copyright.attribution }} />
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
};

export default DefaultFooter;


