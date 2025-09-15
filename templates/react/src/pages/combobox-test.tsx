import React, { useState } from 'react';
import { ComboBox, ComboBoxOption } from '../lib/ui-core/components/form/combobox';

// Test data
const fruits: ComboBoxOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape', disabled: true },
  { value: 'honeydew', label: 'Honeydew' },
  { value: 'kiwi', label: 'Kiwi' },
  { value: 'lemon', label: 'Lemon' },
  { value: 'mango', label: 'Mango' },
  { value: 'orange', label: 'Orange' },
  { value: 'papaya', label: 'Papaya' },
  { value: 'quince', label: 'Quince' },
  { value: 'raspberry', label: 'Raspberry' },
  { value: 'strawberry', label: 'Strawberry' },
];

const countries: ComboBoxOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
];

// Custom filter function for demonstration
const customFilter = (inputValue: string, option: ComboBoxOption): boolean => {
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};

export default function ComboBoxTestPage() {
  const [basicValue, setBasicValue] = useState<string | null>(null);
  const [ghostValue, setGhostValue] = useState<string | null>(null);
  const [filledValue, setFilledValue] = useState<string | null>(null);
  const [smallValue, setSmallValue] = useState<string | null>(null);
  const [mediumValue, setMediumValue] = useState<string | null>(null);
  const [largeValue, setLargeValue] = useState<string | null>(null);
  const [defaultStateValue, setDefaultStateValue] = useState<string | null>(null);
  const [errorStateValue, setErrorStateValue] = useState<string | null>(null);
  const [successStateValue, setSuccessStateValue] = useState<string | null>(null);
  const [warningStateValue, setWarningStateValue] = useState<string | null>(null);
  const [clearableValue, setClearableValue] = useState<string | null>('apple');
  const [customFilterValue, setCustomFilterValue] = useState<string | null>(null);
  const [controlledValue, setControlledValue] = useState<string | null>('us');
  const [disabledOptionsValue, setDisabledOptionsValue] = useState<string | null>(null);
  const [nonSearchableValue, setNonSearchableValue] = useState<string | null>(null);
  const [accessibleValue, setAccessibleValue] = useState<string | null>(null);
  const [performanceValue, setPerformanceValue] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fruit: '',
    country: '',
  });

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">ComboBox Component Test</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        
        {/* Basic Variants */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">UI Variants</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Default Variant</label>
            <ComboBox
              options={fruits.slice(0, 5)}
              placeholder="Select a fruit..."
              value={basicValue}
              onValueChange={setBasicValue}
              uiVariant="default"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Ghost Variant</label>
            <ComboBox
              options={fruits.slice(0, 5)}
              placeholder="Select a fruit..."
              value={ghostValue}
              onValueChange={setGhostValue}
              uiVariant="ghost"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Filled Variant</label>
            <ComboBox
              options={fruits.slice(0, 5)}
              placeholder="Select a fruit..."
              value={filledValue}
              onValueChange={setFilledValue}
              uiVariant="filled"
            />
          </div>
        </div>

        {/* Size Variants */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Size Variants</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Small Size</label>
            <ComboBox
              options={countries.slice(0, 4)}
              placeholder="Select country..."
              value={smallValue}
              onValueChange={setSmallValue}
              uiSize="sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Medium Size (Default)</label>
            <ComboBox
              options={countries.slice(0, 4)}
              placeholder="Select country..."
              value={mediumValue}
              onValueChange={setMediumValue}
              uiSize="md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Large Size</label>
            <ComboBox
              options={countries.slice(0, 4)}
              placeholder="Select country..."
              value={largeValue}
              onValueChange={setLargeValue}
              uiSize="lg"
            />
          </div>
        </div>

        {/* State Variants */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">State Variants</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Default State</label>
            <ComboBox
              options={fruits.slice(0, 4)}
              placeholder="Default state..."
              value={defaultStateValue}
              onValueChange={setDefaultStateValue}
              uiState="default"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Error State</label>
            <ComboBox
              options={fruits.slice(0, 4)}
              placeholder="Error state..."
              value={errorStateValue}
              onValueChange={setErrorStateValue}
              uiState="error"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Success State</label>
            <ComboBox
              options={fruits.slice(0, 4)}
              placeholder="Success state..."
              value={successStateValue}
              onValueChange={setSuccessStateValue}
              uiState="success"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Warning State</label>
            <ComboBox
              options={fruits.slice(0, 4)}
              placeholder="Warning state..."
              value={warningStateValue}
              onValueChange={setWarningStateValue}
              uiState="warning"
            />
          </div>
        </div>

        {/* Advanced Features */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Advanced Features</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Clearable (Pre-selected Apple)
            </label>
            <ComboBox
              options={fruits.slice(0, 8)}
              placeholder="Select a fruit..."
              value={clearableValue}
              onValueChange={setClearableValue}
              clearable
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {clearableValue || 'None'}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Custom Filter (Contains match instead of startsWith)
            </label>
            <ComboBox
              options={fruits}
              placeholder="Type to search fruits..."
              value={customFilterValue}
              onValueChange={setCustomFilterValue}
              filterFunction={customFilter}
              emptyMessage="No fruits match your search"
            />
            <p className="text-xs text-gray-500 mt-1">
              Try typing "berry" to see raspberry and strawberry
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Controlled Component
            </label>
            <ComboBox
              options={countries}
              placeholder="Select country..."
              value={controlledValue}
              onValueChange={setControlledValue}
              clearable
            />
            <div className="mt-2 space-x-2">
              <button
                onClick={() => setControlledValue('jp')}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Set Japan
              </button>
              <button
                onClick={() => setControlledValue(null)}
                className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
              >
                Clear
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Selected: {controlledValue || 'None'}
            </p>
          </div>
        </div>

        {/* Disabled and Accessibility */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Disabled & Accessibility</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Disabled Component</label>
            <ComboBox
              options={fruits.slice(0, 4)}
              placeholder="This is disabled..."
              disabled
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              With Disabled Options (Grape is disabled)
            </label>
            <ComboBox
              options={fruits.slice(0, 7)}
              placeholder="Try selecting grape..."
              value={disabledOptionsValue}
              onValueChange={setDisabledOptionsValue}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Non-searchable (Read-only input)
            </label>
            <ComboBox
              options={countries.slice(0, 4)}
              placeholder="Select country..."
              value={nonSearchableValue}
              onValueChange={setNonSearchableValue}
              searchable={false}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              With ARIA Labels
            </label>
            <ComboBox
              options={fruits.slice(0, 5)}
              placeholder="Accessible fruit selection..."
              value={accessibleValue}
              onValueChange={setAccessibleValue}
              aria-label="Choose your favorite fruit"
              aria-describedby="fruit-help"
            />
            <p id="fruit-help" className="text-xs text-gray-500 mt-1">
              This combobox has enhanced accessibility features
            </p>
          </div>
        </div>

        {/* Large Dataset */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Performance Test</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Large Dataset (16 items with scrolling)
            </label>
            <ComboBox
              options={fruits}
              placeholder="Search through all fruits..."
              value={performanceValue}
              onValueChange={setPerformanceValue}
              emptyMessage="No fruits found - try different search terms"
            />
            <p className="text-xs text-gray-500 mt-1">
              Tests scrolling and performance with larger option lists
            </p>
          </div>
        </div>
      </div>

      {/* Form Integration Test */}
      <div className="mt-12 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Form Integration Test</h2>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            alert(`Form data: ${JSON.stringify(formData, null, 2)}`);
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="fruit-select" className="block text-sm font-medium mb-2">
              Favorite Fruit (Required)
            </label>
            <ComboBox
              id="fruit-select"
              name="fruit"
              options={fruits.slice(0, 10)}
              placeholder="Select your favorite fruit..."
              value={formData.fruit}
              onValueChange={(value) => setFormData(prev => ({ ...prev, fruit: value || '' }))}
              required
              aria-describedby="fruit-error"
              uiState={formData.fruit ? "default" : "error"}
            />
            {!formData.fruit && (
              <p id="fruit-error" className="text-xs text-red-500 mt-1">
                Please select a fruit
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="country-select" className="block text-sm font-medium mb-2">
              Country
            </label>
            <ComboBox
              id="country-select"
              name="country"
              options={countries}
              placeholder="Select your country..."
              value={formData.country}
              onValueChange={(value) => setFormData(prev => ({ ...prev, country: value || '' }))}
              clearable
            />
          </div>
          
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Submit Form
          </button>
          
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p className="text-sm font-medium">Current Form Data:</p>
            <pre className="text-xs mt-1">{JSON.stringify(formData, null, 2)}</pre>
          </div>
        </form>
      </div>

      {/* Keyboard Navigation Instructions */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Keyboard Navigation Test</h3>
        <ul className="text-sm space-y-1">
          <li>• <strong>Tab:</strong> Focus the input field</li>
          <li>• <strong>Enter/Space:</strong> Open dropdown when focused</li>
          <li>• <strong>Arrow Up/Down:</strong> Navigate options</li>
          <li>• <strong>Enter:</strong> Select highlighted option</li>
          <li>• <strong>Escape:</strong> Close dropdown</li>
          <li>• <strong>Type:</strong> Filter options (when searchable)</li>
        </ul>
      </div>
    </div>
  );
}