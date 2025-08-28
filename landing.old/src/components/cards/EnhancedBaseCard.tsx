import * as React from 'react';
import { cn } from '@/lib/utils';
import { cardVariants, type CardProps } from '@/lib/cardVariants';
import {
  Card as ShadcnCard,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

const EnhancedBaseCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, state, ...props }, ref) => {
    return (
      <ShadcnCard
        ref={ref}
        className={cn(cardVariants({ variant, size, state, className }))}
        {...props}
      />
    );
  },
);
EnhancedBaseCard.displayName = 'EnhancedBaseCard';

export {
  EnhancedBaseCard,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
