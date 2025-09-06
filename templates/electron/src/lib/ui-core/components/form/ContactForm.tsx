'use client';
import { Send } from 'lucide-react';
import * as z from 'zod';
import { 
  ValidatedForm, 
  FormField, 
  FormControlField,
  Input, 
  Textarea, 
  FormLabel
} from '.';
import { Button } from '../ui/button';
import { cn } from '../../utils';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<void> | void;
  title?: string;
  description?: string;
  submitText?: string;
}

export function ContactForm({ 
  className,
  onSubmit,
  title = "Get in Touch",
  description = "Send us a message and we'll get back to you as soon as possible.",
  submitText = "Send Message"
}: ContactFormProps) {
  
  const handleSubmit = async (data: ContactFormData) => {
    if (onSubmit) {
      await onSubmit(data);
    } else {
      // Default behavior - just log for demo
      console.log('Contact form submitted:', data);
      alert('Message sent! (This is just a demo)');
    }
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-card-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <ValidatedForm
        schema={contactFormSchema}
        defaultValues={{
          name: '',
          email: '',
          subject: '',
          message: ''
        }}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <FormControlField name="name">
          {({ value, onChange, onBlur, error }) => (
            <div>
              <FormLabel>Full Name</FormLabel>
              <FormField className="pt-1" required error={error}>
                <Input 
                  placeholder="Your full name" 
                  value={value || ''}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                />
              </FormField>
            </div>
          )}
        </FormControlField>

        <FormControlField name="email">
          {({ value, onChange, onBlur, error }) => (
            <div>
              <FormLabel>Email Address</FormLabel>
              <FormField className="pt-1" required error={error}>
                <Input 
                  type="email" 
                  placeholder="your@email.com" 
                  value={value || ''}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                />
              </FormField>
            </div>
          )}
        </FormControlField>

        <FormControlField name="subject">
          {({ value, onChange, onBlur, error }) => (
            <div>
              <FormLabel>Subject</FormLabel>
              <FormField className="pt-1" required error={error}>
                <Input 
                  placeholder="What's this about?" 
                  value={value || ''}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                />
              </FormField>
            </div>
          )}
        </FormControlField>

        <FormControlField name="message">
          {({ value, onChange, onBlur, error }) => (
            <div>
              <FormLabel>Message</FormLabel>
              <FormField className="pt-1" required error={error}>
                <Textarea
                  placeholder="Tell us more about your inquiry..."
                  autoResize
                  minRows={4}
                  maxRows={8}
                  value={value || ''}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                />
              </FormField>
            </div>
          )}
        </FormControlField>

        <Button type="submit" className="w-full">
          {submitText}
          <Send className="w-4 h-4" />
        </Button>
      </ValidatedForm>
    </div>
  );
}