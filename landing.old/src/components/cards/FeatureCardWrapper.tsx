import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type FeatureCardWrapperProps = {
  children: ReactNode;
  className?: string;
  mode?: 'dark' | 'light';
} & React.HTMLAttributes<HTMLDivElement>;

export default function FeatureCardWrapper({ children, className, mode = 'dark', ...props }: FeatureCardWrapperProps) {
  const baseClasses = mode === 'light'
    ? 'w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-white shadow-lg border border-teal-300 hover:border-teal-400 hover:scale-[1.02] transition-all duration-300 ease-in-out hover:shadow-teal-200/30 hover:shadow-xl'
    : 'w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg border border-teal-500 hover:border-teal-600 hover:scale-[1.02] transition-all duration-300 ease-in-out hover:shadow-teal-900/20 hover:shadow-xl';

  return (
    <div className={cn(baseClasses, className)} {...props}>
      {children}
    </div>
  );
}
