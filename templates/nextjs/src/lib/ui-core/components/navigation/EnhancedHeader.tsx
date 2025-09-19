'use client';

import React, { useState, useEffect } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { EnhancedHeaderProps } from '../../types/navigation';
import { cn } from '../../utils/cn';
import { BrandMark } from '../ui/BrandMark';
import { ThemeToggle } from '../ui/ThemeToggle';
import { ColorSelector } from '../ui/ColorSelector';
import { Container } from '../layouts/Container';
import { NavigationMenuItem } from './NavigationMenuItem';
import { MobileMenu } from './MobileMenu';
import { Menu, X } from 'lucide-react';

// CVA variants for the header
const headerVariants = cva(
  'w-full transition-all duration-200',
  {
    variants: {
      uiVariant: {
        default: 'bg-background/95 backdrop-blur-sm border-b border-border/40',
        glass: 'bg-background/80 backdrop-blur-md border-b border-border/20',
        solid: 'bg-background border-b border-border',
        minimal: 'bg-transparent',
      },
      sticky: {
        true: 'sticky top-0 z-50',
        false: '',
      },
    },
    defaultVariants: {
      uiVariant: 'minimal', // Match current DefaultHeader
      sticky: false,
    }
  }
);

const navigationListVariants = cva(
  'flex items-center space-x-6',
  {
    variants: {
      navStyle: {
        simple: '',
        dropdown: '',
        mega: '',
      }
    }
  }
);

/**
 * Enhanced Header Component
 * Replaces DefaultHeader with support for complex navigation, dropdowns, and mobile menus
 * Maintains backward compatibility with existing HeaderContent
 */
export function EnhancedHeader({
  content,
  LinkComponent,
  ImageComponent,
  variant = 'default',
  navStyle = 'simple',
  uiVariant = 'minimal',
  sticky = false,
  mobileVariant = 'drawer',
  className
}: EnhancedHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Default components for framework-specific elements
  const ImgComponent = ImageComponent || 'img';
  const AnchorComponent = LinkComponent || 'a';
  
  // Extract content with defaults for backward compatibility
  const {
    logo,
    logoDark,
    title,
    links,
    cta,
    showThemeToggle = true,
    showColorSelector = true,
    mobileBreakpoint = 'sm'
  } = content;

  // Handle responsive behavior
  useEffect(() => {
    const checkIsMobile = () => {
      const breakpoints = {
        sm: 640,
        md: 768,
        lg: 1024
      };
      setIsMobile(window.innerWidth < breakpoints[mobileBreakpoint]);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [mobileBreakpoint]);

  const renderBrand = () => (
    <AnchorComponent href="/" className="flex items-center space-x-3 text-accent-11">
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
        <BrandMark size={36}/>
      )}
      {title && <span className="font-semibold text-xl">{title}</span>}
    </AnchorComponent>
  );

  const renderDesktopNavigation = () => {
    if (isMobile) return null;
    
    return (
      <nav className="flex-1 flex justify-end mr-6">
        {navStyle === 'simple' ? (
          // Simple navigation like DefaultHeader
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
        ) : (
          // Enhanced navigation with dropdowns - max 2 levels
          <NavigationMenu.Root>
            <NavigationMenu.List className={navigationListVariants({ navStyle })}>
              {links.map((link, index) => (
                <NavigationMenu.Item key={link.href || index} className="relative">
                  <NavigationMenuItem
                    item={link}
                    LinkComponent={LinkComponent}
                    level={0}
                  />
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          </NavigationMenu.Root>
        )}
      </nav>
    );
  };

  const renderControls = () => (
    <div className="flex items-center space-x-3">
      {/* CTA Button */}
      {cta && !isMobile && (
        <AnchorComponent
          href={cta.href}
          className={cn(
            'px-4 py-2 rounded-md font-medium transition-colors',
            {
              'bg-accent-9 text-accent-12 hover:bg-accent-10': cta.variant === 'primary',
              'border border-accent-7 text-accent-11 hover:bg-accent-3': cta.variant === 'outline',
              'text-accent-11 hover:text-accent-12': cta.variant === 'secondary',
            }
          )}
        >
          {cta.label}
        </AnchorComponent>
      )}
      
      {/* Theme Controls */}
      {showColorSelector && (
        <ColorSelector className="inline-flex border-1 !border-[var(--color-border-accent)] hover:!border-[var(--color-border-accent-hover)] text-[var(--color-accent-11)] dark:border" />
      )}
      {showThemeToggle && (
        <ThemeToggle className="text-accent-11 border-1 !border-[var(--color-border-accent)] hover:!bg-[var(--color-accent-3)] dark:hover:!bg-[var(--color-accent-4)] dark:!border-[var(--color-border-accent)]" />
      )}
      
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-accent-11 hover:text-accent-12 hover:bg-accent-3 rounded-md"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}
    </div>
  );

  return (
    <>
      <header className={cn(headerVariants({ uiVariant, sticky }), "py-5", className)}>
        <Container className="flex items-center justify-between w-full">
          {renderBrand()}
          {renderDesktopNavigation()}
          {renderControls()}
        </Container>
      </header>
      
      {/* Mobile Menu */}
      <MobileMenu
        content={content}
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        variant={mobileVariant}
        LinkComponent={LinkComponent}
        ImageComponent={ImageComponent}
      />
    </>
  );
}