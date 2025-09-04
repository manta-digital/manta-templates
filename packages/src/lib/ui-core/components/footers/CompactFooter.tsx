import React from 'react';
import { CompactFooterProps } from '../../types/footer';
import { cn } from '../../utils/cn';

function InlineLink({ 
  link, 
  LinkComponent 
}: { 
  link: { href: string; label: string; external?: boolean }; 
  LinkComponent?: React.ComponentType<any>; 
}) {
  const className = 'underline hover:text-foreground';
  const AnchorComponent = LinkComponent || 'a';
  
  return link.external ? (
    <AnchorComponent 
      href={link.href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={className}
    >
      {link.label}
    </AnchorComponent>
  ) : (
    <AnchorComponent href={link.href} className={className}>
      {link.label}
    </AnchorComponent>
  );
}

export function CompactFooter({ 
  sections, 
  legalPreset = 'mit',
  LinkComponent,
  version = '0.1.0',
  className 
}: CompactFooterProps) {
  // Apply legal preset logic - compact footer can show full links if requested
  const legalLinks = legalPreset === 'full' 
    ? [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Cookies', href: '/cookies' },
      ]
    : [{ label: 'Legal', href: '/legal' }];
  const AnchorComponent = LinkComponent || 'a';

  return (
    <footer className={cn("bg-muted border-t border-border mt-auto", className)}>
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-xs text-muted-foreground flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <AnchorComponent 
          href="https://github.com/manta-digital/manta-templates"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          manta-templates
        </AnchorComponent>
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
                <InlineLink link={l} LinkComponent={LinkComponent} />
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </footer>
  );
}