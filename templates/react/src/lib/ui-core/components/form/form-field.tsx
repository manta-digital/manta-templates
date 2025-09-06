import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { Label } from "./label";

const formFieldVariants = cva(
  "space-y-2",
  {
    variants: {
      uiSpacing: {
        compact: "space-y-1",
        default: "space-y-2",
        loose: "space-y-3",
      },
    },
    defaultVariants: {
      uiSpacing: "default",
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
  labelUiSize?: "sm" | "md" | "lg";
  htmlFor?: string;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ 
    className, 
    uiSpacing,
    label, 
    description, 
    error, 
    required, 
    optional,
    labelUiSize,
    htmlFor,
    children,
    ...props 
  }, ref) => {
    // Filter out React Hook Form props and ui props that shouldn't be passed to DOM
    const { 
      isDirty, // eslint-disable-line @typescript-eslint/no-unused-vars
      isTouched, // eslint-disable-line @typescript-eslint/no-unused-vars
      uiSpacing: _,  // Extract but don't use (it's already in function params) // eslint-disable-line @typescript-eslint/no-unused-vars
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
          uiState: childProps.uiState || state,
        });
      }
      return child;
    });

    return (
      <div 
        ref={ref}
        className={cn(formFieldVariants({ uiSpacing }), className)}
        {...domProps}
      >
        {label && (
          <Label 
            htmlFor={htmlFor || fieldId}
            required={required}
            optional={optional}
            uiSize={labelUiSize}
            uiState={state}
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