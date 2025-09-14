import * as React from "react";
import { useCombobox } from "downshift";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { cn } from "../../utils/cn";

// Types and Interfaces
export interface ComboBoxOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface ComboBoxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">,
    VariantProps<typeof comboBoxTriggerVariants> {
  // Data
  options: ComboBoxOption[];
  
  // State
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | null) => void;
  
  // Behavior
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  
  // Advanced
  emptyMessage?: string;
  filterFunction?: (inputValue: string, option: ComboBoxOption) => boolean;
  
  // Form integration
  name?: string;
}

// CVA Variants following existing patterns
const comboBoxTriggerVariants = cva(
  "flex w-full items-center justify-between rounded-md border transition-all focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      uiVariant: {
        default: "border-border bg-background hover:bg-accent/5",
        ghost: "border-transparent bg-transparent hover:bg-accent/50 focus-within:bg-background focus-within:border-border",
        filled: "border-transparent bg-muted hover:bg-muted/80 focus-within:bg-background focus-within:border-border",
      },
      uiSize: {
        sm: "h-8 px-2 text-sm",
        md: "h-10 px-3 text-base",
        lg: "h-12 px-4 text-lg",
      },
      uiState: {
        default: "",
        error: "border-destructive ring-destructive/20 focus-within:ring-destructive",
        success: "border-green-500 ring-green-500/20 focus-within:ring-green-500",
        warning: "border-yellow-500 ring-yellow-500/20 focus-within:ring-yellow-500",
      }
    },
    defaultVariants: {
      uiVariant: "default",
      uiSize: "md",
      uiState: "default",
    },
  }
);

const comboBoxContentVariants = cva(
  "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-background text-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
);

const comboBoxItemVariants = cva(
  "relative flex w-full cursor-default select-none items-center rounded-md py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
);

// Default filter function (case-insensitive prefix matching)
const defaultFilterFunction = (inputValue: string, option: ComboBoxOption): boolean => {
  return option.label.toLowerCase().startsWith(inputValue.toLowerCase());
};

// Main ComboBox component
const ComboBox = React.forwardRef<HTMLDivElement, ComboBoxProps>(
  ({ 
    className, 
    uiVariant, 
    uiSize, 
    uiState, 
    options,
    value,
    defaultValue,
    onValueChange,
    placeholder = "Select an option...",
    searchable = true,
    clearable = false,
    disabled = false,
    emptyMessage = "No options found",
    filterFunction = defaultFilterFunction,
    name,
    ...props 
  }, ref) => {
    // Filter out React Hook Form props that shouldn't be passed to DOM
    const { 
      isDirty, // eslint-disable-line @typescript-eslint/no-unused-vars
      isTouched, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...domProps 
    } = props as any;

    // State for filtered options
    const [inputValue, setInputValue] = React.useState("");
    
    // Filter options based on input value
    const filteredOptions = React.useMemo(() => {
      if (!searchable || !inputValue) return options;
      return options.filter(option => filterFunction(inputValue, option));
    }, [options, inputValue, searchable, filterFunction]);

    // Find selected option
    const selectedOption = React.useMemo(() => {
      return options.find(option => option.value === value) || null;
    }, [options, value]);

    // Basic component structure setup for useCombobox hook integration
    // Note: Hook integration will be implemented in Task 3
    
    return (
      <div ref={ref} className="relative" {...domProps}>
        {/* Trigger component will be implemented in Task 4 */}
        <div className={cn(comboBoxTriggerVariants({ uiVariant, uiSize, uiState }), className)}>
          <input
            type="text"
            className="flex-1 bg-transparent border-0 outline-none placeholder:text-muted-foreground"
            placeholder={selectedOption ? selectedOption.label : placeholder}
            disabled={disabled}
            readOnly={!searchable}
          />
          <div className="flex items-center gap-1">
            {clearable && selectedOption && (
              <button
                type="button"
                className="inline-flex items-center justify-center w-4 h-4 rounded hover:bg-accent hover:text-accent-foreground"
                disabled={disabled}
              >
                <X className="h-3 w-3" />
              </button>
            )}
            <button
              type="button"
              className="inline-flex items-center justify-center w-4 h-4"
              disabled={disabled}
            >
              <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
          </div>
        </div>
        
        {/* Content component will be implemented in Task 5 */}
        {/* Items will be implemented in Task 6 */}
        
        {/* Hidden input for form submission */}
        {name && (
          <input
            type="hidden"
            name={name}
            value={value || ""}
          />
        )}
      </div>
    );
  }
);

ComboBox.displayName = "ComboBox";

// Export variants for potential external usage
export { 
  ComboBox, 
  comboBoxTriggerVariants, 
  comboBoxContentVariants, 
  comboBoxItemVariants 
};