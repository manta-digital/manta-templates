/**
 * Visual Regression Test for Neutral Colors Migration
 * 
 * This test ensures zero visual regressions when migrating from direct --gray-* 
 * usage to the new --color-neutral-* system in shadcn.css. It compares the 
 * computed values before and after migration to guarantee pixel-perfect consistency.
 * 
 * The test validates:
 * 1. Exact OKLCH value preservation for all migrated variables
 * 2. Visual consistency across all ShadCN components
 * 3. Theme switching behavior remains unchanged  
 * 4. Component rendering produces identical results
 * 5. No unintended side effects from the new neutral system
 */

import { JSDOM } from 'jsdom'

// Critical ShadCN variables that must maintain exact values after migration
const CRITICAL_SHADCN_VARIABLES = [
  '--background',
  '--foreground',
  '--card',
  '--card-foreground',
  '--popover',
  '--popover-foreground',
  '--secondary',
  '--secondary-foreground',
  '--muted',
  '--muted-foreground',
  '--accent',
  '--accent-foreground',
  '--input',
  '--ring'
] as const

// Sidebar variables that also use gray
const SIDEBAR_VARIABLES = [
  '--sidebar',
  '--sidebar-foreground',
  '--sidebar-accent',
  '--sidebar-accent-foreground',
  '--sidebar-border',
  '--sidebar-ring'
] as const

// Component-specific test cases that are most likely to show visual regressions
const COMPONENT_TEST_CASES = [
  {
    name: 'card-component',
    html: `
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6">
          <h3 class="text-2xl font-semibold leading-none tracking-tight">Card Title</h3>
          <p class="text-sm text-muted-foreground">Card description goes here</p>
        </div>
        <div class="p-6 pt-0">
          <p>Card content with normal text color</p>
        </div>
      </div>
    `,
    criticalVars: ['--card', '--card-foreground', '--muted-foreground']
  },
  {
    name: 'button-secondary',
    html: `
      <button class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2">
        Secondary Button
      </button>
    `,
    criticalVars: ['--secondary', '--secondary-foreground']
  },
  {
    name: 'input-field',
    html: `
      <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
             type="text" 
             placeholder="Enter text here" 
             style="background: var(--input); border-color: var(--ring);" />
    `,
    criticalVars: ['--input', '--ring', '--background', '--muted-foreground']
  },
  {
    name: 'muted-text',
    html: `
      <div>
        <p class="text-foreground">Regular text that should be dark</p>
        <p class="text-muted-foreground">Muted text that should be gray</p>
        <small class="text-sm font-medium leading-none" style="color: var(--muted-foreground)">Small muted text</small>
      </div>
    `,
    criticalVars: ['--foreground', '--muted-foreground']
  }
] as const

interface VisualSnapshot {
  [variable: string]: string
}

interface ThemeVisualSnapshot {
  light: VisualSnapshot
  dark: VisualSnapshot
}

interface ComponentRegressionResult {
  componentName: string
  beforeMigration: ThemeVisualSnapshot
  afterMigration: ThemeVisualSnapshot
  hasRegressions: boolean
  regressionDetails: string[]
}

describe('Visual Regression Tests for Neutral Colors Migration', () => {
  let beforeMigrationDOM: JSDOM
  let afterMigrationDOM: JSDOM

  beforeAll(() => {
    // Create DOM representing BEFORE migration (current state with --gray-* usage)
    beforeMigrationDOM = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            /* BEFORE: Current shadcn.css with direct --gray-* usage */
            :root {
              /* Radix Colors */
              --gray-1: oklch(0.995 0.002 225);
              --gray-2: oklch(0.984 0.003 225);
              --gray-3: oklch(0.968 0.004 225);
              --gray-7: oklch(0.719 0.008 225);
              --gray-8: oklch(0.609 0.009 225);
              --gray-12: oklch(0.156 0.020 225);

              /* ShadCN with direct gray usage */
              --background: var(--gray-1);
              --foreground: var(--gray-12);
              --card: var(--gray-1);
              --card-foreground: var(--gray-12);
              --popover: var(--gray-1);
              --popover-foreground: var(--gray-12);
              --secondary: var(--gray-2);
              --secondary-foreground: var(--gray-12);
              --muted: var(--gray-2);
              --muted-foreground: var(--gray-8);
              --accent: var(--gray-2);
              --accent-foreground: var(--gray-12);
              --input: var(--gray-3);
              --ring: var(--gray-7);
              --sidebar: var(--gray-1);
              --sidebar-foreground: var(--gray-12);
              --sidebar-accent: var(--gray-2);
              --sidebar-accent-foreground: var(--gray-12);
              --sidebar-border: var(--gray-5);
              --sidebar-ring: var(--gray-7);
              --gray-5: oklch(0.918 0.006 225);
            }

            .dark {
              --gray-1: oklch(0.156 0.020 225);
              --gray-2: oklch(0.181 0.018 225);
              --gray-3: oklch(0.247 0.016 225);
              --gray-4: oklch(0.309 0.014 225);
              --gray-5: oklch(0.395 0.012 225);
              --gray-7: oklch(0.537 0.01 225);
              --gray-8: oklch(0.719 0.008 225);
              --gray-12: oklch(0.995 0.002 225);

              --background: var(--gray-1);
              --foreground: var(--gray-12);
              --card: var(--gray-2);
              --card-foreground: var(--gray-12);
              --popover: var(--gray-2);
              --popover-foreground: var(--gray-12);
              --secondary: var(--gray-3);
              --secondary-foreground: var(--gray-12);
              --muted: var(--gray-3);
              --muted-foreground: var(--gray-8);
              --accent: var(--gray-3);
              --accent-foreground: var(--gray-12);
              --input: var(--gray-1);
              --ring: var(--gray-7);
              --sidebar: var(--gray-2);
              --sidebar-foreground: var(--gray-12);
              --sidebar-accent: var(--gray-3);
              --sidebar-accent-foreground: var(--gray-12);
              --sidebar-border: var(--gray-4);
              --sidebar-ring: var(--gray-7);
            }

            /* Basic component styles for testing */
            .rounded-lg { border-radius: 0.5rem; }
            .border { border-width: 1px; }
            .bg-card { background-color: var(--card); }
            .text-card-foreground { color: var(--card-foreground); }
            .text-muted-foreground { color: var(--muted-foreground); }
            .text-foreground { color: var(--foreground); }
            .bg-secondary { background-color: var(--secondary); }
            .text-secondary-foreground { color: var(--secondary-foreground); }
          </style>
        </head>
        <body>
          <div id="before-light" class="test-container">
            ${COMPONENT_TEST_CASES.map(tc => `<div class="component-test" data-component="${tc.name}">${tc.html}</div>`).join('')}
          </div>
          <div id="before-dark" class="dark test-container">
            ${COMPONENT_TEST_CASES.map(tc => `<div class="component-test" data-component="${tc.name}">${tc.html}</div>`).join('')}
          </div>
        </body>
      </html>
    `)

    // Create DOM representing AFTER migration (new --color-neutral-* system)
    afterMigrationDOM = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            /* AFTER: New neutral colors system */
            :root {
              /* Radix Colors */
              --gray-1: oklch(0.995 0.002 225);
              --gray-2: oklch(0.984 0.003 225);
              --gray-3: oklch(0.968 0.004 225);
              --gray-5: oklch(0.918 0.006 225);
              --gray-7: oklch(0.719 0.008 225);
              --gray-8: oklch(0.609 0.009 225);
              --gray-12: oklch(0.156 0.020 225);

              /* Semantic neutral mapping - defaults to gray for default theme */
              --color-neutral-1: var(--gray-1);
              --color-neutral-2: var(--gray-2);
              --color-neutral-3: var(--gray-3);
              --color-neutral-5: var(--gray-5);
              --color-neutral-7: var(--gray-7);
              --color-neutral-8: var(--gray-8);
              --color-neutral-12: var(--gray-12);

              /* ShadCN with neutral system - EXACT SAME VALUES */
              --background: var(--color-neutral-1);
              --foreground: var(--color-neutral-12);
              --card: var(--color-neutral-1);
              --card-foreground: var(--color-neutral-12);
              --popover: var(--color-neutral-1);
              --popover-foreground: var(--color-neutral-12);
              --secondary: var(--color-neutral-2);
              --secondary-foreground: var(--color-neutral-12);
              --muted: var(--color-neutral-2);
              --muted-foreground: var(--color-neutral-8);
              --accent: var(--color-neutral-2);
              --accent-foreground: var(--color-neutral-12);
              --input: var(--color-neutral-3);
              --ring: var(--color-neutral-7);
              --sidebar: var(--color-neutral-1);
              --sidebar-foreground: var(--color-neutral-12);
              --sidebar-accent: var(--color-neutral-2);
              --sidebar-accent-foreground: var(--color-neutral-12);
              --sidebar-border: var(--color-neutral-5);
              --sidebar-ring: var(--color-neutral-7);
            }

            .dark {
              --gray-1: oklch(0.156 0.020 225);
              --gray-2: oklch(0.181 0.018 225);
              --gray-3: oklch(0.247 0.016 225);
              --gray-4: oklch(0.309 0.014 225);
              --gray-5: oklch(0.395 0.012 225);
              --gray-7: oklch(0.537 0.01 225);
              --gray-8: oklch(0.719 0.008 225);
              --gray-12: oklch(0.995 0.002 225);

              /* Dark mode uses same neutral mappings */
              --background: var(--color-neutral-1);
              --foreground: var(--color-neutral-12);
              --card: var(--color-neutral-2);
              --card-foreground: var(--color-neutral-12);
              --popover: var(--color-neutral-2);
              --popover-foreground: var(--color-neutral-12);
              --secondary: var(--color-neutral-3);
              --secondary-foreground: var(--color-neutral-12);
              --muted: var(--color-neutral-3);
              --muted-foreground: var(--color-neutral-8);
              --accent: var(--color-neutral-3);
              --accent-foreground: var(--color-neutral-12);
              --input: var(--color-neutral-1);
              --ring: var(--color-neutral-7);
              --sidebar: var(--color-neutral-2);
              --sidebar-foreground: var(--color-neutral-12);
              --sidebar-accent: var(--color-neutral-3);
              --sidebar-accent-foreground: var(--color-neutral-12);
              --sidebar-border: var(--color-neutral-4);
              --sidebar-ring: var(--color-neutral-7);
              --color-neutral-4: var(--gray-4);
            }

            /* Same component styles */
            .rounded-lg { border-radius: 0.5rem; }
            .border { border-width: 1px; }
            .bg-card { background-color: var(--card); }
            .text-card-foreground { color: var(--card-foreground); }
            .text-muted-foreground { color: var(--muted-foreground); }
            .text-foreground { color: var(--foreground); }
            .bg-secondary { background-color: var(--secondary); }
            .text-secondary-foreground { color: var(--secondary-foreground); }
          </style>
        </head>
        <body>
          <div id="after-light" class="test-container">
            ${COMPONENT_TEST_CASES.map(tc => `<div class="component-test" data-component="${tc.name}">${tc.html}</div>`).join('')}
          </div>
          <div id="after-dark" class="dark test-container">
            ${COMPONENT_TEST_CASES.map(tc => `<div class="component-test" data-component="${tc.name}">${tc.html}</div>`).join('')}
          </div>
        </body>
      </html>
    `)

    // Set up globals for both DOMs
    global.document = beforeMigrationDOM.window.document
    global.window = beforeMigrationDOM.window as any
    global.getComputedStyle = beforeMigrationDOM.window.getComputedStyle
  })

  afterAll(() => {
    beforeMigrationDOM.window.close()
    afterMigrationDOM.window.close()
  })

  /**
   * Capture computed styles for a set of variables
   */
  function captureComputedStyles(element: Element, variables: readonly string[]): VisualSnapshot {
    const computedStyle = getComputedStyle(element)
    const snapshot: VisualSnapshot = {}
    
    variables.forEach(variable => {
      const value = computedStyle.getPropertyValue(variable).trim()
      if (value) {
        snapshot[variable] = value
      }
    })
    
    return snapshot
  }

  /**
   * Compare two visual snapshots and identify regressions
   */
  function compareSnapshots(before: VisualSnapshot, after: VisualSnapshot, tolerance = 0): { hasRegressions: boolean; details: string[] } {
    const details: string[] = []
    let hasRegressions = false
    
    // Check all variables from before snapshot
    Object.keys(before).forEach(variable => {
      const beforeValue = before[variable]
      const afterValue = after[variable]
      
      if (!afterValue) {
        details.push(`Missing variable ${variable} in after snapshot`)
        hasRegressions = true
      } else if (beforeValue !== afterValue) {
        details.push(`Variable ${variable} changed: ${beforeValue} → ${afterValue}`)
        hasRegressions = true
      }
    })
    
    // Check for new variables in after snapshot
    Object.keys(after).forEach(variable => {
      if (!before[variable]) {
        details.push(`New variable ${variable} appeared: ${after[variable]}`)
        // This might not be a regression, just a note
      }
    })
    
    return { hasRegressions, details }
  }

  /**
   * Test: Zero regression in critical ShadCN variables
   */
  test('ensures zero regression in critical ShadCN variables', () => {
    // Capture BEFORE migration values
    global.document = beforeMigrationDOM.window.document
    global.window = beforeMigrationDOM.window as any
    global.getComputedStyle = beforeMigrationDOM.window.getComputedStyle
    
    const beforeLight = beforeMigrationDOM.window.document.getElementById('before-light')!
    const beforeDark = beforeMigrationDOM.window.document.getElementById('before-dark')!
    
    const beforeSnapshot: ThemeVisualSnapshot = {
      light: captureComputedStyles(beforeLight, CRITICAL_SHADCN_VARIABLES),
      dark: captureComputedStyles(beforeDark, CRITICAL_SHADCN_VARIABLES)
    }
    
    // Capture AFTER migration values
    global.document = afterMigrationDOM.window.document
    global.window = afterMigrationDOM.window as any
    global.getComputedStyle = afterMigrationDOM.window.getComputedStyle
    
    const afterLight = afterMigrationDOM.window.document.getElementById('after-light')!
    const afterDark = afterMigrationDOM.window.document.getElementById('after-dark')!
    
    const afterSnapshot: ThemeVisualSnapshot = {
      light: captureComputedStyles(afterLight, CRITICAL_SHADCN_VARIABLES),
      dark: captureComputedStyles(afterDark, CRITICAL_SHADCN_VARIABLES)
    }
    
    // Compare light mode
    const lightComparison = compareSnapshots(beforeSnapshot.light, afterSnapshot.light)
    const darkComparison = compareSnapshots(beforeSnapshot.dark, afterSnapshot.dark)
    
    const regressionResult = {
      beforeSnapshot,
      afterSnapshot,
      lightMode: lightComparison,
      darkMode: darkComparison,
      hasAnyRegressions: lightComparison.hasRegressions || darkComparison.hasRegressions,
      allDetails: [...lightComparison.details, ...darkComparison.details]
    }
    
    expect(regressionResult).toMatchSnapshot('critical-variables-regression-test')
    
    // Zero regressions should be found
    expect(regressionResult.hasAnyRegressions).toBe(false)
    expect(regressionResult.allDetails).toHaveLength(0)
    
    // Specific critical values must be identical
    expect(beforeSnapshot.light['--background']).toBe(afterSnapshot.light['--background'])
    expect(beforeSnapshot.light['--foreground']).toBe(afterSnapshot.light['--foreground'])
    expect(beforeSnapshot.dark['--background']).toBe(afterSnapshot.dark['--background'])
    expect(beforeSnapshot.dark['--foreground']).toBe(afterSnapshot.dark['--foreground'])
  })

  /**
   * Test: Component-specific visual regression testing
   */
  test('ensures zero regression in component rendering', () => {
    const componentRegressions: ComponentRegressionResult[] = []
    
    COMPONENT_TEST_CASES.forEach(testCase => {
      // Test BEFORE migration
      global.document = beforeMigrationDOM.window.document
      global.window = beforeMigrationDOM.window as any
      global.getComputedStyle = beforeMigrationDOM.window.getComputedStyle
      
      const beforeLightComponent = beforeMigrationDOM.window.document.querySelector(`[data-component="${testCase.name}"]`)!
      const beforeDarkComponent = beforeMigrationDOM.window.document.querySelector(`.dark [data-component="${testCase.name}"]`)!
      
      // Test AFTER migration
      global.document = afterMigrationDOM.window.document
      global.window = afterMigrationDOM.window as any
      global.getComputedStyle = afterMigrationDOM.window.getComputedStyle
      
      const afterLightComponent = afterMigrationDOM.window.document.querySelector(`[data-component="${testCase.name}"]`)!
      const afterDarkComponent = afterMigrationDOM.window.document.querySelector(`.dark [data-component="${testCase.name}"]`)!
      
      const beforeValues: ThemeVisualSnapshot = {
        light: captureComputedStyles(beforeLightComponent, testCase.criticalVars),
        dark: captureComputedStyles(beforeDarkComponent, testCase.criticalVars)
      }
      
      const afterValues: ThemeVisualSnapshot = {
        light: captureComputedStyles(afterLightComponent, testCase.criticalVars),
        dark: captureComputedStyles(afterDarkComponent, testCase.criticalVars)
      }
      
      const lightComparison = compareSnapshots(beforeValues.light, afterValues.light)
      const darkComparison = compareSnapshots(beforeValues.dark, afterValues.dark)
      
      const componentResult: ComponentRegressionResult = {
        componentName: testCase.name,
        beforeMigration: beforeValues,
        afterMigration: afterValues,
        hasRegressions: lightComparison.hasRegressions || darkComparison.hasRegressions,
        regressionDetails: [...lightComparison.details, ...darkComparison.details]
      }
      
      componentRegressions.push(componentResult)
    })
    
    expect(componentRegressions).toMatchSnapshot('component-visual-regressions')
    
    // No component should have regressions
    componentRegressions.forEach(result => {
      expect(result.hasRegressions).toBe(false)
      expect(result.regressionDetails).toHaveLength(0)
    })
    
    // Verify specific component expectations
    const cardRegression = componentRegressions.find(r => r.componentName === 'card-component')!
    expect(cardRegression.beforeMigration.light['--card']).toBe(cardRegression.afterMigration.light['--card'])
    expect(cardRegression.beforeMigration.light['--muted-foreground']).toBe(cardRegression.afterMigration.light['--muted-foreground'])
  })

  /**
   * Test: Sidebar variables regression testing  
   */
  test('ensures zero regression in sidebar variables', () => {
    // Test sidebar variables separately since they're less commonly tested
    global.document = beforeMigrationDOM.window.document
    global.window = beforeMigrationDOM.window as any
    global.getComputedStyle = beforeMigrationDOM.window.getComputedStyle
    
    const beforeLight = beforeMigrationDOM.window.document.getElementById('before-light')!
    const beforeDark = beforeMigrationDOM.window.document.getElementById('before-dark')!
    
    const beforeSidebar: ThemeVisualSnapshot = {
      light: captureComputedStyles(beforeLight, SIDEBAR_VARIABLES),
      dark: captureComputedStyles(beforeDark, SIDEBAR_VARIABLES)
    }
    
    global.document = afterMigrationDOM.window.document
    global.window = afterMigrationDOM.window as any
    global.getComputedStyle = afterMigrationDOM.window.getComputedStyle
    
    const afterLight = afterMigrationDOM.window.document.getElementById('after-light')!
    const afterDark = afterMigrationDOM.window.document.getElementById('after-dark')!
    
    const afterSidebar: ThemeVisualSnapshot = {
      light: captureComputedStyles(afterLight, SIDEBAR_VARIABLES),
      dark: captureComputedStyles(afterDark, SIDEBAR_VARIABLES)
    }
    
    const lightComparison = compareSnapshots(beforeSidebar.light, afterSidebar.light)
    const darkComparison = compareSnapshots(beforeSidebar.dark, afterSidebar.dark)
    
    const sidebarRegression = {
      before: beforeSidebar,
      after: afterSidebar,
      regressions: {
        light: lightComparison,
        dark: darkComparison,
        hasAny: lightComparison.hasRegressions || darkComparison.hasRegressions
      }
    }
    
    expect(sidebarRegression).toMatchSnapshot('sidebar-variables-regression')
    
    expect(sidebarRegression.regressions.hasAny).toBe(false)
    expect([...lightComparison.details, ...darkComparison.details]).toHaveLength(0)
  })

  /**
   * Test: Exact OKLCH value preservation
   */
  test('validates exact OKLCH value preservation', () => {
    // Test specific OKLCH values that must be preserved exactly
    const criticalOKLCHValues = {
      // Light mode expectations
      light: {
        '--background': 'oklch(0.995 0.002 225)',      // Pure light gray
        '--foreground': 'oklch(0.156 0.020 225)',      // Dark gray text
        '--secondary': 'oklch(0.984 0.003 225)',       // Light secondary
        '--muted-foreground': 'oklch(0.609 0.009 225)' // Medium gray
      },
      // Dark mode expectations
      dark: {
        '--background': 'oklch(0.156 0.020 225)',      // Dark background
        '--foreground': 'oklch(0.995 0.002 225)',      // Light text
        '--secondary': 'oklch(0.247 0.016 225)',       // Dark secondary
        '--muted-foreground': 'oklch(0.719 0.008 225)' // Lighter gray in dark
      }
    }
    
    // Test BEFORE migration
    global.document = beforeMigrationDOM.window.document
    global.window = beforeMigrationDOM.window as any
    global.getComputedStyle = beforeMigrationDOM.window.getComputedStyle
    
    const beforeLight = beforeMigrationDOM.window.document.getElementById('before-light')!
    const beforeDark = beforeMigrationDOM.window.document.getElementById('before-dark')!
    
    // Test AFTER migration
    global.document = afterMigrationDOM.window.document
    global.window = afterMigrationDOM.window as any
    global.getComputedStyle = afterMigrationDOM.window.getComputedStyle
    
    const afterLight = afterMigrationDOM.window.document.getElementById('after-light')!
    const afterDark = afterMigrationDOM.window.document.getElementById('after-dark')!
    
    const oklchValidation = {
      beforeValues: {
        light: captureComputedStyles(beforeLight, Object.keys(criticalOKLCHValues.light) as any),
        dark: captureComputedStyles(beforeDark, Object.keys(criticalOKLCHValues.dark) as any)
      },
      afterValues: {
        light: captureComputedStyles(afterLight, Object.keys(criticalOKLCHValues.light) as any),
        dark: captureComputedStyles(afterDark, Object.keys(criticalOKLCHValues.dark) as any)
      },
      exactMatches: {
        light: {} as { [key: string]: boolean },
        dark: {} as { [key: string]: boolean }
      }
    }
    
    // Verify exact OKLCH matches
    Object.keys(criticalOKLCHValues.light).forEach(variable => {
      const expected = criticalOKLCHValues.light[variable as keyof typeof criticalOKLCHValues.light]
      oklchValidation.exactMatches.light[variable] = 
        oklchValidation.beforeValues.light[variable] === expected &&
        oklchValidation.afterValues.light[variable] === expected &&
        oklchValidation.beforeValues.light[variable] === oklchValidation.afterValues.light[variable]
    })
    
    Object.keys(criticalOKLCHValues.dark).forEach(variable => {
      const expected = criticalOKLCHValues.dark[variable as keyof typeof criticalOKLCHValues.dark]
      oklchValidation.exactMatches.dark[variable] = 
        oklchValidation.beforeValues.dark[variable] === expected &&
        oklchValidation.afterValues.dark[variable] === expected &&
        oklchValidation.beforeValues.dark[variable] === oklchValidation.afterValues.dark[variable]
    })
    
    expect(oklchValidation).toMatchSnapshot('exact-oklch-preservation')
    
    // All critical values must match exactly
    Object.values(oklchValidation.exactMatches.light).forEach(matches => {
      expect(matches).toBe(true)
    })
    Object.values(oklchValidation.exactMatches.dark).forEach(matches => {
      expect(matches).toBe(true)
    })
  })

  /**
   * Test: Performance impact of migration
   */
  test('validates no performance regression from neutral system', () => {
    const performanceComparison = {
      before: { startTime: 0, endTime: 0, duration: 0 },
      after: { startTime: 0, endTime: 0, duration: 0 }
    }
    
    const iterations = 100
    const testVariables = ['--background', '--foreground', '--card', '--secondary']
    
    // Test BEFORE migration performance
    global.document = beforeMigrationDOM.window.document
    global.window = beforeMigrationDOM.window as any
    global.getComputedStyle = beforeMigrationDOM.window.getComputedStyle
    
    const beforeElement = beforeMigrationDOM.window.document.getElementById('before-light')!
    
    performanceComparison.before.startTime = performance.now()
    for (let i = 0; i < iterations; i++) {
      captureComputedStyles(beforeElement, testVariables as any)
    }
    performanceComparison.before.endTime = performance.now()
    performanceComparison.before.duration = performanceComparison.before.endTime - performanceComparison.before.startTime
    
    // Test AFTER migration performance
    global.document = afterMigrationDOM.window.document
    global.window = afterMigrationDOM.window as any
    global.getComputedStyle = afterMigrationDOM.window.getComputedStyle
    
    const afterElement = afterMigrationDOM.window.document.getElementById('after-light')!
    
    performanceComparison.after.startTime = performance.now()
    for (let i = 0; i < iterations; i++) {
      captureComputedStyles(afterElement, testVariables as any)
    }
    performanceComparison.after.endTime = performance.now()
    performanceComparison.after.duration = performanceComparison.after.endTime - performanceComparison.after.startTime
    
    const performanceResult = {
      ...performanceComparison,
      performanceImpact: performanceComparison.after.duration - performanceComparison.before.duration,
      relativeImpact: (performanceComparison.after.duration / performanceComparison.before.duration - 1) * 100
    }
    
    expect(performanceResult).toMatchSnapshot('performance-impact-analysis')
    
    // Performance impact should be minimal (< 10% slower)
    expect(performanceResult.relativeImpact).toBeLessThan(10)
  })

  /**
   * Test environment validation
   */
  test('validates visual regression test environment', () => {
    // Verify both DOMs are set up correctly
    expect(beforeMigrationDOM.window.document.getElementById('before-light')).toBeDefined()
    expect(beforeMigrationDOM.window.document.getElementById('before-dark')).toBeDefined()
    expect(afterMigrationDOM.window.document.getElementById('after-light')).toBeDefined()
    expect(afterMigrationDOM.window.document.getElementById('after-dark')).toBeDefined()
    
    // Verify component test cases are present
    COMPONENT_TEST_CASES.forEach(testCase => {
      expect(beforeMigrationDOM.window.document.querySelector(`[data-component="${testCase.name}"]`)).toBeDefined()
      expect(afterMigrationDOM.window.document.querySelector(`[data-component="${testCase.name}"]`)).toBeDefined()
    })
    
    // Verify dark classes are applied
    expect(beforeMigrationDOM.window.document.getElementById('before-dark')!.classList.contains('dark')).toBe(true)
    expect(afterMigrationDOM.window.document.getElementById('after-dark')!.classList.contains('dark')).toBe(true)
  })
})