import { useState } from 'react';
import { z } from 'zod';
import { Mail, Lock, User, Search, Eye, EyeOff } from 'lucide-react';
import { Input, Label, FormField, Textarea, Checkbox, CheckboxGroup, RadioGroup, RadioItem, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Form, FormControlField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, ValidatedForm } from '../lib/ui-core/components/form';
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
            Testing Input components with different variants, states, and theme integration
          </p>
          
          {/* Theme Controls */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <div className="flex gap-2">
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
              </button>
            </div>
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
          {/* Basic Input Variants */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Input Variants</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Default</label>
                <Input placeholder="Enter text..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Ghost</label>
                <Input uiVariant="ghost" placeholder="Ghost input..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Filled</label>
                <Input uiVariant="filled" placeholder="Filled input..." />
              </div>
            </div>
          </section>

          {/* Size Variants */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Size Variants</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Small</label>
                <Input uiSize="sm" placeholder="Small input..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Medium (Default)</label>
                <Input uiSize="md" placeholder="Medium input..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Large</label>
                <Input uiSize="lg" placeholder="Large input..." />
              </div>
            </div>
          </section>

          {/* State Variants */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">State Variants</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Error State</label>
                <Input uiState="error" placeholder="Error state..." />
                <p className="text-sm text-destructive">This field has an error</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Success State</label>
                <Input uiState="success" placeholder="Success state..." />
                <p className="text-sm text-green-600">This field is valid</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Warning State</label>
                <Input uiState="warning" placeholder="Warning state..." />
                <p className="text-sm text-yellow-600">This field needs attention</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Disabled</label>
                <Input disabled placeholder="Disabled input..." />
              </div>
            </div>
          </section>

          {/* Icons */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Icons</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Left Icon</label>
                <Input
                  leftIcon={<Mail size={16} />}
                  type="email"
                  placeholder="Enter email..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Right Icon</label>
                <Input
                  rightIcon={<Search size={16} />}
                  placeholder="Search..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Both Icons</label>
                <Input
                  leftIcon={<User size={16} />}
                  rightIcon={<Search size={16} />}
                  placeholder="User search..."
                />
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password Toggle</label>
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
                </div>
              </form>
            </div>
          </section>

          {/* Input Types */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Input Types</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  leftIcon={<Mail size={16} />}
                  placeholder="email@example.com"
                />
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input
                    type="password"
                    leftIcon={<Lock size={16} />}
                    placeholder="Password"
                  />
                </div>
              </form>
              <div className="space-y-2">
                <label className="text-sm font-medium">Number</label>
                <Input
                  type="number"
                  placeholder="Enter number"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tel</label>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">URL</label>
                <Input
                  type="url"
                  placeholder="https://example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input type="date" />
              </div>
            </div>
          </section>

          {/* Label Component Tests */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Label Component</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label required>Required Field</Label>
                <Input placeholder="This field is required..." />
              </div>
              <div className="space-y-2">
                <Label optional>Optional Field</Label>
                <Input placeholder="This field is optional..." />
              </div>
              <div className="space-y-2">
                <Label uiState="error" required>Error State Label</Label>
                <Input uiState="error" placeholder="Error input..." />
              </div>
              <div className="space-y-2">
                <Label uiState="success">Success State Label</Label>
                <Input uiState="success" placeholder="Success input..." />
              </div>
              <div className="space-y-2">
                <Label uiSize="sm">Small Label</Label>
                <Input uiSize="sm" placeholder="Small input..." />
              </div>
              <div className="space-y-2">
                <Label uiSize="lg">Large Label</Label>
                <Input uiSize="lg" placeholder="Large input..." />
              </div>
            </div>
          </section>

          {/* FormField Component Tests */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">FormField Integration</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <form onSubmit={(e) => e.preventDefault()}>
                <FormField
                  label="Email Address"
                  required
                  description="We'll never share your email with anyone else."
                >
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    leftIcon={<Mail size={16} />}
                  />
                </FormField>
              </form>

              <form onSubmit={(e) => e.preventDefault()}>
                <FormField
                  label="Password"
                  required
                  error="Password must be at least 8 characters long"
                >
                  <Input
                    type="password"
                    placeholder="Enter password..."
                    leftIcon={<Lock size={16} />}
                  />
                </FormField>
              </form>

              <form onSubmit={(e) => e.preventDefault()}>
                <FormField
                  label="Full Name"
                  optional
                  description="This will be displayed on your profile"
                  spacing="compact"
                  labelSize="sm"
                >
                  <Input
                    type="text"
                    placeholder="Enter your full name..."
                    leftIcon={<User size={16} />}
                  />
                </FormField>
              </form>

              <form onSubmit={(e) => e.preventDefault()}>
                <FormField
                  label="Search Query"
                  description="Search through all available content"
                  spacing="loose"
                >
                  <Input
                    type="search"
                    placeholder="What are you looking for..."
                    rightIcon={<Search size={16} />}
                  />
                </FormField>
              </form>
            </div>
          </section>

          {/* Textarea Component Tests */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Textarea Component</h2>
            
            {/* Basic Variants */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Textarea Variants</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <FormField label="Default Textarea">
                  <Textarea placeholder="Enter your message..." />
                </FormField>
                <FormField label="Ghost Textarea">
                  <Textarea uiVariant="ghost" placeholder="Ghost textarea..." />
                </FormField>
                <FormField label="Filled Textarea">
                  <Textarea uiVariant="filled" placeholder="Filled textarea..." />
                </FormField>
              </div>
            </div>

            {/* Size Variants */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Size Variants</h3>
              <div className="space-y-4">
                <FormField label="Small Textarea">
                  <Textarea uiSize="sm" placeholder="Small textarea..." />
                </FormField>
                <FormField label="Medium Textarea (Default)">
                  <Textarea uiSize="md" placeholder="Medium textarea..." />
                </FormField>
                <FormField label="Large Textarea">
                  <Textarea uiSize="lg" placeholder="Large textarea..." />
                </FormField>
              </div>
            </div>

            {/* State Variants */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">State Variants</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <FormField 
                  label="Error State"
                  error="Message is too long"
                >
                  <Textarea 
                    placeholder="This has an error..."
                    defaultValue="This message is too long and exceeds the character limit."
                  />
                </FormField>
                <FormField 
                  label="Success State"
                  description="Message looks good!"
                >
                  <Textarea 
                    uiState="success"
                    placeholder="Success state..."
                    defaultValue="This is a perfect message."
                  />
                </FormField>
                <FormField 
                  label="Warning State"
                  description="Check your message length"
                >
                  <Textarea 
                    uiState="warning"
                    placeholder="Warning state..."
                    defaultValue="This message might be too long."
                  />
                </FormField>
                <FormField label="Disabled">
                  <Textarea 
                    disabled 
                    placeholder="Disabled textarea..."
                    defaultValue="This textarea is disabled."
                  />
                </FormField>
              </div>
            </div>

            {/* Auto-resize Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Auto-resize Features</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <FormField 
                  label="Auto-resize (No limits)"
                  description="Type multiple lines to see it grow"
                >
                  <Textarea 
                    autoResize
                    placeholder="Start typing and add new lines to see auto-resize..."
                  />
                </FormField>
                <FormField 
                  label="Auto-resize with Max Rows"
                  description="Maximum 6 rows, then scrolls"
                >
                  <Textarea 
                    autoResize
                    minRows={3}
                    maxRows={6}
                    placeholder="This textarea will grow up to 6 rows, then scroll..."
                  />
                </FormField>
                <FormField 
                  label="Auto-resize with Min Rows"
                  description="Always at least 5 rows tall"
                >
                  <Textarea 
                    autoResize
                    minRows={5}
                    placeholder="This textarea starts with 5 rows minimum..."
                  />
                </FormField>
                <FormField 
                  label="Fixed Height (No auto-resize)"
                  description="Traditional fixed height textarea"
                >
                  <Textarea 
                    placeholder="This textarea has a fixed height and will scroll when content overflows..."
                    className="min-h-[120px]"
                  />
                </FormField>
              </div>
            </div>

            {/* Real-world Examples */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Real-world Examples</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <form onSubmit={(e) => e.preventDefault()}>
                  <FormField 
                    label="Feedback Message"
                    required
                    description="Please share your thoughts (max 500 characters)"
                  >
                    <Textarea 
                      autoResize
                      minRows={4}
                      maxRows={8}
                      placeholder="We'd love to hear your feedback..."
                      maxLength={500}
                    />
                  </FormField>
                </form>
                <form onSubmit={(e) => e.preventDefault()}>
                  <FormField 
                    label="Support Ticket"
                    required
                    description="Describe your issue in detail"
                  >
                    <Textarea 
                      autoResize
                      minRows={3}
                      maxRows={10}
                      placeholder="Please describe the issue you're experiencing..."
                    />
                  </FormField>
                </form>
              </div>
            </div>
          </section>

          {/* Checkbox Component Tests */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Checkbox Component</h2>
            
            {/* Basic Checkboxes */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Basic Checkboxes</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Simple Checkboxes</h4>
                  <Checkbox />
                  <Checkbox defaultChecked />
                  <Checkbox disabled />
                  <Checkbox disabled defaultChecked />
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">With Labels</h4>
                  <Checkbox label="Accept terms" />
                  <Checkbox label="Subscribe to newsletter" defaultChecked />
                  <Checkbox label="Enable notifications" disabled />
                  <Checkbox label="Remember me" disabled defaultChecked />
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">With Descriptions</h4>
                  <Checkbox 
                    label="Marketing emails" 
                    description="Receive updates about new products"
                  />
                  <Checkbox 
                    label="Security alerts" 
                    description="Important account notifications"
                    defaultChecked
                  />
                </div>
              </div>
            </div>

            {/* Size Variants */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Size Variants</h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox uiSize="sm" defaultChecked />
                  <label className="text-sm">Small</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox uiSize="md" defaultChecked />
                  <label className="text-sm">Medium (Default)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox uiSize="lg" defaultChecked />
                  <label className="text-sm">Large</label>
                </div>
              </div>
            </div>

            {/* Variant Styles */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Variant Styles</h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox uiVariant="default" defaultChecked />
                  <label className="text-sm">Default</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox uiVariant="accent" defaultChecked />
                  <label className="text-sm">Accent</label>
                </div>
              </div>
            </div>

            {/* Indeterminate State */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Indeterminate State</h3>
              <div className="space-y-3">
                <Checkbox 
                  indeterminate 
                  label="Select all items" 
                  description="Some items are selected"
                />
                <Checkbox 
                  indeterminate 
                  uiSize="lg"
                  label="Bulk actions" 
                  description="Partially selected"
                />
              </div>
            </div>

            {/* CheckboxGroup Examples */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">CheckboxGroup Component</h3>
              
              {/* Vertical Group */}
              <div className="mb-6">
                <h4 className="font-medium text-sm mb-3">Vertical Group (Default)</h4>
                <FormField label="Select your interests" description="Choose all that apply">
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

              {/* Horizontal Group */}
              <div className="mb-6">
                <h4 className="font-medium text-sm mb-3">Horizontal Group</h4>
                <FormField label="Notification preferences">
                  <CheckboxGroup
                    orientation="horizontal"
                    options={[
                      { value: "email", label: "Email" },
                      { value: "sms", label: "SMS" },
                      { value: "push", label: "Push notifications" },
                      { value: "desktop", label: "Desktop alerts" },
                    ]}
                    defaultValue={["email", "push"]}
                  />
                </FormField>
              </div>

              {/* Different Sizes */}
              <div className="grid gap-6 md:grid-cols-2">
                <FormField label="Small Checkboxes" description="Compact size for dense interfaces">
                  <CheckboxGroup
                    uiSize="sm"
                    options={[
                      { value: "option1", label: "Option 1" },
                      { value: "option2", label: "Option 2" },
                      { value: "option3", label: "Option 3" },
                    ]}
                  />
                </FormField>
                <FormField label="Large Checkboxes" description="Easier to tap on mobile">
                  <CheckboxGroup
                    uiSize="lg"
                    options={[
                      { value: "large1", label: "Large Option 1" },
                      { value: "large2", label: "Large Option 2" },
                      { value: "large3", label: "Large Option 3" },
                    ]}
                  />
                </FormField>
              </div>

              {/* Accent Variant */}
              <div className="mt-6">
                <FormField label="Accent Variant" description="Using accent color theme">
                  <CheckboxGroup
                    uiVariant="accent"
                    options={[
                      { value: "accent1", label: "Accent Option 1", description: "With description" },
                      { value: "accent2", label: "Accent Option 2" },
                      { value: "accent3", label: "Accent Option 3", disabled: true },
                    ]}
                    defaultValue={["accent1"]}
                  />
                </FormField>
              </div>

              {/* Disabled Group */}
              <div className="mt-6">
                <FormField label="Disabled Group" description="All options are disabled">
                  <CheckboxGroup
                    disabled
                    options={[
                      { value: "disabled1", label: "Disabled Option 1" },
                      { value: "disabled2", label: "Disabled Option 2" },
                      { value: "disabled3", label: "Disabled Option 3" },
                    ]}
                    defaultValue={["disabled1", "disabled2"]}
                  />
                </FormField>
              </div>
            </div>

            {/* Real-world Examples */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Real-world Examples</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-4">
                    <FormField label="Account Settings">
                      <CheckboxGroup
                        options={[
                          { value: "2fa", label: "Two-factor authentication", description: "Add an extra layer of security" },
                          { value: "marketing", label: "Marketing emails", description: "Product updates and promotions" },
                          { value: "security", label: "Security notifications", description: "Login alerts and warnings" },
                        ]}
                        defaultValue={["2fa", "security"]}
                      />
                    </FormField>
                  </div>
                </form>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-4">
                    <FormField label="Privacy Settings">
                      <CheckboxGroup
                        options={[
                          { value: "analytics", label: "Analytics cookies", description: "Help us improve the experience" },
                          { value: "advertising", label: "Advertising cookies", description: "Personalized ads" },
                          { value: "functional", label: "Functional cookies", description: "Essential for website function" },
                        ]}
                        defaultValue={["functional"]}
                      />
                    </FormField>
                    <Checkbox 
                      label="I agree to the Terms of Service and Privacy Policy" 
                      uiSize="sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* Radio Component Tests */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Radio Component</h2>
            
            {/* Basic Radio Groups */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Basic Radio Groups</h3>
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
                    options={[
                      { value: "card", label: "Credit Card" },
                      { value: "paypal", label: "PayPal" },
                      { value: "bank", label: "Bank Transfer" },
                    ]}
                    defaultValue="card"
                  />
                </FormField>
              </div>
            </div>

            {/* Size Variants */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Size Variants</h3>
              <div className="space-y-4">
                <FormField label="Small Radio Group" description="Compact size">
                  <RadioGroup
                    uiSize="sm"
                    orientation="horizontal"
                    options={[
                      { value: "sm1", label: "Option 1" },
                      { value: "sm2", label: "Option 2" },
                      { value: "sm3", label: "Option 3" },
                    ]}
                    defaultValue="sm1"
                  />
                </FormField>

                <FormField label="Medium Radio Group (Default)" description="Standard size">
                  <RadioGroup
                    uiSize="md"
                    orientation="horizontal"
                    options={[
                      { value: "md1", label: "Option 1" },
                      { value: "md2", label: "Option 2" },
                      { value: "md3", label: "Option 3" },
                    ]}
                    defaultValue="md2"
                  />
                </FormField>

                <FormField label="Large Radio Group" description="Easier to tap on mobile">
                  <RadioGroup
                    uiSize="lg"
                    orientation="horizontal"
                    options={[
                      { value: "lg1", label: "Option 1" },
                      { value: "lg2", label: "Option 2" },
                      { value: "lg3", label: "Option 3" },
                    ]}
                    defaultValue="lg3"
                  />
                </FormField>
              </div>
            </div>

            {/* Orientation */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Orientation</h3>
              <div className="space-y-6">
                <FormField label="Vertical Radio Group (Default)" description="Stacked vertically">
                  <RadioGroup
                    options={[
                      { value: "v1", label: "Vertical Option 1", description: "First option with description" },
                      { value: "v2", label: "Vertical Option 2", description: "Second option with description" },
                      { value: "v3", label: "Vertical Option 3", description: "Third option with description" },
                    ]}
                    defaultValue="v2"
                  />
                </FormField>

                <FormField label="Horizontal Radio Group" description="Arranged horizontally">
                  <RadioGroup
                    orientation="horizontal"
                    options={[
                      { value: "h1", label: "Horizontal 1" },
                      { value: "h2", label: "Horizontal 2" },
                      { value: "h3", label: "Horizontal 3" },
                    ]}
                    defaultValue="h1"
                  />
                </FormField>
              </div>
            </div>

            {/* Individual RadioItem Usage */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Individual RadioItem Components</h3>
              <FormField label="Custom Radio Layout" description="Using individual RadioItem components">
                <RadioGroup defaultValue="custom2">
                  <RadioItem value="custom1" label="Custom Option 1" />
                  <RadioItem value="custom2" label="Custom Option 2" description="With custom description" />
                  <div className="flex items-center space-x-2">
                    <RadioItem value="custom3" />
                    <div>
                      <label className="text-sm font-medium">Custom Layout Option</label>
                      <p className="text-xs text-muted-foreground">Completely custom layout example</p>
                    </div>
                  </div>
                </RadioGroup>
              </FormField>
            </div>

            {/* Disabled States */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Disabled States</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <FormField label="Disabled Options" description="Some options disabled">
                  <RadioGroup
                    options={[
                      { value: "d1", label: "Available Option" },
                      { value: "d2", label: "Disabled Option", disabled: true },
                      { value: "d3", label: "Another Available Option" },
                      { value: "d4", label: "Another Disabled Option", disabled: true },
                    ]}
                    defaultValue="d1"
                  />
                </FormField>

                <FormField label="Completely Disabled Group" description="All options disabled">
                  <RadioGroup
                    disabled
                    options={[
                      { value: "disabled1", label: "Disabled Option 1" },
                      { value: "disabled2", label: "Disabled Option 2" },
                      { value: "disabled3", label: "Disabled Option 3" },
                    ]}
                    defaultValue="disabled2"
                  />
                </FormField>
              </div>
            </div>

            {/* Real-world Examples */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Real-world Examples</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-6">
                    <FormField 
                      label="Shipping Method" 
                      required
                      description="Choose your preferred shipping option"
                    >
                      <RadioGroup
                        options={[
                          { value: "standard", label: "Standard Shipping", description: "5-7 business days - Free" },
                          { value: "express", label: "Express Shipping", description: "2-3 business days - $9.99" },
                          { value: "overnight", label: "Overnight Shipping", description: "Next business day - $24.99" },
                        ]}
                        defaultValue="standard"
                      />
                    </FormField>

                    <FormField 
                      label="Notification Frequency" 
                      description="How often would you like to receive notifications?"
                    >
                      <RadioGroup
                        options={[
                          { value: "immediately", label: "Immediately", description: "Get notified right away" },
                          { value: "daily", label: "Daily Digest", description: "Once per day summary" },
                          { value: "weekly", label: "Weekly Summary", description: "Weekly roundup" },
                          { value: "never", label: "Never", description: "No notifications" },
                        ]}
                        defaultValue="daily"
                      />
                    </FormField>
                  </div>
                </form>

                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-6">
                    <FormField 
                      label="Experience Level" 
                      required
                      description="What's your programming experience?"
                    >
                      <RadioGroup
                        options={[
                          { value: "beginner", label: "Beginner", description: "Less than 1 year" },
                          { value: "intermediate", label: "Intermediate", description: "1-3 years" },
                          { value: "advanced", label: "Advanced", description: "3-5 years" },
                          { value: "expert", label: "Expert", description: "5+ years" },
                        ]}
                        defaultValue="intermediate"
                      />
                    </FormField>

                    <FormField 
                      label="Theme Preference" 
                      description="Choose your preferred interface theme"
                    >
                      <RadioGroup
                        orientation="horizontal"
                        options={[
                          { value: "light", label: "Light" },
                          { value: "dark", label: "Dark" },
                          { value: "system", label: "System" },
                        ]}
                        defaultValue="system"
                      />
                    </FormField>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* Select Component Tests */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Select Component</h2>
            
            {/* Basic Select */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Basic Select</h3>
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

                <FormField label="Select a language" description="Choose your programming language">
                  <Select defaultValue="typescript">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="rust">Rust</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </div>
            </div>

            {/* Size Variants */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Size Variants</h3>
              <div className="space-y-4">
                <FormField label="Small Select" description="Compact size">
                  <Select>
                    <SelectTrigger uiSize="sm">
                      <SelectValue placeholder="Select option (small)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1" uiSize="sm">Small Option 1</SelectItem>
                      <SelectItem value="option2" uiSize="sm">Small Option 2</SelectItem>
                      <SelectItem value="option3" uiSize="sm">Small Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Medium Select (Default)" description="Standard size">
                  <Select>
                    <SelectTrigger uiSize="md">
                      <SelectValue placeholder="Select option (medium)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1" uiSize="md">Medium Option 1</SelectItem>
                      <SelectItem value="option2" uiSize="md">Medium Option 2</SelectItem>
                      <SelectItem value="option3" uiSize="md">Medium Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Large Select" description="Larger size for better accessibility">
                  <Select>
                    <SelectTrigger uiSize="lg">
                      <SelectValue placeholder="Select option (large)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1" uiSize="lg">Large Option 1</SelectItem>
                      <SelectItem value="option2" uiSize="lg">Large Option 2</SelectItem>
                      <SelectItem value="option3" uiSize="lg">Large Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </div>
            </div>

            {/* Variant Styles */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Variant Styles</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <FormField label="Default Variant">
                  <Select>
                    <SelectTrigger uiVariant="default">
                      <SelectValue placeholder="Default style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Default Option 1</SelectItem>
                      <SelectItem value="option2">Default Option 2</SelectItem>
                      <SelectItem value="option3">Default Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Ghost Variant">
                  <Select>
                    <SelectTrigger uiVariant="ghost">
                      <SelectValue placeholder="Ghost style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Ghost Option 1</SelectItem>
                      <SelectItem value="option2">Ghost Option 2</SelectItem>
                      <SelectItem value="option3">Ghost Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Filled Variant">
                  <Select>
                    <SelectTrigger uiVariant="filled">
                      <SelectValue placeholder="Filled style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Filled Option 1</SelectItem>
                      <SelectItem value="option2">Filled Option 2</SelectItem>
                      <SelectItem value="option3">Filled Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </div>
            </div>

            {/* State Variants */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">State Variants</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <FormField 
                  label="Error State" 
                  error="Please select a valid option"
                >
                  <Select>
                    <SelectTrigger uiState="error">
                      <SelectValue placeholder="Select with error" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField 
                  label="Success State"
                  description="Great choice!"
                >
                  <Select defaultValue="option1">
                    <SelectTrigger uiState="success">
                      <SelectValue placeholder="Select with success" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Good Option 1</SelectItem>
                      <SelectItem value="option2">Good Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField 
                  label="Warning State"
                  description="Please review your selection"
                >
                  <Select>
                    <SelectTrigger uiState="warning">
                      <SelectValue placeholder="Select with warning" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Warning Option 1</SelectItem>
                      <SelectItem value="option2">Warning Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Disabled Select">
                  <Select disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="Disabled select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </div>
            </div>

            {/* Long Lists and Scrolling */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Scrollable Lists</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <FormField label="Many Countries" description="Scrollable list with many options">
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
                      <SelectItem value="cn">China</SelectItem>
                      <SelectItem value="in">India</SelectItem>
                      <SelectItem value="br">Brazil</SelectItem>
                      <SelectItem value="mx">Mexico</SelectItem>
                      <SelectItem value="ar">Argentina</SelectItem>
                      <SelectItem value="cl">Chile</SelectItem>
                      <SelectItem value="nl">Netherlands</SelectItem>
                      <SelectItem value="se">Sweden</SelectItem>
                      <SelectItem value="no">Norway</SelectItem>
                      <SelectItem value="fi">Finland</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Disabled Items" description="Some options are disabled">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available1">Available Option 1</SelectItem>
                      <SelectItem value="disabled1" disabled>Disabled Option 1</SelectItem>
                      <SelectItem value="available2">Available Option 2</SelectItem>
                      <SelectItem value="disabled2" disabled>Disabled Option 2</SelectItem>
                      <SelectItem value="available3">Available Option 3</SelectItem>
                      <SelectItem value="disabled3" disabled>Disabled Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </div>
            </div>

            {/* Real-world Examples */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Real-world Examples</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-4">
                    <FormField 
                      label="Project Template" 
                      required
                      description="Choose your starting template"
                    >
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="react-vite">React + Vite</SelectItem>
                          <SelectItem value="react-nextjs">React + Next.js</SelectItem>
                          <SelectItem value="vue-vite">Vue + Vite</SelectItem>
                          <SelectItem value="vue-nuxt">Vue + Nuxt</SelectItem>
                          <SelectItem value="svelte-kit">SvelteKit</SelectItem>
                          <SelectItem value="astro">Astro</SelectItem>
                          <SelectItem value="electron">Electron</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>

                    <FormField 
                      label="Deployment Target" 
                      description="Where will you deploy this project?"
                    >
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select deployment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vercel">Vercel</SelectItem>
                          <SelectItem value="netlify">Netlify</SelectItem>
                          <SelectItem value="aws">AWS</SelectItem>
                          <SelectItem value="digitalocean">Digital Ocean</SelectItem>
                          <SelectItem value="railway">Railway</SelectItem>
                          <SelectItem value="render">Render</SelectItem>
                          <SelectItem value="self-hosted">Self-hosted</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>
                  </div>
                </form>

                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-4">
                    <FormField 
                      label="Time Zone" 
                      required
                      description="Select your time zone"
                    >
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc-12">(UTC-12:00) Baker Island</SelectItem>
                          <SelectItem value="utc-8">(UTC-08:00) Pacific Time</SelectItem>
                          <SelectItem value="utc-5">(UTC-05:00) Eastern Time</SelectItem>
                          <SelectItem value="utc+0">(UTC+00:00) London</SelectItem>
                          <SelectItem value="utc+1">(UTC+01:00) Paris</SelectItem>
                          <SelectItem value="utc+9">(UTC+09:00) Tokyo</SelectItem>
                          <SelectItem value="utc+10">(UTC+10:00) Sydney</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>

                    <FormField 
                      label="Language Preference" 
                      description="Choose your preferred language"
                    >
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="it">Italiano</SelectItem>
                          <SelectItem value="ja">日本語</SelectItem>
                          <SelectItem value="ko">한국어</SelectItem>
                          <SelectItem value="zh">中文</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* Form Validation with React Hook Form */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Form Validation (React Hook Form + Zod)</h2>
            
            {/* Login Form Example */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Login Form</h3>
              <div className="max-w-md">
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
                    alert(`Login submitted with: ${JSON.stringify(data, null, 2)}`);
                  }}
                  className="p-6 border rounded-lg bg-card"
                >
                  <h4 className="text-lg font-semibold mb-4">Sign In</h4>
                  
                  <FormControlField name="email">
                    {(field) => {
                      const { isDirty, isTouched, ...fieldProps } = field;
                      return (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="Enter your email"
                              leftIcon={<Mail size={16} />}
                              state={field.error ? "error" : "default"}
                              {...fieldProps}
                            />
                          </FormControl>
                          {field.error && <FormMessage>{field.error}</FormMessage>}
                        </FormItem>
                      );
                    }}
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
                            state={field.error ? "error" : "default"}
                            {...field}
                          />
                        </FormControl>
                        {field.error && <FormMessage>{field.error}</FormMessage>}
                      </FormItem>
                    )}
                  </FormControlField>

                  <FormControlField name="rememberMe">
                    {(field) => (
                      <FormItem className="flex items-center space-x-2">
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
              </div>
            </div>

            {/* Registration Form Example */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Registration Form</h3>
              <div className="max-w-2xl">
                <ValidatedForm
                  schema={z.object({
                    firstName: z.string().min(2, 'First name must be at least 2 characters'),
                    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
                    email: z.string().email('Please enter a valid email address'),
                    password: z.string().min(8, 'Password must be at least 8 characters')
                      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
                      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
                      .regex(/[0-9]/, 'Password must contain at least one number'),
                    confirmPassword: z.string(),
                    country: z.string().min(1, 'Please select a country'),
                    agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
                  }).refine(data => data.password === data.confirmPassword, {
                    message: "Passwords don't match",
                    path: ['confirmPassword'],
                  })}
                  defaultValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    country: '',
                    agreeToTerms: false,
                  }}
                  onSubmit={(data) => {
                    alert(`Registration submitted with: ${JSON.stringify(data, null, 2)}`);
                  }}
                  className="p-6 border rounded-lg bg-card"
                  spacing="normal"
                >
                  <h4 className="text-lg font-semibold mb-4">Create Account</h4>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormControlField name="firstName">
                      {(field) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="First name"
                              state={field.error ? "error" : "default"}
                              {...field}
                            />
                          </FormControl>
                          {field.error && <FormMessage>{field.error}</FormMessage>}
                        </FormItem>
                      )}
                    </FormControlField>

                    <FormControlField name="lastName">
                      {(field) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Last name"
                              state={field.error ? "error" : "default"}
                              {...field}
                            />
                          </FormControl>
                          {field.error && <FormMessage>{field.error}</FormMessage>}
                        </FormItem>
                      )}
                    </FormControlField>
                  </div>

                  <FormControlField name="email">
                    {(field) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="Enter your email"
                            leftIcon={<Mail size={16} />}
                            state={field.error ? "error" : "default"}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>We'll never share your email with anyone else.</FormDescription>
                        {field.error && <FormMessage>{field.error}</FormMessage>}
                      </FormItem>
                    )}
                  </FormControlField>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormControlField name="password">
                      {(field) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password"
                              placeholder="Create password"
                              leftIcon={<Lock size={16} />}
                              state={field.error ? "error" : "default"}
                              {...field}
                            />
                          </FormControl>
                          {field.error && <FormMessage>{field.error}</FormMessage>}
                        </FormItem>
                      )}
                    </FormControlField>

                    <FormControlField name="confirmPassword">
                      {(field) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password"
                              placeholder="Confirm password"
                              leftIcon={<Lock size={16} />}
                              state={field.error ? "error" : "default"}
                              {...field}
                            />
                          </FormControl>
                          {field.error && <FormMessage>{field.error}</FormMessage>}
                        </FormItem>
                      )}
                    </FormControlField>
                  </div>

                  <FormControlField name="country">
                    {(field) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger state={field.error ? "error" : "default"}>
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="au">Australia</SelectItem>
                              <SelectItem value="de">Germany</SelectItem>
                              <SelectItem value="fr">France</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        {field.error && <FormMessage>{field.error}</FormMessage>}
                      </FormItem>
                    )}
                  </FormControlField>

                  <FormControlField name="agreeToTerms">
                    {(field) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            label="I agree to the Terms of Service and Privacy Policy"
                          />
                        </FormControl>
                        {field.error && <FormMessage>{field.error}</FormMessage>}
                      </FormItem>
                    )}
                  </FormControlField>

                  <button 
                    type="submit"
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Create Account
                  </button>
                </ValidatedForm>
              </div>
            </div>

            {/* Contact Form with Textarea */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Contact Form</h3>
              <div className="max-w-2xl">
                <ValidatedForm
                  schema={z.object({
                    name: z.string().min(2, 'Name must be at least 2 characters'),
                    email: z.string().email('Please enter a valid email address'),
                    subject: z.string().min(5, 'Subject must be at least 5 characters'),
                    message: z.string().min(10, 'Message must be at least 10 characters'),
                    priority: z.enum(['low', 'medium', 'high']),
                  })}
                  defaultValues={{
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    priority: 'medium',
                  }}
                  onSubmit={(data) => {
                    alert(`Contact form submitted with: ${JSON.stringify(data, null, 2)}`);
                  }}
                  className="p-6 border rounded-lg bg-card"
                >
                  <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormControlField name="name">
                      {(field) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your full name"
                              leftIcon={<User size={16} />}
                              state={field.error ? "error" : "default"}
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
                              state={field.error ? "error" : "default"}
                              {...field}
                            />
                          </FormControl>
                          {field.error && <FormMessage>{field.error}</FormMessage>}
                        </FormItem>
                      )}
                    </FormControlField>
                  </div>

                  <FormControlField name="subject">
                    {(field) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="What's this about?"
                            state={field.error ? "error" : "default"}
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
                            minRows={4}
                            maxRows={8}
                            state={field.error ? "error" : "default"}
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
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Send Message
                  </button>
                </ValidatedForm>
              </div>
            </div>
          </section>

          {/* Focus Testing */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Keyboard Navigation Test</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Tab through these inputs to test focus ring and keyboard navigation:
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <FormField label="Input 1" htmlFor="nav-1">
                <Input id="nav-1" placeholder="Input 1" />
              </FormField>
              <FormField label="Input 2" htmlFor="nav-2">
                <Input id="nav-2" placeholder="Input 2" />
              </FormField>
              <FormField label="Input 3" htmlFor="nav-3">
                <Input id="nav-3" placeholder="Input 3" />
              </FormField>
              <FormField label="Input 4" htmlFor="nav-4">
                <Input id="nav-4" placeholder="Input 4" />
              </FormField>
              <FormField label="Input 5" htmlFor="nav-5">
                <Input id="nav-5" placeholder="Input 5" />
              </FormField>
              <FormField label="Input 6" htmlFor="nav-6">
                <Input id="nav-6" placeholder="Input 6" />
              </FormField>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}