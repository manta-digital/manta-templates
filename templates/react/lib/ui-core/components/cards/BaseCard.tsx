import * as React from 'react';
import { cn } from '../../utils/cn';
import {
  Card as ShadcnCard,
  CardHeader as ShadcnCardHeader,
  CardFooter as ShadcnCardFooter,
  CardTitle as ShadcnCardTitle,
  CardDescription as ShadcnCardDescription,
  CardContent as ShadcnCardContent,
} from '../ui/card';

// Re-export the ShadCN components for direct use when needed
export const CardHeader = ShadcnCardHeader;
export const CardFooter = ShadcnCardFooter;
export const CardTitle = ShadcnCardTitle;
export const CardDescription = ShadcnCardDescription;
export const CardContent = ShadcnCardContent;

export interface BaseCardProps extends React.ComponentProps<typeof ShadcnCard> {
  ImageComponent?: React.ComponentType<any>;
  LinkComponent?: React.ComponentType<any>;
}

const BaseCard = React.forwardRef<
  React.ElementRef<typeof ShadcnCard>,
  BaseCardProps
>(({ className, ImageComponent, LinkComponent, ...props }, ref) => {
  return (
    <ShadcnCard
      ref={ref}
      className={cn('transition-all duration-300 ease-in-out', className)}
      {...props}
    />
  );
});
BaseCard.displayName = 'BaseCard';

export { BaseCard };