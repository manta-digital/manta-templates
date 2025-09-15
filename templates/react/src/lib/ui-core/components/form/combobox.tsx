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
  
  // Custom value support for renaming
  allowCustomValues?: boolean;
  onInputValueChange?: (inputValue: string) => void;
  customValueLabel?: string; // Label for custom value option (default: "Create: {inputValue}")
  
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
    allowCustomValues = false,
    onInputValueChange,
    customValueLabel,
    name,
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    required = false,
    autoComplete,
    ...props 
  }, ref) => {
    // Filter out React Hook Form props that shouldn't be passed to DOM
    const { 
      isDirty, // eslint-disable-line @typescript-eslint/no-unused-vars
      isTouched, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...domProps 
    } = props as any;

    // Generate unique IDs for accessibility
    const generatedId = React.useId();
    const comboboxId = id || generatedId;
    const listboxId = `${comboboxId}-listbox`;
    const inputId = `${comboboxId}-input`;
    
    // State for input value and filtered options
    const [inputValue, setInputValue] = React.useState("");
    
    // Filter options based on input value and handle custom values
    const filteredOptions = React.useMemo(() => {
      if (!searchable || !inputValue) return options;
      
      const filtered = options.filter(option => filterFunction(inputValue, option));
      
      // Add custom value option if allowed and input doesn't match any existing option
      if (allowCustomValues && inputValue.trim() && 
          !options.some(option => option.value === inputValue || option.label === inputValue)) {
        const customOption: ComboBoxOption = {
          value: inputValue,
          label: customValueLabel || `Create: "${inputValue}"`,
          // Mark as custom for styling/identification
          group: "__custom__"
        };
        return [customOption, ...filtered];
      }
      
      return filtered;
    }, [options, inputValue, searchable, filterFunction, allowCustomValues, customValueLabel]);
    
    // Announce filtered results for screen readers
    const [announcement, setAnnouncement] = React.useState("");

    // Find selected option
    const selectedOption = React.useMemo(() => {
      return options.find(option => option.value === value) || null;
    }, [options, value]);

    // Clear function
    const clearSelection = React.useCallback(() => {
      onValueChange?.(null);
      setInputValue("");
    }, [onValueChange]);

    // Effect to announce filtered results for screen readers
    React.useEffect(() => {
      if (searchable && inputValue) {
        const count = filteredOptions.length;
        if (count === 0) {
          setAnnouncement("No options found");
        } else {
          setAnnouncement(`${count} option${count === 1 ? '' : 's'} available`);
        }
      } else {
        setAnnouncement("");
      }
    }, [filteredOptions.length, inputValue, searchable]);

    // Configure and setup useCombobox hook with enhanced accessibility
    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      highlightedIndex,
      getItemProps,
      selectedItem,
      selectItem,
      openMenu,
      closeMenu,
    } = useCombobox({
      items: filteredOptions,
      itemToString: (item) => item ? item.label : "",
      selectedItem: selectedOption,
      defaultSelectedItem: defaultValue ? options.find(opt => opt.value === defaultValue) || null : null,
      id: comboboxId,
      
      // Handle input value changes (for filtering)
      onInputValueChange: ({ inputValue: newInputValue, type }) => {
        if (searchable) {
          // Only update input value for actual user input, not programmatic changes
          if (type === useCombobox.stateChangeTypes.InputChange) {
            const cleanInputValue = newInputValue || "";
            setInputValue(cleanInputValue);
            // Call parent handler for custom value support/renaming
            onInputValueChange?.(cleanInputValue);
          }
        }
      },
      
      // Handle selection changes
      onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
        onValueChange?.(newSelectedItem?.value || null);
        if (newSelectedItem) {
          // Clear the filter input but preserve the selection display
          setInputValue("");
          // Announce selection for screen readers
          setAnnouncement(`Selected ${newSelectedItem.label}`);
        }
      },
      
      // Handle state changes
      onStateChange: ({ type, inputValue: stateInputValue }) => {
        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
            // Handle Enter key - create custom value if allowed and no item is highlighted
            if (allowCustomValues && inputValue.trim() && highlightedIndex === -1) {
              onValueChange?.(inputValue.trim());
              setInputValue("");
              closeMenu();
              return;
            }
            // Fall through to normal selection handling
          case useCombobox.stateChangeTypes.ItemClick:
            // Close menu on selection
            closeMenu();
            break;
          case useCombobox.stateChangeTypes.InputBlur:
            // For custom values, create the value on blur if input is not empty
            if (allowCustomValues && inputValue.trim() && !selectedOption) {
              onValueChange?.(inputValue.trim());
            }
            // Clear filter but preserve selection display
            setInputValue("");
            break;
          case useCombobox.stateChangeTypes.InputKeyDownEscape:
            // Clear any active filter when pressing escape
            setInputValue("");
            setAnnouncement("Options menu closed");
            break;
          default:
            break;
        }
      },
      
      // Control open state
      isOpen: undefined, // Let downshift control this
      
      // Input value for controlled behavior
      inputValue: searchable ? (inputValue || selectedOption?.label || "") : (selectedOption?.label || ""),
    });
    
    return (
      <div ref={ref} className="relative" {...domProps}>
        {/* Live region for screen reader announcements */}
        <div 
          aria-live="polite" 
          aria-atomic="true" 
          className="sr-only"
          role="status"
        >
          {announcement}
        </div>
        
        {/* Trigger component with enhanced styling and accessibility */}
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
        
        {/* Enhanced Content component with improved positioning and animations */}
        {isOpen && (
          <div 
            {...getMenuProps({
              id: listboxId,
              role: 'listbox',
              'aria-label': 'Options list',
              className: cn(
                comboBoxContentVariants(), 
                "absolute top-full left-0 mt-1 w-full",
                "transform-gpu", // Hardware acceleration for smoother animations
                "data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:slide-in-from-top-2"
              ),
              style: {
                // Ensure content doesn't overflow viewport
                maxHeight: 'min(384px, calc(100vh - 100px))',
              }
            })}
          >
            {filteredOptions.length > 0 ? (
              <div 
                className={cn(
                  "overflow-auto p-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",
                  "max-h-96"
                )}
                style={{
                  // Custom scrollbar for better UX
                  scrollbarWidth: 'thin',
                }}
              >
                {filteredOptions.map((option, index) => {
                  const isCustomValue = option.group === "__custom__";
                  return (
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
                          option.disabled && "opacity-50 pointer-events-none cursor-not-allowed",
                          isCustomValue && "bg-blue-50 dark:bg-blue-950/30 border-l-2 border-l-blue-500",
                          "transition-colors duration-75" // Smooth hover transitions
                        ),
                        disabled: option.disabled,
                      })}
                    >
                      <span className="flex-1 truncate">
                        {isCustomValue ? (
                          <span className="flex items-center gap-2">
                            <span className="text-blue-600 dark:text-blue-400">+</span>
                            {option.label}
                          </span>
                        ) : (
                          option.label
                        )}
                      </span>
                      {selectedOption?.value === option.value && (
                        <span className="ml-2 text-primary" aria-hidden="true">✓</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={cn(
                "flex items-center justify-center px-4 py-8",
                "text-sm text-muted-foreground",
                "min-h-[80px]" // Ensure adequate height for empty state
              )}>
                <div className="text-center">
                  <div className="mb-1 text-muted-foreground/70">No options found</div>
                  <div className="text-xs text-muted-foreground/50">
                    {emptyMessage !== "No options found" ? emptyMessage : "Try adjusting your search"}
                  </div>
                </div>
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