import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type FeatureCardWrapperProps = {
  children: ReactNode;
  className?: string;
  mode?: 'dark' | 'light';
} & React.HTMLAttributes<HTMLDivElement>;

export default function FeatureCardWrapper({ children, className, mode = 'dark', ...props }: FeatureCardWrapperProps) {
  const baseClasses = mode === 'light'
    ? 'w-full overflow-hidden rounded-xl bg-gradient-to-br from-[var(--color-gray-1)] to-[var(--color-gray-2)] shadow-lg border border-[var(--color-card-border)] hover:border-[var(--color-card-border-hover)] hover:scale-[1.02] transition-all duration-300 ease-in-out hover:shadow-xl'
    : 'w-full overflow-hidden rounded-xl bg-gradient-to-br from-[var(--color-accent-a2)] to-[var(--color-accent-a3)] shadow-lg border border-[var(--color-card-border)] hover:border-[var(--color-card-border-hover)] hover:scale-[1.02] transition-all duration-300 ease-in-out hover:shadow-xl';

  return (
    <div className={cn(baseClasses, className)} {...props}>
      {children}
    </div>
  );
}
