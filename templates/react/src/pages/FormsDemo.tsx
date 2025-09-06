import { useState } from 'react';
import { z } from 'zod';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { 
  Input, 
  FormField, 
  Textarea, 
  Checkbox, 
  CheckboxGroup, 
  RadioGroup, 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue, 
  FormControlField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage, 
  ValidatedForm 
} from '../lib/ui-core/components/form';
import { useTheme } from '../lib/ui-core';
import { useAvailableThemes } from '../lib/ui-core/hooks/useAvailableThemes';

export default function FormsDemo() {
  const { theme, setTheme, accent, setAccent } = useTheme();
  const availableThemes = useAvailableThemes();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Forms Demo</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Core form components with theme integration
          </p>
          
          {/* Theme Controls */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
            <div className="flex gap-2 flex-wrap">
              {availableThemes.map((themeInfo) => (
                <button
                  key={themeInfo.id}
                  onClick={() => setAccent(themeInfo.id)}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    accent === themeInfo.id
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {themeInfo.displayName}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {/* Input Components */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Input Components</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Basic Input" description="Standard text input">
                <Input placeholder="Enter text..." />
              </FormField>

              <FormField label="Input with Icon" description="Icon support">
                <Input
                  leftIcon={<Mail size={16} />}
                  type="email"
                  placeholder="Enter email..."
                />
              </FormField>

              <FormField label="Password Input" description="With toggle visibility">
                <Input
                  leftIcon={<Lock size={16} />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password..."
                />
              </FormField>

              <FormField label="Error State" error="This field is required">
                <Input uiState="error" placeholder="Error input..." />
              </FormField>
            </div>
          </section>

          {/* Textarea */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Textarea</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Basic Textarea" description="Standard textarea">
                <Textarea placeholder="Enter your message..." />
              </FormField>

              <FormField label="Auto-resize Textarea" description="Grows with content">
                <Textarea 
                  autoResize
                  minRows={3}
                  maxRows={6}
                  placeholder="This textarea will auto-resize..."
                />
              </FormField>
            </div>
          </section>

          {/* Checkboxes */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Checkboxes</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Individual Checkboxes</h3>
                <Checkbox label="Accept terms" />
                <Checkbox label="Subscribe to newsletter" defaultChecked />
                <Checkbox 
                  label="Marketing emails" 
                  description="Receive updates about new products"
                />
                <Checkbox indeterminate label="Select all items" />
              </div>

              <FormField label="Checkbox Group" description="Multiple selections">
                <CheckboxGroup
                  options={[
                    { value: "frontend", label: "Frontend Development", description: "React, Vue, Angular" },
                    { value: "backend", label: "Backend Development", description: "Node.js, Python, Java" },
                    { value: "mobile", label: "Mobile Development", description: "React Native, Flutter" },
                    { value: "devops", label: "DevOps", description: "CI/CD, Docker, Kubernetes" },
                  ]}
                  defaultValue={["frontend", "backend"]}
                />
              </FormField>
            </div>
          </section>

          {/* Radio Buttons */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Radio Buttons</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Choose your plan" description="Select one option">
                <RadioGroup
                  options={[
                    { value: "free", label: "Free", description: "Basic features only" },
                    { value: "pro", label: "Pro", description: "$10/month - Full features" },
                    { value: "enterprise", label: "Enterprise", description: "Custom pricing" },
                  ]}
                  defaultValue="free"
                />
              </FormField>

              <FormField label="Payment method" description="How would you like to pay?">
                <RadioGroup
                  uiOrientation="horizontal"
                  options={[
                    { value: "card", label: "Credit Card" },
                    { value: "paypal", label: "PayPal" },
                    { value: "bank", label: "Bank Transfer" },
                  ]}
                  defaultValue="card"
                />
              </FormField>
            </div>
          </section>

          {/* Select */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Select</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Choose a framework" description="Select your preferred framework">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="vue">Vue</SelectItem>
                    <SelectItem value="angular">Angular</SelectItem>
                    <SelectItem value="svelte">Svelte</SelectItem>
                    <SelectItem value="solid">SolidJS</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Select Country" description="Many options with scrolling">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="it">Italy</SelectItem>
                    <SelectItem value="es">Spain</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="kr">South Korea</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>
          </section>

          {/* Form Validation Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Form Validation</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {/* Login Form */}
              <ValidatedForm
                schema={z.object({
                  email: z.string().email('Please enter a valid email address'),
                  password: z.string().min(6, 'Password must be at least 6 characters'),
                  rememberMe: z.boolean().optional(),
                })}
                defaultValues={{
                  email: '',
                  password: '',
                  rememberMe: false,
                }}
                onSubmit={(data) => {
                  alert(`Login submitted: ${JSON.stringify(data, null, 2)}`);
                }}
                className="p-6 border rounded-lg bg-card"
              >
                <h3 className="text-lg font-semibold mb-4">Login Form</h3>
                
                <FormControlField name="email">
                  {(field) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="Enter your email"
                          leftIcon={<Mail size={16} />}
                          uiState={field.error ? "error" : "default"}
                          {...field}
                        />
                      </FormControl>
                      {field.error && <FormMessage>{field.error}</FormMessage>}
                    </FormItem>
                  )}
                </FormControlField>

                <FormControlField name="password">
                  {(field) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password"
                          placeholder="Enter your password"
                          leftIcon={<Lock size={16} />}
                          uiState={field.error ? "error" : "default"}
                          {...field}
                        />
                      </FormControl>
                      {field.error && <FormMessage>{field.error}</FormMessage>}
                    </FormItem>
                  )}
                </FormControlField>

                <FormControlField name="rememberMe">
                  {(field) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          label="Remember me"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                </FormControlField>

                <button 
                  type="submit"
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Sign In
                </button>
              </ValidatedForm>

              {/* Contact Form */}
              <ValidatedForm
                schema={z.object({
                  name: z.string().min(2, 'Name must be at least 2 characters'),
                  email: z.string().email('Please enter a valid email address'),
                  priority: z.enum(['low', 'medium', 'high']),
                  message: z.string().min(10, 'Message must be at least 10 characters'),
                })}
                defaultValues={{
                  name: '',
                  email: '',
                  priority: 'medium',
                  message: '',
                }}
                onSubmit={(data) => {
                  alert(`Contact form submitted: ${JSON.stringify(data, null, 2)}`);
                }}
                className="p-6 border rounded-lg bg-card"
              >
                <h3 className="text-lg font-semibold mb-4">Contact Form</h3>
                
                <FormControlField name="name">
                  {(field) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your full name"
                          leftIcon={<User size={16} />}
                          uiState={field.error ? "error" : "default"}
                          {...field}
                        />
                      </FormControl>
                      {field.error && <FormMessage>{field.error}</FormMessage>}
                    </FormItem>
                  )}
                </FormControlField>

                <FormControlField name="email">
                  {(field) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="your.email@example.com"
                          leftIcon={<Mail size={16} />}
                          uiState={field.error ? "error" : "default"}
                          {...field}
                        />
                      </FormControl>
                      {field.error && <FormMessage>{field.error}</FormMessage>}
                    </FormItem>
                  )}
                </FormControlField>

                <FormControlField name="priority">
                  {(field) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      {field.error && <FormMessage>{field.error}</FormMessage>}
                    </FormItem>
                  )}
                </FormControlField>

                <FormControlField name="message">
                  {(field) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us more about your inquiry..."
                          autoResize
                          minRows={3}
                          maxRows={6}
                          uiState={field.error ? "error" : "default"}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Please provide as much detail as possible.</FormDescription>
                      {field.error && <FormMessage>{field.error}</FormMessage>}
                    </FormItem>
                  )}
                </FormControlField>

                <button 
                  type="submit"
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </ValidatedForm>
            </div>
          </section>

          {/* Keyboard Navigation Test */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Keyboard Navigation Test</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Tab through these inputs to test focus ring and keyboard navigation:
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <FormField label="Input 1">
                <Input placeholder="Input 1" />
              </FormField>
              <FormField label="Input 2">
                <Input placeholder="Input 2" />
              </FormField>
              <FormField label="Input 3">
                <Input placeholder="Input 3" />
              </FormField>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}