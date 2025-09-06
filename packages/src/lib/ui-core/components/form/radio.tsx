import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const radioGroupVariants = cva(
  "grid gap-2",
  {
    variants: {
      orientation: {
        horizontal: "grid-flow-col auto-cols-max",
        vertical: "grid-flow-row",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
);

const radioItemVariants = cva(
  "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const radioIndicatorVariants = cva(
  "flex items-center justify-center h-full w-full",
  {
    variants: {
      size: {
        sm: "",
        md: "", 
        lg: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const radioIndicatorDotVariants = cva(
  "rounded-full bg-current",
  {
    variants: {
      size: {
        sm: "h-1.5 w-1.5",
        md: "h-2 w-2", 
        lg: "h-2.5 w-2.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    VariantProps<typeof radioGroupVariants> {
  options?: Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;
  size?: "sm" | "md" | "lg";
}

export interface RadioItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioItemVariants> {
  label?: string;
  description?: string;
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, orientation, options, size = "md", children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(radioGroupVariants({ orientation }), className)}
      {...props}
      ref={ref}
    >
      {options
        ? options.map((option) => (
            <RadioItem
              key={option.value}
              value={option.value}
              size={size}
              label={option.label}
              description={option.description}
              disabled={option.disabled}
            />
          ))
        : children}
    </RadioGroupPrimitive.Root>
  );
});

const RadioItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioItemProps
>(({ className, size, label, description, children, ...props }, ref) => {
  const content = (
    <div className="flex items-center space-x-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(radioItemVariants({ size }), className)}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className={cn(radioIndicatorVariants({ size }))}>
          <div className={cn(radioIndicatorDotVariants({ size }))} />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {(label || description) && (
        <div className="grid gap-1.5 leading-none">
          {label && (
            <label
              htmlFor={props.value}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );

  return content;
});

RadioGroup.displayName = "RadioGroup";
RadioItem.displayName = "RadioItem";

export { RadioGroup, RadioItem, radioGroupVariants, radioItemVariants, radioIndicatorVariants, radioIndicatorDotVariants };