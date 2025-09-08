import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

// Task 3.1: List Root Component
const listVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "list-none",
        ordered: "list-decimal list-inside",
        disc: "list-disc list-inside", 
        none: "list-none",
      },
      density: {
        compact: "space-y-1",
        default: "space-y-2",
        comfortable: "space-y-3",
      },
      interactive: {
        true: "cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      density: "default",
      interactive: false,
    },
  }
);

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement>,
    VariantProps<typeof listVariants> {
  variant?: "default" | "ordered" | "disc" | "none";
  interactive?: boolean;
  density?: "compact" | "default" | "comfortable";
  className?: string;
  children: React.ReactNode;
}

const List = React.forwardRef<
  HTMLUListElement | HTMLOListElement,
  ListProps
>(({ className, variant = "default", interactive = false, density = "default", children, ...props }, ref) => {
  const Component = variant === "ordered" ? "ol" : "ul";
  
  return (
    <Component
      ref={ref as any}
      className={cn(listVariants({ variant, density, interactive }), className)}
      {...props}
    >
      {children}
    </Component>
  );
});

List.displayName = "List";

// Task 3.2: ListItem Component
const listItemVariants = cva(
  "w-full transition-colors duration-200",
  {
    variants: {
      interactive: {
        true: "hover:bg-neutral-2 focus:bg-neutral-2 focus:outline-none focus:ring-2 focus:ring-accent-7 focus:ring-offset-2 rounded-md px-2 py-1",
        false: "",
      },
      selected: {
        true: "bg-accent-3 text-accent-12 border-l-2 border-accent-9",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
    },
    compoundVariants: [
      {
        interactive: true,
        selected: true,
        className: "bg-accent-3 hover:bg-accent-4",
      },
      {
        interactive: true,
        disabled: true,
        className: "hover:bg-transparent focus:bg-transparent cursor-not-allowed",
      },
    ],
    defaultVariants: {
      interactive: false,
      selected: false,
      disabled: false,
    },
  }
);

export interface ListItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listItemVariants> {
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, selected = false, disabled = false, onClick, children, ...props }, ref) => {
    const interactive = Boolean(onClick);
    
    const handleClick = React.useCallback(() => {
      if (!disabled && onClick) {
        onClick();
      }
    }, [disabled, onClick]);

    const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
      if (!disabled && interactive && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        handleClick();
      }
    }, [disabled, interactive, handleClick]);

    return (
      <li
        ref={ref}
        className={cn(listItemVariants({ interactive, selected, disabled }), className)}
        onClick={interactive ? handleClick : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        tabIndex={interactive && !disabled ? 0 : undefined}
        role={interactive ? "button" : undefined}
        aria-selected={interactive ? selected : undefined}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </li>
    );
  }
);

ListItem.displayName = "ListItem";

// Task 3.3: ListHeader Component
const listHeaderVariants = cva(
  "w-full font-medium text-neutral-12 border-b border-neutral-6 pb-2 mb-2",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base", 
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ListHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listHeaderVariants> {
  className?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const ListHeader = React.forwardRef<HTMLDivElement, ListHeaderProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    const headerId = React.useId();
    
    return (
      <div
        ref={ref}
        id={headerId}
        className={cn(listHeaderVariants({ size }), className)}
        role="heading"
        aria-level={3}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ListHeader.displayName = "ListHeader";

// Task 3.4: Export all components and interfaces
export { 
  List, 
  ListItem, 
  ListHeader,
  listVariants,
  listItemVariants,
  listHeaderVariants
};