import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Card as ShadcnCard,
  CardHeader as ShadcnCardHeader,
  CardFooter as ShadcnCardFooter,
  CardTitle as ShadcnCardTitle,
  CardDescription as ShadcnCardDescription,
  CardContent as ShadcnCardContent,
} from '@/components/ui/card';

// Re-export the ShadCN components for direct use when needed
export const CardHeader = ShadcnCardHeader;
export const CardFooter = ShadcnCardFooter;
export const CardTitle = ShadcnCardTitle;
export const CardDescription = ShadcnCardDescription;
export const CardContent = ShadcnCardContent;

export type BaseCardV2Props = React.ComponentProps<typeof ShadcnCard>;

const BaseCardV2 = React.forwardRef<
  React.ElementRef<typeof ShadcnCard>,
  BaseCardV2Props
>(({ className, ...props }, ref) => {
  return (
    <ShadcnCard
      ref={ref}
      className={cn('min-h-[112px] md:min-h-[144px]', 'transition-all duration-300 ease-in-out', className)}
      {...props}
    />
  );
});
BaseCardV2.displayName = 'BaseCardV2';

export { BaseCardV2 };
