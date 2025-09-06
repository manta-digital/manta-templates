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
    // Filter out React Hook Form props that shouldn't be passed to DOM
    const { 
      isDirty, 
      isTouched, 
      ...domProps 
    } = props as any;
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

        const childProps = child.props as any;
        return React.cloneElement(child as any, {
          id: htmlFor || childProps.id || fieldId,
          "aria-describedby": ariaDescribedBy,
          state: childProps.state || state,
        });
      }
      return child;
    });

    return (
      <div 
        ref={ref}
        className={cn(formFieldVariants({ spacing }), className)}
        {...domProps}
      >
        {label && (
          <Label 
            htmlFor={htmlFor || fieldId}
            required={required}
            optional={optional}
            size={labelSize}
            state={state}
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