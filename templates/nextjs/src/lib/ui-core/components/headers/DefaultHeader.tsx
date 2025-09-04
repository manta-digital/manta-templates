import React from 'react';
import { HeaderProps } from '../../types/header';
import { cn } from '../../utils/cn';
import { BrandMark } from '../ui/BrandMark';
import { ThemeToggle } from '../ui/ThemeToggle';
import { ColorSelector } from '../ui/ColorSelector';
import { Container } from '../layouts/Container';

export function DefaultHeader({ 
  content,
  ImageComponent,
  LinkComponent,
  className 
}: HeaderProps) {
  // Default components for framework-specific elements only
  const ImgComponent = ImageComponent || 'img';
  const AnchorComponent = LinkComponent || 'a';
  const { logo, logoDark, title, links } = content;

  return (
    <header className={cn("py-5 bg-transparent", className)}>
      <Container className="flex items-center justify-between">
        <AnchorComponent href="/" className="flex items-center space-x-3 text-accent-11">
          {/* Use theme-aware brand mark by default; fall back to provided images if present */}
          {logo ? (
            logoDark ? (
              <>
                <ImgComponent src={logoDark} alt="Logo" width={36} height={36} className="h-auto hidden dark:block" />
                <ImgComponent src={logo} alt="Logo" width={36} height={36} className="h-auto block dark:hidden" />
              </>
            ) : (
              <ImgComponent src={logo} alt="Logo" width={36} height={36} className="h-auto dark:invert" />
            )
          ) : (
            <BrandMark size={36} className="pt-1" />
          )}
          {title && <span className="font-semibold text-xl hidden sm:block">{title}</span>}
        </AnchorComponent>
        <div className="flex items-center space-x-6">
          <nav>
            <ul className="flex items-center space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <AnchorComponent 
                    href={link.href} 
                    className="text-accent-11 hover:text-accent-12"
                    {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {link.label}
                  </AnchorComponent>
                </li>
              ))}
            </ul>
          </nav>
          <ColorSelector className="inline-flex border-1 !border-[var(--color-border-accent)] hover:!border-[var(--color-border-accent-hover)] text-[var(--color-accent-11)] dark:border" />
          <ThemeToggle className="text-accent-11 border-1 !border-[var(--color-border-accent)] hover:!bg-[var(--color-accent-3)] dark:hover:!bg-[var(--color-accent-4)] dark:!border-[var(--color-border-accent)]" />
        </div>
      </Container>
    </header>
  );
}