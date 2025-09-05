import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { Label } from "./label";

const formFieldVariants = cva(
  "space-y-2",
  {
    variants: {
      spacing: {
        compact: "space-y-1",
        default: "space-y-2",
        loose: "space-y-3",
      },
    },
    defaultVariants: {
      spacing: "default",
    },
  }
);

export interface FormFieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formFieldVariants> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  labelSize?: "sm" | "md" | "lg";
  htmlFor?: string;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ 
    className, 
    spacing,
    label, 
    description, 
    error, 
    required, 
    optional,
    labelSize,
    htmlFor,
    children,
    ...props 
  }, ref) => {
    // Generate unique IDs for ARIA relationships
    const fieldId = React.useId();
    const descriptionId = description ? `${fieldId}-description` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;

    // Determine the state based on error
    const state = error ? "error" : "default";

    // Clone children to add ARIA attributes
    const enhancedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const ariaDescribedBy = [
          descriptionId,
          errorId,
        ].filter(Boolean).join(" ") || undefined;

        return React.cloneElement(child, {
          id: htmlFor || child.props.id || fieldId,
          "aria-describedby": ariaDescribedBy,
          state: child.props.state || state,
          ...child.props,
        });
      }
      return child;
    });

    return (
      <div 
        ref={ref}
        className={cn(formFieldVariants({ spacing }), className)}
        {...props}
      >
        {label && (
          <Label 
            htmlFor={htmlFor || fieldId}
            required={required}
            optional={optional}
            size={labelSize}
            state={state as any}
          >
            {label}
          </Label>
        )}
        
        {enhancedChildren}
        
        {description && !error && (
          <p 
            id={descriptionId}
            className="text-sm text-muted-foreground"
          >
            {description}
          </p>
        )}
        
        {error && (
          <p 
            id={errorId}
            className="text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export { FormField, formFieldVariants };