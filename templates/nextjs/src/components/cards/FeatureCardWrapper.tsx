import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type FeatureCardWrapperProps = {
  children: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function FeatureCardWrapper({ children, className, ...props }: FeatureCardWrapperProps) {
  return (
    <div
      className={cn(
        'w-full max-w-6xl overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg border border-teal-500 hover:border-teal-600 hover:scale-[1.02] transition-all duration-300 hover:shadow-teal-900/20 hover:shadow-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
