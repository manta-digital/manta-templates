import React from 'react';
import { cn } from '../../utils/cn';
import { Github, Linkedin, Mail, X } from 'lucide-react';
import { BaseCard } from '../ui/BaseCard';
import type { AboutContent, SocialLink } from '../../types/content';

const socialIconMap: Record<SocialLink['platform'], React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  x: X,
  twitter: X,
  mail: Mail,
};

interface AboutCardProps extends Partial<AboutContent> {
  contentHtml?: string;
  className?: string;
  // Dependency injection props
  ImageComponent?: React.ComponentType<any> | 'img';
  LinkComponent?: React.ComponentType<any> | 'a';
}

export function AboutCard({ 
  title, 
  description, 
  avatar = '/window.svg', 
  socials = [], 
  contentHtml, 
  className,
  ImageComponent = 'img',
  LinkComponent = 'a'
}: AboutCardProps) {
  return (
    <BaseCard className={cn('h-full overflow-hidden flex flex-col p-4 md:p-6', className)}>
      <div className="flex items-start pb-4 border-b border-border/40">
        <div className="w-20 h-20 mr-4 flex-shrink-0 rounded-sm overflow-hidden bg-gray-300">
          {React.createElement(ImageComponent, {
            src: avatar,
            alt: title || 'Profile',
            ...(ImageComponent !== 'img' && { width: 80, height: 80 }),
            className: "w-full h-full object-cover dark:invert",
            ...(ImageComponent === 'img' && { style: { width: '80px', height: '80px' } })
          })}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold pt-3 mb-1 text-foreground">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
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
              className: "p-2 bg-muted hover:bg-muted/80 rounded text-foreground/80 hover:text-foreground transition-colors"
            }, React.createElement(Icon, { className: "w-5 h-5" }));
          })}
        </div>
      </div>
    </BaseCard>
  );
}