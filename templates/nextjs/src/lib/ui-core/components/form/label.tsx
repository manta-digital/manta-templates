import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors",
  {
    variants: {
      uiSize: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      uiState: {
        default: "text-foreground",
        error: "text-destructive",
        success: "text-green-600",
        warning: "text-yellow-600",
      }
    },
    defaultVariants: {
      uiSize: "md",
      uiState: "default",
    },
  }
);

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
  optional?: boolean;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, uiSize, uiState, required, optional, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ uiSize, uiState }), className)}
    {...props}
  >
    {children}
    {required && (
      <span className="ml-1 text-destructive" aria-label="required">
        *
      </span>
    )}
    {optional && (
      <span className="ml-2 text-xs text-muted-foreground font-normal">
        (optional)
      </span>
    )}
  </LabelPrimitive.Root>
));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label, labelVariants };