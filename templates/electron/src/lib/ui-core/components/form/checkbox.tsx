import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
  {
    variants: {
      uiSize: {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
      uiVariant: {
        default: "border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
        accent: "border-border data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground data-[state=indeterminate]:bg-accent data-[state=indeterminate]:text-accent-foreground",
      },
    },
    defaultVariants: {
      uiSize: "md",
      uiVariant: "default",
    },
  }
);

const checkboxIndicatorVariants = cva(
  "flex items-center justify-center text-current",
  {
    variants: {
      uiSize: {
        sm: "h-2.5 w-2.5",
        md: "h-3 w-3",
        lg: "h-3.5 w-3.5",
      },
    },
    defaultVariants: {
      uiSize: "md",
    },
  }
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, uiSize, uiVariant, label, description, indeterminate, ...props }, ref) => {
  const checkboxId = React.useId();
  const descriptionId = description ? `${checkboxId}-description` : undefined;

  // Handle indeterminate state
  const checked = indeterminate ? "indeterminate" : props.checked;

  const checkbox = (
    <CheckboxPrimitive.Root
      ref={ref}
      id={checkboxId}
      className={cn(checkboxVariants({ uiSize, uiVariant }), className)}
      checked={checked}
      aria-describedby={descriptionId}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn(checkboxIndicatorVariants({ uiSize }))}>
        {indeterminate ? (
          <Minus className="h-full w-full" />
        ) : (
          <Check className="h-full w-full" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (label || description) {
    return (
      <div className="flex items-start space-x-2">
        {checkbox}
        <div className="grid gap-1.5 leading-none">
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {label}
            </label>
          )}
          {description && (
            <p id={descriptionId} className="text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  return checkbox;
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// CheckboxGroup Component for Task 5.3
const checkboxGroupVariants = cva(
  "grid gap-2",
  {
    variants: {
      uiOrientation: {
        vertical: "grid-cols-1",
        horizontal: "grid-flow-col auto-cols-max gap-4",
      },
    },
    defaultVariants: {
      uiOrientation: "vertical",
    },
  }
);

export interface CheckboxGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof checkboxGroupVariants> {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
  options: Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;
  uiSize?: "sm" | "md" | "lg";
  uiVariant?: "default" | "accent";
  uiState?: "default" | "error" | "success" | "warning";
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ 
    className, 
    uiOrientation, 
    value: controlledValue, 
    defaultValue = [], 
    onValueChange, 
    disabled = false,
    options,
    uiSize = "md",
    uiVariant = "default",
    uiState, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...props 
  }, ref) => {
    // Filter out ui props that shouldn't be passed to DOM (they're already extracted above)
    const { ...domProps } = props;
    const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleValueChange = React.useCallback((optionValue: string, checked: boolean) => {
      const newValue = checked 
        ? [...value, optionValue]
        : value.filter(v => v !== optionValue);
      
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    }, [value, isControlled, onValueChange]);

    return (
      <div 
        ref={ref}
        className={cn(checkboxGroupVariants({ uiOrientation }), className)}
        role="group"
        {...domProps}
      >
        {options.map((option) => (
          <Checkbox
            key={option.value}
            uiSize={uiSize}
            uiVariant={uiVariant}
            label={option.label}
            description={option.description}
            disabled={disabled || option.disabled}
            checked={value.includes(option.value)}
            onCheckedChange={(checked) => {
              if (typeof checked === 'boolean') {
                handleValueChange(option.value, checked);
              }
            }}
          />
        ))}
      </div>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";

export { Checkbox, CheckboxGroup, checkboxVariants, checkboxGroupVariants };