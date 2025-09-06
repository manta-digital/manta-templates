'use client';
import * as React from "react";
import { useForm, FormProvider, UseFormReturn, useFormContext, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const formVariants = cva(
  "space-y-6",
  {
    variants: {
      uiSpacing: {
        compact: "space-y-3",
        normal: "space-y-6", 
        loose: "space-y-8",
      },
    },
    defaultVariants: {
      uiSpacing: "normal",
    },
  }
);

export interface FormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit">,
    VariantProps<typeof formVariants> {
  schema?: z.ZodType<any>;
  defaultValues?: any;
  mode?: 'onSubmit' | 'onChange' | 'onBlur' | 'onTouched' | 'all';
  onSubmit: (data: any) => void | Promise<void>;
  onError?: (errors: any) => void;
  form?: UseFormReturn<any>;
}

export interface FormFieldContextValue {
  name: string;
  formItemId: string;
  formDescriptionId: string;
  formMessageId: string;
}

export interface FormItemContextValue {
  id: string;
}

const FormFieldContext = React.createContext<FormFieldContextValue | undefined>(undefined);
const FormItemContext = React.createContext<FormItemContextValue | undefined>(undefined);

export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { formItemId, formDescriptionId, formMessageId } = fieldContext;
  const id = itemContext?.id || formItemId;

  return {
    id,
    name: fieldContext.name,
    formItemId,
    formDescriptionId,
    formMessageId,
  };
};

function Form({
  schema,
  defaultValues,
  mode = "onSubmit",
  onSubmit,
  onError,
  form: providedForm,
  uiSpacing,
  className,
  children,
  ...props
}: FormProps) {
  // Filter out ui props that shouldn't be passed to DOM
  const { ...domProps } = props;
  const formMethods = useForm({
    resolver: schema ? zodResolver(schema as any) : undefined,
    defaultValues,
    mode,
  });

  const form = providedForm || formMethods;

  const handleSubmit = form.handleSubmit(onSubmit as any, onError);

  return (
    <FormProvider {...(form as any)}>
      <form 
        onSubmit={handleSubmit} 
        className={cn(formVariants({ uiSpacing }), className)}
        {...domProps}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export interface FormControlFieldProps {
  name: string;
  children: (field: {
    value: any;
    onChange: (value: any) => void;
    onBlur: (event?: any) => void;
    name: string;
    error?: string;
    isDirty: boolean;
    isTouched: boolean;
  }) => React.ReactElement;
}

function FormControlField({ name, children }: FormControlFieldProps) {
  const form = useFormContext();
  
  if (!form) {
    throw new Error("FormControlField must be used within a Form component");
  }

  const id = React.useId();
  const formItemId = `${id}-form-item`;
  const formDescriptionId = `${id}-form-item-description`;
  const formMessageId = `${id}-form-item-message`;

  const contextValue: FormFieldContextValue = {
    name,
    formItemId,
    formDescriptionId,
    formMessageId,
  };

  return (
    <FormFieldContext.Provider value={contextValue}>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => 
          children({
            value: field.value,
            onChange: field.onChange,
            onBlur: field.onBlur,
            name: field.name,
            error: fieldState.error?.message,
            isDirty: fieldState.isDirty,
            isTouched: fieldState.isTouched,
          })
        }
      />
    </FormFieldContext.Provider>
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

function FormItem({ className, ...props }: FormItemProps) {
  const id = React.useId();
  
  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

function FormLabel({ className, ...props }: FormLabelProps) {
  const { formItemId } = useFormField();

  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        "pl-[calc(var(--radius)*0.50)]", // Dynamic padding based on radius
        className
      )}
      htmlFor={formItemId}
      {...props}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {}

function FormControl({ ...props }: FormControlProps) {
  const { formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <div
      id={formItemId}
      aria-describedby={`${formDescriptionId} ${formMessageId}`}
      aria-invalid={false}
      {...props}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

function FormDescription({ className, ...props }: FormDescriptionProps) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

function FormMessage({ className, children, ...props }: FormMessageProps) {
  const { formMessageId } = useFormField();

  return (
    <p
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  );
}

// Higher-level wrapper that combines form management with validation
export interface ValidatedFormProps
  extends Omit<FormProps, 'schema'> {
  schema: z.ZodType<any>;
}

function ValidatedForm(props: ValidatedFormProps) {
  return <Form {...props} />;
}

Form.displayName = "Form";
FormControlField.displayName = "FormControlField";
FormItem.displayName = "FormItem";
FormLabel.displayName = "FormLabel";
FormControl.displayName = "FormControl";
FormDescription.displayName = "FormDescription";
FormMessage.displayName = "FormMessage";
ValidatedForm.displayName = "ValidatedForm";

export {
  Form,
  FormControlField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  ValidatedForm,
  formVariants,
  useFormField as useRHFFormField,
};