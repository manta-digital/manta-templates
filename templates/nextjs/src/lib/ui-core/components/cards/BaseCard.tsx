import * as React from 'react';
import { cn } from '../../utils/cn';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui/card';

// Re-export the card components for direct use when needed
export { CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

export interface BaseCardProps extends React.ComponentProps<typeof Card> {
  ImageComponent?: React.ComponentType<any>;
  LinkComponent?: React.ComponentType<any>;
}

const BaseCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  BaseCardProps
>(({ className, ImageComponent: _ImageComponent, LinkComponent: _LinkComponent, ...props }, ref) => {
  return (
    <Card
      ref={ref}
      className={cn('transition-all duration-300 ease-in-out', className)}
      {...props}
    />
  );
});
BaseCard.displayName = 'BaseCard';

export { BaseCard };