"use client";

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
  
  // Form integration and accessibility
  name?: string;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  required?: boolean;
  autoComplete?: string;
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
  "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-background text-foreground shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-2"
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
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    required = false,
    autoComplete,
    ...props 
  }, ref) => {
    // Clean props for DOM usage
    const { ...domProps } = props;

    // Generate unique IDs for accessibility
    const generatedId = React.useId();
    const comboboxId = id || generatedId;
    const listboxId = `${comboboxId}-listbox`;
    const inputId = `${comboboxId}-input`;
    
    // State for input value and filtered options
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

    // Clear function
    const clearSelection = React.useCallback(() => {
      onValueChange?.(null);
      setInputValue("");
    }, [onValueChange]);

    // Configure useCombobox hook
    const {
      isOpen,
      getToggleButtonProps,
      getMenuProps,
      getInputProps,
      highlightedIndex,
      getItemProps,
    } = useCombobox({
      items: filteredOptions,
      itemToString: (item) => item ? item.label : "",
      selectedItem: selectedOption,
      defaultSelectedItem: defaultValue ? options.find(opt => opt.value === defaultValue) || null : null,
      id: comboboxId,
      
      // Handle input value changes (for filtering)
      onInputValueChange: ({ inputValue: newInputValue, type }) => {
        if (searchable && type === useCombobox.stateChangeTypes.InputChange) {
          setInputValue(newInputValue || "");
        }
      },
      
      // Handle selection changes
      onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
        onValueChange?.(newSelectedItem?.value || null);
        if (newSelectedItem) {
          setInputValue("");
        }
      },
      
      // Handle state changes
      onStateChange: ({ type }) => {
        if (type === useCombobox.stateChangeTypes.InputBlur || 
            type === useCombobox.stateChangeTypes.InputKeyDownEscape) {
          setInputValue("");
        }
      },
      
      // Control open state
      isOpen: undefined, // Let downshift control this
      
      // Input value for controlled behavior
      inputValue: searchable ? (inputValue || selectedOption?.label || "") : (selectedOption?.label || ""),
    });
    
    return (
      <div ref={ref} className="relative" {...domProps}>
        {/* Trigger component */}
        <div 
          className={cn(
            comboBoxTriggerVariants({ uiVariant, uiSize, uiState }), 
            disabled && "cursor-not-allowed",
            className
          )}
        >
          <input
            {...getInputProps({
              id: inputId,
              type: "text",
              className: cn(
                "flex-1 bg-transparent border-0 outline-none placeholder:text-muted-foreground",
                "focus:placeholder:text-muted-foreground/70",
                disabled && "cursor-not-allowed"
              ),
              placeholder: selectedOption && !searchable ? selectedOption.label : placeholder,
              disabled: disabled,
              readOnly: !searchable,
              required: required,
              autoComplete: autoComplete,
              'aria-label': ariaLabel || `ComboBox input${placeholder ? `, ${placeholder}` : ''}`,
              'aria-labelledby': ariaLabelledBy,
              'aria-describedby': ariaDescribedBy,
              onClick: (e) => {
                // Select all text when clicking on the input (if it has a value)
                if (searchable && selectedOption && e.target instanceof HTMLInputElement) {
                  e.target.select();
                }
              },
              'aria-expanded': isOpen,
              'aria-haspopup': 'listbox',
              'aria-controls': isOpen ? listboxId : undefined,
              'aria-autocomplete': searchable ? 'list' : 'none',
              role: 'combobox',
            })}
          />
          <div className="flex items-center gap-1 ml-2">
            {clearable && selectedOption && !disabled && (
              <button
                type="button"
                className={cn(
                  "inline-flex items-center justify-center rounded-sm",
                  "h-4 w-4 text-muted-foreground hover:text-foreground",
                  "hover:bg-accent transition-colors",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                )}
                onClick={clearSelection}
                aria-label="Clear selection"
                tabIndex={-1} // Prevent tab focus, handled by input
              >
                <X className="h-3 w-3" />
              </button>
            )}
            <button
              {...getToggleButtonProps({
                type: "button",
                className: cn(
                  "inline-flex items-center justify-center rounded-sm",
                  "h-4 w-4 text-muted-foreground",
                  "hover:text-foreground transition-colors",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  disabled && "cursor-not-allowed opacity-50"
                ),
                disabled: disabled,
                'aria-label': `${isOpen ? 'Close' : 'Open'} options menu`,
              })}
            >
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        
        {/* Content dropdown */}
        {isOpen && (
          <div 
            {...getMenuProps({
              id: listboxId,
              role: 'listbox',
              className: cn(
                comboBoxContentVariants(), 
                "absolute top-full left-0 mt-1 w-full max-h-96"
              )
            })}
          >
            {filteredOptions.length > 0 ? (
              <div className="overflow-auto p-1 max-h-96">
                {filteredOptions.map((option, index) => (
                  <div
                    key={option.value}
                    {...getItemProps({
                      item: option,
                      index,
                      role: 'option',
                      'aria-selected': selectedOption?.value === option.value,
                      'aria-disabled': option.disabled,
                      className: cn(
                        comboBoxItemVariants(),
                        highlightedIndex === index && "bg-accent text-accent-foreground",
                        selectedOption?.value === option.value && "bg-primary/10 font-medium",
                        option.disabled && "opacity-50 pointer-events-none"
                      ),
                      disabled: option.disabled,
                    })}
                  >
                    <span className="flex-1 truncate">{option.label}</span>
                    {selectedOption?.value === option.value && (
                      <span className="ml-2 text-primary" aria-hidden="true">✓</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            )}
          </div>
        )}
        
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