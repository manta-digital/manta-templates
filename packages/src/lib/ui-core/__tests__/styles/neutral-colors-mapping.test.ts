/**
 * Neutral Colors Mapping Validation Test
 * 
 * This test validates the proposed theme-specific neutral colors architecture.
 * It tests the new --color-neutral-* variables and ensures they resolve correctly
 * for each theme palette, providing theme-aware neutral colors.
 * 
 * The test validates:
 * 1. --color-neutral-* variables resolve to appropriate theme-tinted neutral colors
 * 2. Theme-specific neutral scales (e.g., --green-n1, --blue-n2) work correctly  
 * 3. Semantic mapping from theme-neutral to --color-neutral-* is correct
 * 4. ShadCN variables using --color-neutral-* maintain visual consistency
 * 5. Fallback behavior to gray works when theme-neutrals are unavailable
 */

import { JSDOM } from 'jsdom'

// Neutral color steps that will be added for each theme
const NEUTRAL_STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const

// Semantic neutral mappings that will replace gray usage
const SEMANTIC_NEUTRAL_MAPPINGS = {
  light: {
    '--color-neutral-1': '--gray-1',      // Default fallback -> will be theme-n1
    '--color-neutral-2': '--gray-2',
    '--color-neutral-3': '--gray-3', 
    '--color-neutral-4': '--gray-4',
    '--color-neutral-5': '--gray-5',
    '--color-neutral-6': '--gray-6',
    '--color-neutral-7': '--gray-7',
    '--color-neutral-8': '--gray-8',
    '--color-neutral-9': '--gray-9',
    '--color-neutral-10': '--gray-10',
    '--color-neutral-11': '--gray-11',
    '--color-neutral-12': '--gray-12'
  },
  dark: {
    // Same mappings - the underlying theme-n* values handle light/dark
    '--color-neutral-1': '--gray-1',
    '--color-neutral-2': '--gray-2',
    '--color-neutral-3': '--gray-3',
    '--color-neutral-4': '--gray-4',
    '--color-neutral-5': '--gray-5',
    '--color-neutral-6': '--gray-6',
    '--color-neutral-7': '--gray-7',
    '--color-neutral-8': '--gray-8',
    '--color-neutral-9': '--gray-9',
    '--color-neutral-10': '--gray-10',
    '--color-neutral-11': '--gray-11',
    '--color-neutral-12': '--gray-12'
  }
} as const

// Theme palettes that should get neutral color scales
const TEST_PALETTES = ['teal', 'blue', 'green'] as const

interface NeutralColorSnapshot {
  [variable: string]: string
}

interface ThemeNeutralSnapshot {
  light: NeutralColorSnapshot
  dark: NeutralColorSnapshot
}

describe('Neutral Colors Mapping Validation', () => {
  let dom: JSDOM
  let document: Document
  let window: Window & typeof globalThis

  beforeEach(() => {
    // Create DOM with proposed neutral colors architecture
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            /* Base Radix Colors with new neutral scales */
            :root {
              /* Teal theme with neutral scale */
              --teal-1: oklch(0.99 0.005 180);
              --teal-2: oklch(0.97 0.013 174);
              --teal-3: oklch(0.94 0.02 174);
              --teal-9: oklch(0.7 0.1 174);
              --teal-12: oklch(0.15 0.02 174);
              
              /* Teal neutral scale - slightly tinted grays */
              --teal-n1: oklch(0.995 0.002 174);      /* Very subtle teal tint */
              --teal-n2: oklch(0.984 0.003 174);
              --teal-n3: oklch(0.968 0.004 174);
              --teal-n4: oklch(0.946 0.005 174);
              --teal-n5: oklch(0.918 0.006 174);
              --teal-n6: oklch(0.877 0.007 174);
              --teal-n7: oklch(0.719 0.008 174);
              --teal-n8: oklch(0.609 0.009 174);
              --teal-n9: oklch(0.537 0.01 174);
              --teal-n10: oklch(0.481 0.011 174);
              --teal-n11: oklch(0.395 0.012 174);
              --teal-n12: oklch(0.156 0.020 174);

              /* Blue theme with neutral scale */
              --blue-1: oklch(0.993 0.003 233);
              --blue-2: oklch(0.976 0.008 233);
              --blue-3: oklch(0.946 0.018 233);
              --blue-9: oklch(0.592 0.129 233);
              --blue-12: oklch(0.156 0.022 233);

              /* Blue neutral scale - slightly blue-tinted grays */
              --blue-n1: oklch(0.995 0.002 233);
              --blue-n2: oklch(0.984 0.003 233);
              --blue-n3: oklch(0.968 0.004 233);
              --blue-n4: oklch(0.946 0.005 233);
              --blue-n5: oklch(0.918 0.006 233);
              --blue-n6: oklch(0.877 0.007 233);
              --blue-n7: oklch(0.719 0.008 233);
              --blue-n8: oklch(0.609 0.009 233);
              --blue-n9: oklch(0.537 0.01 233);
              --blue-n10: oklch(0.481 0.011 233);
              --blue-n11: oklch(0.395 0.012 233);
              --blue-n12: oklch(0.156 0.020 233);

              /* Green neutral scale */
              --green-n1: oklch(0.995 0.002 130);
              --green-n2: oklch(0.984 0.003 130);
              --green-n3: oklch(0.968 0.004 130);
              --green-n7: oklch(0.719 0.008 130);
              --green-n8: oklch(0.609 0.009 130);
              --green-n12: oklch(0.156 0.020 130);

              /* Standard gray scale (fallback) */
              --gray-1: oklch(0.995 0.002 225);
              --gray-2: oklch(0.984 0.003 225);
              --gray-3: oklch(0.968 0.004 225);
              --gray-7: oklch(0.719 0.008 225);
              --gray-8: oklch(0.609 0.009 225);
              --gray-12: oklch(0.156 0.020 225);
            }

            .dark {
              /* Teal neutral dark mode */
              --teal-n1: oklch(0.156 0.020 174);
              --teal-n2: oklch(0.181 0.018 174);
              --teal-n3: oklch(0.247 0.016 174);
              --teal-n7: oklch(0.537 0.01 174);
              --teal-n8: oklch(0.719 0.008 174);
              --teal-n12: oklch(0.995 0.002 174);

              /* Blue neutral dark mode */
              --blue-n1: oklch(0.156 0.020 233);
              --blue-n2: oklch(0.181 0.018 233);
              --blue-n3: oklch(0.247 0.016 233);
              --blue-n7: oklch(0.537 0.01 233);
              --blue-n8: oklch(0.719 0.008 233);
              --blue-n12: oklch(0.995 0.002 233);

              /* Green neutral dark mode */
              --green-n1: oklch(0.156 0.020 130);
              --green-n2: oklch(0.181 0.018 130);
              --green-n3: oklch(0.247 0.016 130);
              --green-n7: oklch(0.537 0.01 130);
              --green-n8: oklch(0.719 0.008 130);
              --green-n12: oklch(0.995 0.002 130);

              /* Gray dark mode */
              --gray-1: oklch(0.156 0.020 225);
              --gray-2: oklch(0.181 0.018 225);
              --gray-3: oklch(0.247 0.016 225);
              --gray-7: oklch(0.537 0.01 225);
              --gray-8: oklch(0.719 0.008 225);
              --gray-12: oklch(0.995 0.002 225);
            }

            /* Semantic Neutral Mappings - DEFAULT (uses gray) */
            :root {
              --color-neutral-1: var(--gray-1);
              --color-neutral-2: var(--gray-2);
              --color-neutral-3: var(--gray-3);
              --color-neutral-7: var(--gray-7);
              --color-neutral-8: var(--gray-8);
              --color-neutral-12: var(--gray-12);
            }

            /* Theme-specific neutral mappings */
            [data-palette="teal"] {
              --color-neutral-1: var(--teal-n1);
              --color-neutral-2: var(--teal-n2);
              --color-neutral-3: var(--teal-n3);
              --color-neutral-7: var(--teal-n7);
              --color-neutral-8: var(--teal-n8);
              --color-neutral-12: var(--teal-n12);
            }

            [data-palette="blue"] {
              --color-neutral-1: var(--blue-n1);
              --color-neutral-2: var(--blue-n2);
              --color-neutral-3: var(--blue-n3);
              --color-neutral-7: var(--blue-n7);
              --color-neutral-8: var(--blue-n8);
              --color-neutral-12: var(--blue-n12);
            }

            [data-palette="green"] {
              --color-neutral-1: var(--green-n1);
              --color-neutral-2: var(--green-n2);
              --color-neutral-3: var(--green-n3);
              --color-neutral-7: var(--green-n7);
              --color-neutral-8: var(--green-n8);
              --color-neutral-12: var(--green-n12);
            }

            /* ShadCN Variables using new neutral system */
            :root {
              --background: var(--color-neutral-1);
              --foreground: var(--color-neutral-12);
              --card: var(--color-neutral-1);
              --card-foreground: var(--color-neutral-12);
              --secondary: var(--color-neutral-2);
              --secondary-foreground: var(--color-neutral-12);
              --muted: var(--color-neutral-2);
              --muted-foreground: var(--color-neutral-8);
              --input: var(--color-neutral-3);
              --ring: var(--color-neutral-7);
            }

            .dark {
              /* Dark mode uses same neutral mappings - the n* scales handle light/dark */
              --card: var(--color-neutral-2);  /* Slightly different in dark mode */
              --secondary: var(--color-neutral-3);
              --muted: var(--color-neutral-3);
              --input: var(--color-neutral-1);  /* Dark input is more like background */
            }
          </style>
        </head>
        <body>
          <!-- Default theme (uses gray fallback) -->
          <div id="default-light" class="test-element"></div>
          <div id="default-dark" class="dark test-element"></div>
          
          <!-- Teal theme (uses teal-n* neutrals) -->
          <div id="teal-light" class="test-element" data-palette="teal"></div>
          <div id="teal-dark" class="dark test-element" data-palette="teal"></div>
          
          <!-- Blue theme (uses blue-n* neutrals) -->
          <div id="blue-light" class="test-element" data-palette="blue"></div>
          <div id="blue-dark" class="dark test-element" data-palette="blue"></div>
          
          <!-- Green theme (uses green-n* neutrals) -->
          <div id="green-light" class="test-element" data-palette="green"></div>
          <div id="green-dark" class="dark test-element" data-palette="green"></div>
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
   * Capture computed values for neutral color variables
   */
  function captureNeutralValues(element: Element, neutralVars: readonly string[]): NeutralColorSnapshot {
    const computedStyle = window.getComputedStyle(element)
    const snapshot: NeutralColorSnapshot = {}
    
    neutralVars.forEach(variable => {
      const value = computedStyle.getPropertyValue(variable).trim()
      if (value) {
        snapshot[variable] = value
      }
    })
    
    return snapshot
  }

  /**
   * Test: Verify neutral color mapping works correctly for each theme
   */
  test('validates neutral color mappings for each theme', () => {
    const neutralVars = ['--color-neutral-1', '--color-neutral-2', '--color-neutral-3', '--color-neutral-7', '--color-neutral-8', '--color-neutral-12']
    
    const mappingResults: { [theme: string]: ThemeNeutralSnapshot } = {}
    
    // Test default theme (gray fallback)
    const defaultLight = document.getElementById('default-light')!
    const defaultDark = document.getElementById('default-dark')!
    mappingResults.default = {
      light: captureNeutralValues(defaultLight, neutralVars),
      dark: captureNeutralValues(defaultDark, neutralVars)
    }
    
    // Test teal theme
    const tealLight = document.getElementById('teal-light')!
    const tealDark = document.getElementById('teal-dark')!
    mappingResults.teal = {
      light: captureNeutralValues(tealLight, neutralVars),
      dark: captureNeutralValues(tealDark, neutralVars)
    }
    
    // Test blue theme
    const blueLight = document.getElementById('blue-light')!
    const blueDark = document.getElementById('blue-dark')!
    mappingResults.blue = {
      light: captureNeutralValues(blueLight, neutralVars),
      dark: captureNeutralValues(blueDark, neutralVars)
    }
    
    // Test green theme
    const greenLight = document.getElementById('green-light')!
    const greenDark = document.getElementById('green-dark')!
    mappingResults.green = {
      light: captureNeutralValues(greenLight, neutralVars),
      dark: captureNeutralValues(greenDark, neutralVars)
    }
    
    expect(mappingResults).toMatchSnapshot('neutral-color-mappings')
    
    // Verify themes have different neutral colors (theme-tinted)
    expect(mappingResults.default.light['--color-neutral-1']).not.toBe(mappingResults.teal.light['--color-neutral-1'])
    expect(mappingResults.default.light['--color-neutral-1']).not.toBe(mappingResults.blue.light['--color-neutral-1'])
    expect(mappingResults.teal.light['--color-neutral-1']).not.toBe(mappingResults.blue.light['--color-neutral-1'])
    
    // Verify all values are valid OKLCH
    Object.values(mappingResults).forEach(theme => {
      Object.values(theme.light).forEach(value => {
        expect(value).toMatch(/oklch\([\d\s\.\/\%]+\)/)
      })
      Object.values(theme.dark).forEach(value => {
        expect(value).toMatch(/oklch\([\d\s\.\/\%]+\)/)
      })
    })
  })

  /**
   * Test: Verify theme-specific neutral scales resolve correctly
   */
  test('validates theme-specific neutral scale resolution', () => {
    const tealLight = document.getElementById('teal-light')!
    const blueLight = document.getElementById('blue-light')!
    
    // Test direct theme-neutral variables
    const tealN1 = window.getComputedStyle(tealLight).getPropertyValue('--teal-n1').trim()
    const tealN12 = window.getComputedStyle(tealLight).getPropertyValue('--teal-n12').trim()
    const blueN1 = window.getComputedStyle(blueLight).getPropertyValue('--blue-n1').trim()
    const blueN12 = window.getComputedStyle(blueLight).getPropertyValue('--blue-n12').trim()
    
    // Test that they resolve through semantic mapping
    const tealNeutral1 = window.getComputedStyle(tealLight).getPropertyValue('--color-neutral-1').trim()
    const tealNeutral12 = window.getComputedStyle(tealLight).getPropertyValue('--color-neutral-12').trim()
    const blueNeutral1 = window.getComputedStyle(blueLight).getPropertyValue('--color-neutral-1').trim()
    const blueNeutral12 = window.getComputedStyle(blueLight).getPropertyValue('--color-neutral-12').trim()
    
    // Verify cascade works correctly
    expect(tealN1).toBe(tealNeutral1)
    expect(tealN12).toBe(tealNeutral12)
    expect(blueN1).toBe(blueNeutral1)
    expect(blueN12).toBe(blueNeutral12)
    
    // Verify subtle color differentiation (same lightness, different hue)
    expect(tealN1).toMatch(/oklch\(0\.995 0\.002 174\)/)  // Teal hue
    expect(blueN1).toMatch(/oklch\(0\.995 0\.002 233\)/)  // Blue hue
    expect(tealN1).not.toBe(blueN1)  // Different hues
    
    const results = {
      tealDirect: { n1: tealN1, n12: tealN12 },
      tealSemantic: { n1: tealNeutral1, n12: tealNeutral12 },
      blueDirect: { n1: blueN1, n12: blueN12 },
      blueSemantic: { n1: blueNeutral1, n12: blueNeutral12 }
    }
    
    expect(results).toMatchSnapshot('theme-neutral-scale-resolution')
  })

  /**
   * Test: Verify ShadCN variables work with neutral color system
   */
  test('validates ShadCN variables with neutral color system', () => {
    const shadcnVars = ['--background', '--foreground', '--card', '--secondary', '--muted', '--input']
    
    const shadcnResults: { [theme: string]: ThemeNeutralSnapshot } = {}
    
    // Test across themes
    const themes = [
      { name: 'default', light: 'default-light', dark: 'default-dark' },
      { name: 'teal', light: 'teal-light', dark: 'teal-dark' },
      { name: 'blue', light: 'blue-light', dark: 'blue-dark' }
    ]
    
    themes.forEach(theme => {
      const lightElement = document.getElementById(theme.light)!
      const darkElement = document.getElementById(theme.dark)!
      
      shadcnResults[theme.name] = {
        light: captureNeutralValues(lightElement, shadcnVars),
        dark: captureNeutralValues(darkElement, shadcnVars)
      }
    })
    
    expect(shadcnResults).toMatchSnapshot('shadcn-with-neutral-colors')
    
    // Verify themes have different ShadCN values (via neutral mapping)
    expect(shadcnResults.default.light['--background']).not.toBe(shadcnResults.teal.light['--background'])
    expect(shadcnResults.teal.light['--background']).not.toBe(shadcnResults.blue.light['--background'])
    
    // Verify contrast is maintained (background ≠ foreground)
    themes.forEach(theme => {
      expect(shadcnResults[theme.name].light['--background']).not.toBe(shadcnResults[theme.name].light['--foreground'])
      expect(shadcnResults[theme.name].dark['--background']).not.toBe(shadcnResults[theme.name].dark['--foreground'])
    })
  })

  /**
   * Test: Verify fallback behavior when theme neutrals are unavailable
   */
  test('validates fallback to gray when theme neutrals unavailable', () => {
    // Create element with unknown palette
    const unknownElement = document.createElement('div')
    unknownElement.setAttribute('data-palette', 'unknown')
    unknownElement.className = 'test-element'
    document.body.appendChild(unknownElement)
    
    const defaultElement = document.getElementById('default-light')!
    
    // Should fallback to gray values
    const unknownNeutral1 = window.getComputedStyle(unknownElement).getPropertyValue('--color-neutral-1').trim()
    const defaultNeutral1 = window.getComputedStyle(defaultElement).getPropertyValue('--color-neutral-1').trim()
    const grayValue = window.getComputedStyle(unknownElement).getPropertyValue('--gray-1').trim()
    
    expect(unknownNeutral1).toBe(defaultNeutral1)
    expect(unknownNeutral1).toBe(grayValue)
    expect(unknownNeutral1).toBe('oklch(0.995 0.002 225)')  // Standard gray
  })

  /**
   * Test: Verify color differentiation between themes is subtle but effective
   */
  test('validates subtle theme differentiation', () => {
    const tealLight = document.getElementById('teal-light')!
    const blueLight = document.getElementById('blue-light')!
    const greenLight = document.getElementById('green-light')!
    
    // Test neutral-1 (background equivalent)
    const tealBg = window.getComputedStyle(tealLight).getPropertyValue('--color-neutral-1').trim()
    const blueBg = window.getComputedStyle(blueLight).getPropertyValue('--color-neutral-1').trim()
    const greenBg = window.getComputedStyle(greenLight).getPropertyValue('--color-neutral-1').trim()
    
    const differentiation = {
      teal: { background: tealBg },
      blue: { background: blueBg },
      green: { background: greenBg }
    }
    
    // Should have same lightness (0.995) but different hues
    expect(tealBg).toMatch(/oklch\(0\.995 0\.002 174\)/)   // Teal hue
    expect(blueBg).toMatch(/oklch\(0\.995 0\.002 233\)/)   // Blue hue  
    expect(greenBg).toMatch(/oklch\(0\.995 0\.002 130\)/)  // Green hue
    
    // All different values
    expect(tealBg).not.toBe(blueBg)
    expect(blueBg).not.toBe(greenBg)
    expect(tealBg).not.toBe(greenBg)
    
    expect(differentiation).toMatchSnapshot('theme-color-differentiation')
  })

  /**
   * Test: Verify dark mode neutral mappings work correctly
   */
  test('validates dark mode neutral color behavior', () => {
    const neutralVars = ['--color-neutral-1', '--color-neutral-2', '--color-neutral-3', '--color-neutral-12']
    
    const tealLight = document.getElementById('teal-light')!
    const tealDark = document.getElementById('teal-dark')!
    
    const lightValues = captureNeutralValues(tealLight, neutralVars)
    const darkValues = captureNeutralValues(tealDark, neutralVars)
    
    const darkModeComparison = {
      light: lightValues,
      dark: darkValues,
      differences: {
        neutral1: lightValues['--color-neutral-1'] !== darkValues['--color-neutral-1'],
        neutral12: lightValues['--color-neutral-12'] !== darkValues['--color-neutral-12']
      }
    }
    
    // Verify proper dark mode inversion
    expect(darkModeComparison.differences.neutral1).toBe(true)
    expect(darkModeComparison.differences.neutral12).toBe(true)
    
    // Verify dark values follow pattern (dark-1 should be darker than light-1)
    expect(darkValues['--color-neutral-1']).toMatch(/oklch\(0\.156/)  // Darker
    expect(lightValues['--color-neutral-1']).toMatch(/oklch\(0\.995/) // Lighter
    
    expect(darkModeComparison).toMatchSnapshot('dark-mode-neutral-behavior')
  })

  /**
   * Test environment validation
   */
  test('validates neutral mapping test environment', () => {
    const testElements = [
      'default-light', 'default-dark',
      'teal-light', 'teal-dark', 
      'blue-light', 'blue-dark',
      'green-light', 'green-dark'
    ]
    
    testElements.forEach(id => {
      const element = document.getElementById(id)
      expect(element).toBeDefined()
    })
    
    // Verify palette attributes
    expect(document.getElementById('teal-light')?.getAttribute('data-palette')).toBe('teal')
    expect(document.getElementById('blue-light')?.getAttribute('data-palette')).toBe('blue')
    expect(document.getElementById('green-light')?.getAttribute('data-palette')).toBe('green')
    
    // Verify dark classes
    expect(document.getElementById('teal-dark')?.classList.contains('dark')).toBe(true)
    expect(document.getElementById('teal-light')?.classList.contains('dark')).toBe(false)
  })
})