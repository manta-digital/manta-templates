import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none",
  {
    variants: {
      uiVariant: {
        default: "border-border text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        ghost: "border-transparent bg-transparent hover:bg-accent/50 focus-visible:bg-background focus-visible:border-border focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        filled: "border-transparent bg-muted hover:bg-muted/80 focus-visible:bg-background focus-visible:border-border focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      },
      uiSize: {
        sm: "min-h-[60px] px-2 py-1 text-xs",
        md: "min-h-[80px] px-3 py-2 text-sm", 
        lg: "min-h-[100px] px-4 py-3 text-base",
      },
      uiState: {
        default: "",
        error: "border-destructive ring-destructive/20 focus-visible:ring-destructive",
        success: "border-green-500 ring-green-500/20 focus-visible:ring-green-500",
        warning: "border-yellow-500 ring-yellow-500/20 focus-visible:ring-yellow-500",
      }
    },
    defaultVariants: {
      uiVariant: "default",
      uiSize: "md",
      uiState: "default",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, uiVariant, uiSize, uiState, autoResize, minRows = 3, maxRows, ...props }, ref) => {
    // Filter out React Hook Form props that shouldn't be passed to DOM
    const { 
      isDirty, // eslint-disable-line @typescript-eslint/no-unused-vars
      isTouched, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...domProps 
    } = props as any;
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [textareaHeight, setTextareaHeight] = React.useState<string | undefined>();

    // Callback ref that handles both internal ref and forwarded ref
    const callbackRef = React.useCallback((node: HTMLTextAreaElement) => {
      // Set internal ref for auto-resize
      textareaRef.current = node;
      // Forward to parent ref
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }, [ref]);

    const adjustHeight = React.useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea || !autoResize) return;

      // Reset height to auto to get the actual scroll height
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      
      // Calculate min/max heights based on line height
      const computedStyle = window.getComputedStyle(textarea);
      const lineHeight = parseInt(computedStyle.lineHeight) || 20;
      
      const minHeight = minRows * lineHeight + 16; // 16px for padding
      const maxHeight = maxRows ? maxRows * lineHeight + 16 : Infinity;
      
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      setTextareaHeight(`${newHeight}px`);
    }, [autoResize, minRows, maxRows]);

    // Adjust height on value change
    React.useEffect(() => {
      if (autoResize) {
        adjustHeight();
      }
    }, [domProps.value, adjustHeight, autoResize]);

    // Adjust height on mount
    React.useEffect(() => {
      if (autoResize) {
        adjustHeight();
      }
    }, [adjustHeight, autoResize]);

    return (
      <textarea
        className={cn(textareaVariants({ uiVariant, uiSize, uiState }), className)}
        ref={callbackRef}
        style={autoResize ? { height: textareaHeight } : undefined}
        onInput={autoResize ? adjustHeight : undefined}
        {...domProps}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };