'use client';

import React from 'react';
import { MobileMenuProps } from '../../types/navigation';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

/**
 * Mobile Menu Component
 * Handles mobile-specific navigation patterns (drawer, dropdown, fullscreen)
 */
export function MobileMenu({
  content,
  open,
  onClose,
  variant = 'drawer',
  LinkComponent,
  ImageComponent
}: MobileMenuProps) {
  if (!open) return null;
  
  const Link = LinkComponent || 'a';
  
  const renderMenuItem = (item: any, level = 0) => (
    <div key={item.href || item.label} className={cn('py-2', level > 0 && 'pl-4')}>
      {item.href ? (
        <Link
          href={item.href}
          className="block text-accent-11 hover:text-accent-12 py-2"
          onClick={onClose}
          {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {item.label}
          {item.badge && (
            <span className="ml-2 px-2 py-1 text-xs bg-accent-9 text-accent-12 rounded-full">
              {item.badge}
            </span>
          )}
        </Link>
      ) : (
        <div className="text-accent-11 font-medium py-2">{item.label}</div>
      )}
      {item.children && (
        <div className="pl-4">
          {item.children.map((child: any) => renderMenuItem(child, level + 1))}
        </div>
      )}
    </div>
  );
  
  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          'fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-background border-l border-border z-50 lg:hidden transform transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        data-testid="mobile-menu" 
        data-variant={variant}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-accent-12">{content.title || 'Menu'}</h2>
          <button
            onClick={onClose}
            className="p-2 text-accent-11 hover:text-accent-12 hover:bg-accent-3 rounded-md"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto flex-1">
          {content.links.map((item) => renderMenuItem(item))}
          
          {/* CTA Button */}
          {content.cta && (
            <div className="pt-4 mt-4 border-t border-border">
              <Link
                href={content.cta.href}
                className={cn(
                  'block text-center px-4 py-3 rounded-md font-medium transition-colors',
                  {
                    'bg-accent-9 text-accent-12 hover:bg-accent-10': content.cta.variant === 'primary',
                    'border border-accent-7 text-accent-11 hover:bg-accent-3': content.cta.variant === 'outline',
                    'text-accent-11 hover:text-accent-12': content.cta.variant === 'secondary',
                  }
                )}
                onClick={onClose}
              >
                {content.cta.label}
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}