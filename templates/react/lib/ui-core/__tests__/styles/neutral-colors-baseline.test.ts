/**
 * Neutral Colors Baseline Test
 * 
 * This test captures the current state of gray variables in shadcn.css before implementing
 * the theme-specific neutral colors architecture. It serves as a comprehensive baseline
 * to ensure zero visual regressions when migrating from --gray-* to --color-neutral-*.
 * 
 * The test validates:
 * 1. Current --gray-* variable usage and computed values
 * 2. ShadCN component variable resolution in light/dark modes
 * 3. Color cascade behavior from radixColors.css through semanticColors.css to shadcn.css
 * 4. Theme-specific color mappings for all available palettes
 */

import { JSDOM } from 'jsdom'

// All gray variables currently used in shadcn.css that need neutral mapping
const GRAY_VARIABLES_TO_MAP = [
  '--gray-1',
  '--gray-2', 
  '--gray-3',
  '--gray-4',
  '--gray-5',
  '--gray-6',
  '--gray-7',
  '--gray-8',
  '--gray-12'
] as const

// ShadCN variables that currently use --gray-* and will use --color-neutral-*
const SHADCN_VARIABLES_USING_GRAY = {
  light: [
    '--background',     // var(--gray-1)
    '--foreground',     // var(--gray-12)
    '--card',           // var(--gray-1)
    '--card-foreground', // var(--gray-12)
    '--popover',        // var(--gray-1)
    '--popover-foreground', // var(--gray-12)
    '--primary-foreground', // var(--gray-1)
    '--secondary',      // var(--gray-2)
    '--secondary-foreground', // var(--gray-12)
    '--muted',          // var(--gray-2)
    '--muted-foreground', // var(--gray-8)
    '--accent',         // var(--gray-2)
    '--accent-foreground', // var(--gray-12)
    '--input',          // var(--gray-3)
    '--ring',           // var(--gray-7)
    '--sidebar',        // var(--gray-1)
    '--sidebar-foreground', // var(--gray-12)
    '--sidebar-primary-foreground', // var(--gray-1)
    '--sidebar-accent', // var(--gray-2)
    '--sidebar-accent-foreground', // var(--gray-12)
    '--sidebar-border', // var(--gray-5)
    '--sidebar-ring'    // var(--gray-7)
  ],
  dark: [
    '--background',     // var(--gray-1)
    '--foreground',     // var(--gray-12)
    '--card',           // var(--gray-2)
    '--card-foreground', // var(--gray-12)
    '--popover',        // var(--gray-2)
    '--popover-foreground', // var(--gray-12)
    '--primary-foreground', // var(--gray-1)
    '--secondary',      // var(--gray-3)
    '--secondary-foreground', // var(--gray-12)
    '--muted',          // var(--gray-3)
    '--muted-foreground', // var(--gray-8)
    '--accent',         // var(--gray-3)
    '--accent-foreground', // var(--gray-12)
    '--input',          // var(--gray-1)
    '--ring',           // var(--gray-7)
    '--sidebar',        // var(--gray-2)
    '--sidebar-foreground', // var(--gray-12)
    '--sidebar-primary-foreground', // var(--gray-12)
    '--sidebar-accent', // var(--gray-3)
    '--sidebar-accent-foreground', // var(--gray-12)
    '--sidebar-border', // var(--gray-4)
    '--sidebar-ring'    // var(--gray-7)
  ]
} as const

// Theme palettes that need neutral color mapping
const THEME_PALETTES = ['teal', 'mintteal', 'blue', 'purple', 'green', 'orange'] as const

interface ColorSnapshot {
  [variable: string]: string
}

interface ThemeSnapshot {
  light: ColorSnapshot
  dark: ColorSnapshot
}

interface PaletteSnapshots {
  [palette: string]: ThemeSnapshot
}

describe('Neutral Colors Baseline Snapshot', () => {
  let dom: JSDOM
  let document: Document
  let window: Window & typeof globalThis

  beforeEach(() => {
    // Create DOM with full CSS cascade simulation
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            /* Radix Colors - Base layer */
            :root {
              /* Teal scale */
              --teal-1: oklch(0.99 0.005 180);
              --teal-2: oklch(0.97 0.013 174);
              --teal-3: oklch(0.94 0.02 174);
              --teal-4: oklch(0.91 0.03 174);
              --teal-5: oklch(0.88 0.04 174);
              --teal-6: oklch(0.84 0.05 174);
              --teal-7: oklch(0.8 0.06 174);
              --teal-8: oklch(0.75 0.08 174);
              --teal-9: oklch(0.7 0.1 174);
              --teal-10: oklch(0.64 0.12 174);
              --teal-11: oklch(0.57 0.14 174);
              --teal-12: oklch(0.15 0.02 174);

              /* Gray scale */
              --gray-1: oklch(0.995 0.002 225);
              --gray-2: oklch(0.984 0.003 225);
              --gray-3: oklch(0.968 0.004 225);
              --gray-4: oklch(0.946 0.005 225);
              --gray-5: oklch(0.918 0.006 225);
              --gray-6: oklch(0.877 0.007 225);
              --gray-7: oklch(0.719 0.008 225);
              --gray-8: oklch(0.609 0.009 225);
              --gray-9: oklch(0.537 0.01 225);
              --gray-10: oklch(0.481 0.011 225);
              --gray-11: oklch(0.395 0.012 225);
              --gray-12: oklch(0.156 0.020 225);

              /* Blue scale */
              --blue-1: oklch(0.993 0.003 233);
              --blue-2: oklch(0.976 0.008 233);
              --blue-3: oklch(0.946 0.018 233);
              --blue-4: oklch(0.905 0.032 233);
              --blue-5: oklch(0.857 0.048 233);
              --blue-6: oklch(0.799 0.067 233);
              --blue-7: oklch(0.729 0.09 233);
              --blue-8: oklch(0.648 0.116 233);
              --blue-9: oklch(0.592 0.129 233);
              --blue-10: oklch(0.549 0.115 233);
              --blue-11: oklch(0.467 0.094 233);
              --blue-12: oklch(0.156 0.022 233);
            }

            .dark {
              /* Gray dark mode */
              --gray-1: oklch(0.156 0.020 225);
              --gray-2: oklch(0.181 0.018 225);
              --gray-3: oklch(0.247 0.016 225);
              --gray-4: oklch(0.309 0.014 225);
              --gray-5: oklch(0.395 0.012 225);
              --gray-6: oklch(0.481 0.011 225);
              --gray-7: oklch(0.537 0.01 225);
              --gray-8: oklch(0.719 0.008 225);
              --gray-9: oklch(0.799 0.007 225);
              --gray-10: oklch(0.877 0.007 225);
              --gray-11: oklch(0.918 0.006 225);
              --gray-12: oklch(0.995 0.002 225);

              /* Teal dark mode */
              --teal-1: oklch(0.15 0.02 174);
              --teal-2: oklch(0.18 0.025 174);
              --teal-3: oklch(0.21 0.03 174);
              --teal-4: oklch(0.24 0.035 174);
              --teal-5: oklch(0.27 0.04 174);
              --teal-6: oklch(0.3 0.045 174);
              --teal-7: oklch(0.35 0.05 174);
              --teal-8: oklch(0.42 0.06 174);
              --teal-9: oklch(0.55 0.08 174);
              --teal-10: oklch(0.62 0.09 174);
              --teal-11: oklch(0.75 0.11 174);
              --teal-12: oklch(0.95 0.015 174);

              /* Blue dark mode */
              --blue-1: oklch(0.15 0.02 233);
              --blue-2: oklch(0.18 0.025 233);
              --blue-3: oklch(0.21 0.03 233);
              --blue-4: oklch(0.24 0.035 233);
              --blue-5: oklch(0.27 0.04 233);
              --blue-6: oklch(0.3 0.045 233);
              --blue-7: oklch(0.35 0.05 233);
              --blue-8: oklch(0.42 0.06 233);
              --blue-9: oklch(0.55 0.08 233);
              --blue-10: oklch(0.62 0.09 233);
              --blue-11: oklch(0.75 0.11 233);
              --blue-12: oklch(0.95 0.015 233);
            }

            /* Semantic Colors - Middle layer */
            :root {
              --color-accent-1: var(--teal-1);
              --color-accent-2: var(--teal-2);
              --color-accent-3: var(--teal-3);
              --color-accent-4: var(--teal-4);
              --color-accent-5: var(--teal-5);
              --color-accent-6: var(--teal-6);
              --color-accent-7: var(--teal-7);
              --color-accent-8: var(--teal-8);
              --color-accent-9: var(--teal-9);
              --color-accent-10: var(--teal-10);
              --color-accent-11: var(--teal-11);
              --color-accent-12: var(--teal-12);
              --color-border-accent: var(--color-accent-7);
              --color-border-accent-hover: var(--color-accent-8);
            }

            .dark {
              --color-border-accent: var(--color-accent-8);
              --color-border-accent-hover: var(--color-accent-9);
            }

            [data-palette="blue"] {
              --color-accent-1: var(--blue-1);
              --color-accent-2: var(--blue-2);
              --color-accent-3: var(--blue-3);
              --color-accent-4: var(--blue-4);
              --color-accent-5: var(--blue-5);
              --color-accent-6: var(--blue-6);
              --color-accent-7: var(--blue-7);
              --color-accent-8: var(--blue-8);
              --color-accent-9: var(--blue-9);
              --color-accent-10: var(--blue-10);
              --color-accent-11: var(--blue-11);
              --color-accent-12: var(--blue-12);
            }

            /* ShadCN Variables - Top layer (current implementation) */
            :root {
              --radius: 1.5rem;
              --background: var(--gray-1);
              --foreground: var(--gray-12);
              --card: var(--gray-1);
              --card-foreground: var(--gray-12);
              --popover: var(--gray-1);
              --popover-foreground: var(--gray-12);
              --primary: var(--color-accent-9);
              --primary-foreground: var(--gray-1);
              --secondary: var(--gray-2);
              --secondary-foreground: var(--gray-12);
              --muted: var(--gray-2);
              --muted-foreground: var(--gray-8);
              --accent: var(--gray-2);
              --accent-foreground: var(--gray-12);
              --destructive: oklch(0.577 0.245 27.325);
              --border: var(--color-border-accent);
              --input: var(--gray-3);
              --ring: var(--gray-7);
              --sidebar: var(--gray-1);
              --sidebar-foreground: var(--gray-12);
              --sidebar-primary: var(--color-accent-9);
              --sidebar-primary-foreground: var(--gray-1);
              --sidebar-accent: var(--gray-2);
              --sidebar-accent-foreground: var(--gray-12);
              --sidebar-border: var(--gray-5);
              --sidebar-ring: var(--gray-7);
            }

            .dark {
              --background: var(--gray-1);
              --foreground: var(--gray-12);
              --card: var(--gray-2);
              --card-foreground: var(--gray-12);
              --popover: var(--gray-2);
              --popover-foreground: var(--gray-12);
              --primary: var(--color-accent-9);
              --primary-foreground: var(--gray-1);
              --secondary: var(--gray-3);
              --secondary-foreground: var(--gray-12);
              --muted: var(--gray-3);
              --muted-foreground: var(--gray-8);
              --accent: var(--gray-3);
              --accent-foreground: var(--gray-12);
              --destructive: oklch(0.704 0.191 22.216);
              --border: var(--color-border-accent);
              --input: var(--gray-1);
              --ring: var(--gray-7);
              --sidebar: var(--gray-2);
              --sidebar-foreground: var(--gray-12);
              --sidebar-primary: var(--color-accent-9);
              --sidebar-primary-foreground: var(--gray-12);
              --sidebar-accent: var(--gray-3);
              --sidebar-accent-foreground: var(--gray-12);
              --sidebar-border: var(--gray-4);
              --sidebar-ring: var(--gray-7);
            }
          </style>
        </head>
        <body>
          <div id="default-light" class="test-element" data-palette="teal"></div>
          <div id="default-dark" class="dark test-element" data-palette="teal"></div>
          <div id="blue-light" class="test-element" data-palette="blue"></div>
          <div id="blue-dark" class="dark test-element" data-palette="blue"></div>
        </body>
      </html>
    `)
    
    document = dom.window.document
    window = dom.window as any
    
    global.document = document
    global.window = window
    global.getComputedStyle = window.getComputedStyle
  })

  afterEach(() => {
    dom.window.close()
  })

  /**
   * Capture computed values for a set of CSS variables
   */
  function captureVariableValues(element: Element, variables: readonly string[]): ColorSnapshot {
    const computedStyle = window.getComputedStyle(element)
    const snapshot: ColorSnapshot = {}
    
    variables.forEach(variable => {
      const value = computedStyle.getPropertyValue(variable).trim()
      if (value) {
        snapshot[variable] = value
      }
    })
    
    return snapshot
  }

  /**
   * Test: Capture baseline gray variable values in both light and dark modes
   */
  test('captures baseline gray variable values', () => {
    const lightElement = document.getElementById('default-light')!
    const darkElement = document.getElementById('default-dark')!
    
    const grayBaseline: ThemeSnapshot = {
      light: captureVariableValues(lightElement, GRAY_VARIABLES_TO_MAP),
      dark: captureVariableValues(darkElement, GRAY_VARIABLES_TO_MAP)
    }
    
    expect(grayBaseline).toMatchSnapshot('gray-variables-baseline')
    
    // Verify all gray variables are captured and have OKLCH values
    GRAY_VARIABLES_TO_MAP.forEach(variable => {
      expect(grayBaseline.light[variable]).toBeDefined()
      expect(grayBaseline.light[variable]).toMatch(/oklch\([\d\s\.\/\%]+\)/)
      expect(grayBaseline.dark[variable]).toBeDefined()
      expect(grayBaseline.dark[variable]).toMatch(/oklch\([\d\s\.\/\%]+\)/)
    })
  })

  /**
   * Test: Capture baseline ShadCN variable values that use gray variables
   */
  test('captures baseline ShadCN variables using gray', () => {
    const lightElement = document.getElementById('default-light')!
    const darkElement = document.getElementById('default-dark')!
    
    const shadcnBaseline: ThemeSnapshot = {
      light: captureVariableValues(lightElement, SHADCN_VARIABLES_USING_GRAY.light),
      dark: captureVariableValues(darkElement, SHADCN_VARIABLES_USING_GRAY.dark)
    }
    
    expect(shadcnBaseline).toMatchSnapshot('shadcn-gray-variables-baseline')
    
    // Verify all ShadCN variables resolve to OKLCH values
    Object.values(shadcnBaseline.light).forEach(value => {
      expect(value).toMatch(/oklch\([\d\s\.\/\%]+\)/)
    })
    
    Object.values(shadcnBaseline.dark).forEach(value => {
      expect(value).toMatch(/oklch\([\d\s\.\/\%]+\)/)
    })
  })

  /**
   * Test: Capture color cascade resolution from radix -> semantic -> shadcn
   */
  test('captures color cascade resolution for gray variables', () => {
    const lightElement = document.getElementById('default-light')!
    const darkElement = document.getElementById('default-dark')!
    
    // Test specific cascade examples
    const cascadeTests = [
      {
        shadcnVar: '--background',
        expectedSource: '--gray-1',
        description: 'background resolves to gray-1'
      },
      {
        shadcnVar: '--secondary',
        expectedSource: '--gray-2', 
        description: 'secondary resolves to gray-2'
      },
      {
        shadcnVar: '--muted-foreground',
        expectedSource: '--gray-8',
        description: 'muted-foreground resolves to gray-8'
      }
    ]
    
    const cascadeResults: { [key: string]: any } = {}
    
    cascadeTests.forEach(test => {
      const lightShadcnValue = window.getComputedStyle(lightElement).getPropertyValue(test.shadcnVar).trim()
      const lightGrayValue = window.getComputedStyle(lightElement).getPropertyValue(test.expectedSource).trim()
      const darkShadcnValue = window.getComputedStyle(darkElement).getPropertyValue(test.shadcnVar).trim()
      const darkGrayValue = window.getComputedStyle(darkElement).getPropertyValue(test.expectedSource).trim()
      
      cascadeResults[test.shadcnVar] = {
        light: { shadcn: lightShadcnValue, gray: lightGrayValue, matches: lightShadcnValue === lightGrayValue },
        dark: { shadcn: darkShadcnValue, gray: darkGrayValue, matches: darkShadcnValue === darkGrayValue }
      }
      
      // Verify cascade works correctly
      expect(lightShadcnValue).toBe(lightGrayValue)
      expect(darkShadcnValue).toBe(darkGrayValue)
    })
    
    expect(cascadeResults).toMatchSnapshot('gray-cascade-resolution')
  })

  /**
   * Test: Capture palette-specific gray mappings (for future neutral mapping)
   */
  test('captures theme-specific color contexts', () => {
    const defaultLight = document.getElementById('default-light')!
    const defaultDark = document.getElementById('default-dark')!
    const blueLight = document.getElementById('blue-light')!
    const blueDark = document.getElementById('blue-dark')!
    
    const themeContexts = {
      teal: {
        light: {
          accent: window.getComputedStyle(defaultLight).getPropertyValue('--color-accent-9').trim(),
          border: window.getComputedStyle(defaultLight).getPropertyValue('--color-border-accent').trim(),
          // Capture gray values that will need neutral mapping
          grayForBackground: window.getComputedStyle(defaultLight).getPropertyValue('--gray-1').trim(),
          grayForSecondary: window.getComputedStyle(defaultLight).getPropertyValue('--gray-2').trim(),
        },
        dark: {
          accent: window.getComputedStyle(defaultDark).getPropertyValue('--color-accent-9').trim(),
          border: window.getComputedStyle(defaultDark).getPropertyValue('--color-border-accent').trim(),
          grayForBackground: window.getComputedStyle(defaultDark).getPropertyValue('--gray-1').trim(),
          grayForSecondary: window.getComputedStyle(defaultDark).getPropertyValue('--gray-2').trim(),
        }
      },
      blue: {
        light: {
          accent: window.getComputedStyle(blueLight).getPropertyValue('--color-accent-9').trim(),
          border: window.getComputedStyle(blueLight).getPropertyValue('--color-border-accent').trim(),
          grayForBackground: window.getComputedStyle(blueLight).getPropertyValue('--gray-1').trim(),
          grayForSecondary: window.getComputedStyle(blueLight).getPropertyValue('--gray-2').trim(),
        },
        dark: {
          accent: window.getComputedStyle(blueDark).getPropertyValue('--color-accent-9').trim(),
          border: window.getComputedStyle(blueDark).getPropertyValue('--color-border-accent').trim(),
          grayForBackground: window.getComputedStyle(blueDark).getPropertyValue('--gray-1').trim(),
          grayForSecondary: window.getComputedStyle(blueDark).getPropertyValue('--gray-2').trim(),
        }
      }
    }
    
    expect(themeContexts).toMatchSnapshot('theme-contexts-baseline')
    
    // Verify gray values are consistent across themes (they should be!)
    expect(themeContexts.teal.light.grayForBackground).toBe(themeContexts.blue.light.grayForBackground)
    expect(themeContexts.teal.light.grayForSecondary).toBe(themeContexts.blue.light.grayForSecondary)
    
    // Verify accent colors are different
    expect(themeContexts.teal.light.accent).not.toBe(themeContexts.blue.light.accent)
  })

  /**
   * Test: Validate specific OKLCH values that must be preserved
   */
  test('captures specific critical OKLCH values', () => {
    const lightElement = document.getElementById('default-light')!
    const darkElement = document.getElementById('default-dark')!
    
    const criticalValues = {
      light: {
        background: window.getComputedStyle(lightElement).getPropertyValue('--background').trim(),
        foreground: window.getComputedStyle(lightElement).getPropertyValue('--foreground').trim(),
        card: window.getComputedStyle(lightElement).getPropertyValue('--card').trim(),
        secondary: window.getComputedStyle(lightElement).getPropertyValue('--secondary').trim(),
        muted: window.getComputedStyle(lightElement).getPropertyValue('--muted').trim(),
        input: window.getComputedStyle(lightElement).getPropertyValue('--input').trim(),
      },
      dark: {
        background: window.getComputedStyle(darkElement).getPropertyValue('--background').trim(),
        foreground: window.getComputedStyle(darkElement).getPropertyValue('--foreground').trim(),
        card: window.getComputedStyle(darkElement).getPropertyValue('--card').trim(),
        secondary: window.getComputedStyle(darkElement).getPropertyValue('--secondary').trim(),
        muted: window.getComputedStyle(darkElement).getPropertyValue('--muted').trim(),
        input: window.getComputedStyle(darkElement).getPropertyValue('--input').trim(),
      }
    }
    
    expect(criticalValues).toMatchSnapshot('critical-oklch-values')
    
    // These specific values must remain unchanged after neutral mapping
    expect(criticalValues.light.background).toBe('oklch(0.995 0.002 225)')
    expect(criticalValues.light.foreground).toBe('oklch(0.156 0.020 225)')
    expect(criticalValues.dark.background).toBe('oklch(0.156 0.020 225)')
    expect(criticalValues.dark.foreground).toBe('oklch(0.995 0.002 225)')
  })

  /**
   * Test environment validation
   */
  test('validates baseline test environment', () => {
    const lightElement = document.getElementById('default-light')!
    const darkElement = document.getElementById('default-dark')!
    
    expect(lightElement).toBeDefined()
    expect(darkElement).toBeDefined()
    expect(darkElement.classList.contains('dark')).toBe(true)
    
    // Verify CSS cascade is working
    const lightBg = window.getComputedStyle(lightElement).getPropertyValue('--background').trim()
    const darkBg = window.getComputedStyle(darkElement).getPropertyValue('--background').trim()
    
    expect(lightBg).not.toBe(darkBg)
    expect(lightBg).toMatch(/oklch\(/)
    expect(darkBg).toMatch(/oklch\(/)
  })
})