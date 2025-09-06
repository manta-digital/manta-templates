import { useState } from 'react';
import { Mail, Lock, User, Search, Eye, EyeOff } from 'lucide-react';
import { Input, Label, FormField, Textarea, Checkbox, CheckboxGroup } from '../lib/ui-core/components/form';
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
                <Input variant="ghost" placeholder="Ghost input..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Filled</label>
                <Input variant="filled" placeholder="Filled input..." />
              </div>
            </div>
          </section>

          {/* Size Variants */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Size Variants</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Small</label>
                <Input size="sm" placeholder="Small input..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Medium (Default)</label>
                <Input size="md" placeholder="Medium input..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Large</label>
                <Input size="lg" placeholder="Large input..." />
              </div>
            </div>
          </section>

          {/* State Variants */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">State Variants</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Error State</label>
                <Input state="error" placeholder="Error state..." />
                <p className="text-sm text-destructive">This field has an error</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Success State</label>
                <Input state="success" placeholder="Success state..." />
                <p className="text-sm text-green-600">This field is valid</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Warning State</label>
                <Input state="warning" placeholder="Warning state..." />
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
                <Label state="error" required>Error State Label</Label>
                <Input state="error" placeholder="Error input..." />
              </div>
              <div className="space-y-2">
                <Label state="success">Success State Label</Label>
                <Input state="success" placeholder="Success input..." />
              </div>
              <div className="space-y-2">
                <Label size="sm">Small Label</Label>
                <Input size="sm" placeholder="Small input..." />
              </div>
              <div className="space-y-2">
                <Label size="lg">Large Label</Label>
                <Input size="lg" placeholder="Large input..." />
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
                  <Textarea variant="ghost" placeholder="Ghost textarea..." />
                </FormField>
                <FormField label="Filled Textarea">
                  <Textarea variant="filled" placeholder="Filled textarea..." />
                </FormField>
              </div>
            </div>

            {/* Size Variants */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Size Variants</h3>
              <div className="space-y-4">
                <FormField label="Small Textarea">
                  <Textarea size="sm" placeholder="Small textarea..." />
                </FormField>
                <FormField label="Medium Textarea (Default)">
                  <Textarea size="md" placeholder="Medium textarea..." />
                </FormField>
                <FormField label="Large Textarea">
                  <Textarea size="lg" placeholder="Large textarea..." />
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
                    state="success"
                    placeholder="Success state..."
                    defaultValue="This is a perfect message."
                  />
                </FormField>
                <FormField 
                  label="Warning State"
                  description="Check your message length"
                >
                  <Textarea 
                    state="warning"
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
                  <Checkbox size="sm" defaultChecked />
                  <label className="text-sm">Small</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox size="md" defaultChecked />
                  <label className="text-sm">Medium (Default)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox size="lg" defaultChecked />
                  <label className="text-sm">Large</label>
                </div>
              </div>
            </div>

            {/* Variant Styles */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Variant Styles</h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox variant="default" defaultChecked />
                  <label className="text-sm">Default</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox variant="accent" defaultChecked />
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
                  size="lg"
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
                    size="sm"
                    options={[
                      { value: "option1", label: "Option 1" },
                      { value: "option2", label: "Option 2" },
                      { value: "option3", label: "Option 3" },
                    ]}
                  />
                </FormField>
                <FormField label="Large Checkboxes" description="Easier to tap on mobile">
                  <CheckboxGroup
                    size="lg"
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
                    variant="accent"
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
                      size="sm"
                    />
                  </div>
                </form>
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