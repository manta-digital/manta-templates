import React from 'react';
import { HeaderProps } from '../../types/header';
import { cn } from '../../utils/cn';

export function DefaultHeader({ 
  content,
  ImageComponent,
  LinkComponent,
  BrandMarkComponent,
  ContainerComponent,
  ThemeToggleComponent,
  ColorSelectorComponent,
  className 
}: HeaderProps) {
  // Default components
  const ImgComponent = ImageComponent || 'img';
  const AnchorComponent = LinkComponent || 'a';
  const DivComponent = ContainerComponent || 'div';
  const { logo, logoDark, title, links } = content;

  return (
    <header className={cn("py-3 pt-3 bg-transparent", className)}>
      <DivComponent className="flex ml-5 mr-5 md:ml-7 md:mr-7 lg:ml-9 lg:mr-10 xl:ml-10 xl:mr-11 2xl:ml-13 2xl:mr-13 items-center justify-between">
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
            BrandMarkComponent && <BrandMarkComponent size={36} className="pt-1" />
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
          {ColorSelectorComponent && (
            <ColorSelectorComponent className="inline-flex border-1 !border-[var(--color-border-accent)] hover:!border-[var(--color-border-accent-hover)] text-[var(--color-accent-11)] dark:border" />
          )}
          {ThemeToggleComponent && (
            <ThemeToggleComponent className="text-accent-11 border-1 !border-[var(--color-border-accent)] hover:!bg-[var(--color-accent-3)] dark:hover:!bg-[var(--color-accent-4)] dark:!border-[var(--color-border-accent)]" />
          )}
        </div>
      </DivComponent>
    </header>
  );
}