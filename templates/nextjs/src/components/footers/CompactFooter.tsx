import React from 'react';
import Link from 'next/link';
import pkg from '../../../package.json';
import { getFooterContent, type FooterLink } from '@/lib/footerContent';

function InlineLink({ link }: { link: FooterLink }) {
  const className = 'underline hover:text-foreground';
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {link.label}
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

// Compact, markdown-driven footer that reads sections from footer-content.md
const CompactFooter = async () => {
  const { sections } = await getFooterContent();
  // Compact footer rule: always consolidate to a single Legal link
  const legalLinks = [{ label: 'Legal', href: '/legal' }];
  const version = pkg.version;

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-xs text-muted-foreground flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <a
          href="https://github.com/manta-digital/manta-templates"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          manta-templates
        </a>
        <span>v{version}</span>
        <span className="opacity-60">•</span>

        {/* Copyright notice from markdown */}
        <span className="truncate">{sections.copyright.notice}</span>

        {/* Legal links (Privacy / Terms / Cookies) from markdown */}
        {legalLinks.length > 0 && (
          <>
            <span className="opacity-60">•</span>
            {legalLinks.map((l, i) => (
              <React.Fragment key={`${l.href}-${i}`}>
                {i > 0 && <span className="opacity-60">•</span>}
                <InlineLink link={l} />
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </footer>
  );
};

export default CompactFooter;


