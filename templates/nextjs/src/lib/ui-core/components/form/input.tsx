import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const inputVariants = cva(
  "flex w-full rounded-md border transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      uiVariant: {
        default: "border-border bg-background text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        ghost: "border-transparent bg-transparent hover:bg-accent/50 focus-visible:bg-background focus-visible:border-border focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        filled: "border-transparent bg-muted hover:bg-muted/80 focus-visible:bg-background focus-visible:border-border focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      },
      uiSize: {
        sm: "h-8 px-2 text-sm",
        md: "h-10 px-3 text-base", 
        lg: "h-12 px-4 text-lg",
      },
      uiState: {
        default: "",
        error: "border-destructive ring-destructive/20 focus-visible:ring-destructive",
        success: "border-green-500 ring-green-500/20 focus-visible:ring-green-500",
        warning: "border-yellow-500 ring-yellow-500/20 focus-visible:ring-yellow-500",
      }
    },
    defaultVariants: {
      uiVariant: "default",
      uiSize: "md",
      uiState: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, uiVariant, uiSize, uiState, leftIcon, rightIcon, ...props }, ref) => {
    // Filter out React Hook Form props that shouldn't be passed to DOM
    const { 
      isDirty, // eslint-disable-line @typescript-eslint/no-unused-vars
      isTouched, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...domProps 
    } = props as any;
    
    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <input
          className={cn(
            inputVariants({ uiVariant, uiSize, uiState }),
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          ref={ref}
          {...domProps}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };