import { useState } from 'react';
import { Mail, Lock, User, Search, Eye, EyeOff } from 'lucide-react';
import { Input, Label, FormField } from '../lib/ui-core/components/form';
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