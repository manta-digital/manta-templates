import * as React from 'react';
import { cn } from '@/lib/utils';
import { cardVariants, type CardProps } from '@manta/ui-core';
import {
  Card as ShadcnCard,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from '@manta/ui-core';

const EnhancedBaseCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, state, ...props }, ref) => {
    return (
      <ShadcnCard
        ref={ref}
        className={cn(cardVariants({ variant, state, className }))}
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
