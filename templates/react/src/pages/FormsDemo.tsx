import { useState } from 'react';
import { Mail, Lock, User, Search, Eye, EyeOff } from 'lucide-react';
import { Input } from '../lib/ui-core/components/ui/form';
import { useTheme } from '../lib/ui-core';

export default function FormsDemo() {
  const { theme, setTheme, accent, setAccent, availableThemes } = useTheme();
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
              {availableThemes.map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => setAccent(themeOption)}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    accent === themeOption
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {themeOption}
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
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  leftIcon={<Lock size={16} />}
                  placeholder="Password"
                />
              </div>
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

          {/* Focus Testing */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Keyboard Navigation Test</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Tab through these inputs to test focus ring and keyboard navigation:
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <Input placeholder="Input 1" />
              <Input placeholder="Input 2" />
              <Input placeholder="Input 3" />
              <Input placeholder="Input 4" />
              <Input placeholder="Input 5" />
              <Input placeholder="Input 6" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}