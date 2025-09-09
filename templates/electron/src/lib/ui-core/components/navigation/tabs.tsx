import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

// Task 2.1: Tabs Root Component
const tabsVariants = cva(
  "w-full",
  {
    variants: {
      orientation: {
        horizontal: "flex flex-col",
        vertical: "flex flex-row",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
    VariantProps<typeof tabsVariants> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
  children: React.ReactNode;
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    orientation={orientation}
    className={cn(tabsVariants({ orientation }), className)}
    {...props}
  />
));

Tabs.displayName = TabsPrimitive.Root.displayName;

// Task 2.2: TabsList Component
const tabsListVariants = cva(
  "inline-flex items-center justify-center rounded-sm bg-neutral-2 p-1 text-neutral-11 border border-neutral-6",
  {
    variants: {
      orientation: {
        horizontal: "h-10 flex-row overflow-x-auto scrollbar-thin scrollbar-none",
        vertical: "h-auto flex-col w-auto min-w-max overflow-y-auto",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {
  orientation?: "horizontal" | "vertical";
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps>(({ className, orientation = "horizontal", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ orientation }), "py-0", className)}
    {...props}
  />
));

TabsList.displayName = TabsPrimitive.List.displayName;

// Task 2.3: TabsTrigger Component
const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap px-6 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-7 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      state: {
        active: "bg-accent-9 text-accent-12 shadow-sm border-b-2 border-accent-9",
        inactive: "text-neutral-11 hover:text-neutral-12 hover:bg-neutral-3",
      },
    },
    defaultVariants: {
      state: "inactive",
    },
  }
);

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      tabsTriggerVariants({ state: "inactive" }),
      "rounded-[0.5rem] data-[state=active]:bg-accent-9 data-[state=active]:text-accent-12 data-[state=active]:border-b-2 data-[state=active]:border-accent-9 data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
));

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// Task 2.4: TabsContent Component
const tabsContentVariants = cva(
  "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-7 focus-visible:ring-offset-2 transition-opacity duration-200",
  {
    variants: {
      orientation: {
        horizontal: "mt-2",
        vertical: "mt-0 ml-2 flex-1",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
    VariantProps<typeof tabsContentVariants> {
  value: string;
  orientation?: "horizontal" | "vertical";
}

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(tabsContentVariants({ orientation }), className)}
    {...props}
  />
));

TabsContent.displayName = TabsPrimitive.Content.displayName;

// Task 2.5: Export all components and interfaces
export { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent,
  tabsVariants,
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants
};