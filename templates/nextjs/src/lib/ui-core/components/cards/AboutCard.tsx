import React from 'react';
import { cn } from '../../utils/cn';
import { BaseCard } from './BaseCard';
// Social icon component types for dependency injection
interface SocialIcons {
  github: React.ComponentType<any>;
  linkedin: React.ComponentType<any>;
  x: React.ComponentType<any>;
  twitter: React.ComponentType<any>;
  mail: React.ComponentType<any>;
  [key: string]: React.ComponentType<any>; // Allow any platform string
}

interface AboutCardProps {
  title?: string;
  description?: string;
  avatar?: string;
  socials?: Array<{
    platform: string;
    url: string;
  }>;
  contentHtml?: string;
  className?: string;
  // Dependency injection props
  ImageComponent?: React.ComponentType<any> | 'img';
  LinkComponent?: React.ComponentType<any> | 'a';
  socialIcons?: SocialIcons;
}

// Default fallback icons if none provided - clean, minimal designs
const defaultIcons: SocialIcons = {
  github: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  ),
  linkedin: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  x: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  twitter: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  mail: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
};

export function AboutCard({ 
  title, 
  description, 
  avatar = '/window.svg', 
  socials = [], 
  contentHtml, 
  className,
  ImageComponent = 'img',
  LinkComponent = 'a',
  socialIcons
}: AboutCardProps) {
  const socialIconMap = socialIcons || defaultIcons;
  return (
    <BaseCard className={cn('h-full overflow-hidden flex flex-col p-4 md:p-6', className)}>
      <div className="flex pb-4 border-b border-border/40">
        <div className="w-20 h-20 mr-4 flex-shrink-0 rounded-md overflow-hidden bg-muted">
          {React.createElement(ImageComponent, {
            src: avatar,
            alt: title || 'Profile',
            ...(ImageComponent !== 'img' && { width: 80, height: 80 }),
            className: "w-full h-full object-cover",
            ...(ImageComponent === 'img' && { style: { width: '80px', height: '80px' } })
          })}
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          {description && <p className="text-sm text-foreground mt-1">{description}</p>}
        </div>
      </div>

      <div className="flex-1 text-sm overflow-hidden pt-4 pb-4">
        {contentHtml && (
          <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: contentHtml.replace(/<h1[^>]*>.*?<\/h1>/gi, '').replace(/<h2[^>]*>.*?<\/h2>/gi, '') }} />
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-border/40">
        <div className="flex items-center space-x-2">
          {socials.map((s, i) => {
            const Icon = socialIconMap[s.platform];
            return React.createElement(LinkComponent, {
              key: `${s.platform}-${i}`,
              href: s.platform === 'mail' ? `mailto:${s.url}` : s.url,
              target: s.platform === 'mail' ? undefined : '_blank',
              rel: "noopener noreferrer",
              className: "p-2 bg-white/20 hover:bg-white/30 rounded text-white hover:text-white transition-colors backdrop-blur-sm border border-white/30"
            }, React.createElement(Icon, { className: "w-5 h-5 transition-colors duration-200" }));
          })}
        </div>
      </div>
    </BaseCard>
  );
}

export type { AboutCardProps, SocialIcons };