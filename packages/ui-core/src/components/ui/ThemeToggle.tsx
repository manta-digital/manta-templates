import React from 'react';
import { cn } from '../../utils/cn';
import { ThemeProviderState, IconComponent } from '../../types/theme';
import { Button } from './button';

export interface ThemeToggleProps {
  themeProvider: ThemeProviderState;
  SunIcon: IconComponent;
  MoonIcon: IconComponent;
  ButtonComponent?: React.ComponentType<any>;
  className?: string;
}

/**
 * Framework-agnostic ThemeToggle component
 * 
 * Requires dependency injection of:
 * - themeProvider: Object with theme state and setter
 * - SunIcon: Icon component for light mode
 * - MoonIcon: Icon component for dark mode
 * - ButtonComponent: Optional custom button component (defaults to ShadCN Button)
 */
export function ThemeToggle({ 
  themeProvider, 
  SunIcon, 
  MoonIcon, 
  ButtonComponent = Button,
  className 
}: ThemeToggleProps) {
  const { theme, setTheme } = themeProvider;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ButtonComponent
      variant="outline"
      size="icon"
      aria-pressed={theme === 'dark'}
      title={theme === 'light' ? 'Switch to dark' : 'Switch to light'}
      onClick={toggleTheme}
      className={cn(
        // React to theme using semantic accent tokens
        'transition-all outline-none rounded-full border-2',
        // icon + border react to accent and dark mode
        'text-[var(--color-accent-11)]',
        // Force border color in both themes; avoid variant's dark:border-input override
        '!border-[var(--color-border-accent)] dark:!border-[var(--color-border-accent)]',
        // Ensure transparent base bg so border color reads correctly
        '!bg-transparent dark:!bg-transparent',
        // Force hover styles to override variant default using important modifier
        'hover:!bg-[var(--color-accent-3)] dark:hover:!bg-[var(--color-accent-4)]',
        'hover:!text-[var(--color-accent-12)]',
        'hover:!border-[var(--color-border-accent-hover)]',
        className,
      )}
    >
      {theme === 'light' ? (
        <SunIcon strokeWidth={1.75} className="h-[1.2rem] w-[1.2rem] transition-transform duration-200" />
      ) : (
        <MoonIcon strokeWidth={1.75} className="h-[1.2rem] w-[1.2rem] transition-transform duration-200" />
      )}
      <span className="sr-only">Toggle theme</span>
    </ButtonComponent>
  );
}