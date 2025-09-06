import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const radioGroupVariants = cva(
  "grid gap-2",
  {
    variants: {
      uiOrientation: {
        horizontal: "grid-flow-col auto-cols-max",
        vertical: "grid-flow-row",
      },
    },
    defaultVariants: {
      uiOrientation: "vertical",
    },
  }
);

const radioItemVariants = cva(
  "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      uiSize: {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      uiSize: "md",
    },
  }
);

const radioIndicatorVariants = cva(
  "flex items-center justify-center h-full w-full",
  {
    variants: {
      uiSize: {
        sm: "",
        md: "", 
        lg: "",
      },
    },
    defaultVariants: {
      uiSize: "md",
    },
  }
);

const radioIndicatorDotVariants = cva(
  "rounded-full bg-current",
  {
    variants: {
      uiSize: {
        sm: "h-1.5 w-1.5",
        md: "h-2 w-2", 
        lg: "h-2.5 w-2.5",
      },
    },
    defaultVariants: {
      uiSize: "md",
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
  uiSize?: "sm" | "md" | "lg";
  uiState?: "default" | "error" | "success" | "warning";
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
>(({ className, uiOrientation, options, uiSize = "md", uiState, children, ...props }, ref) => { // eslint-disable-line @typescript-eslint/no-unused-vars
  return (
    <RadioGroupPrimitive.Root
      className={cn(radioGroupVariants({ uiOrientation }), className)}
      {...props}
      ref={ref}
    >
      {options
        ? options.map((option) => (
            <RadioItem
              key={option.value}
              value={option.value}
              uiSize={uiSize}
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
>(({ className, uiSize, label, description, children, ...props }, ref) => {
  const content = (
    <div className="flex items-center space-x-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(radioItemVariants({ uiSize }), className)}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className={cn(radioIndicatorVariants({ uiSize }))}>
          <div className={cn(radioIndicatorDotVariants({ uiSize }))} />
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