import React from 'react';
import { cn } from '@/lib/utils'; // Assuming shadcn/ui setup includes this utility

type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | string; // Allow standard sizes or arbitrary Tailwind class

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: MaxWidth;
  className?: string; // Allow additional classes
}

const getMaxWidthClass = (maxWidth?: MaxWidth): string => {
  if (!maxWidth) return 'max-w-7xl'; // Default max width if none provided (adjust as needed)

  switch (maxWidth) {
    case 'sm': return 'max-w-sm';
    case 'md': return 'max-w-md';
    case 'lg': return 'max-w-lg';
    case 'xl': return 'max-w-xl';
    case '2xl': return 'max-w-2xl';
    case 'full': return 'max-w-full';
    default:
      // Allow passing a raw Tailwind class like 'max-w-[1000px]'
      // Basic validation to ensure it starts with 'max-w-'
      return maxWidth.startsWith('max-w-') ? maxWidth : 'max-w-7xl'; // Fallback to default
  }
};

const Container: React.FC<ContainerProps> = ({ children, maxWidth, className }) => {
  const maxWidthClass = getMaxWidthClass(maxWidth);

  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', maxWidthClass, className)}>
      {children}
    </div>
  );
};

export default Container;
