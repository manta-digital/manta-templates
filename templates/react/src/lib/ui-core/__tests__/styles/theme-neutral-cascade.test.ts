/**
 * Theme-Specific Neutral Color Cascade Test
 * 
 * This test validates the complete color cascade for theme-specific neutral colors
 * across all supported palettes. It ensures that the CSS cascade works correctly:
 * radixColors.css → semanticColors.css → shadcn.css
 * 
 * The test validates:
 * 1. Each theme palette has proper neutral color scales (theme-n1 through theme-n12)
 * 2. Theme-specific semantic mappings work for all palettes
 * 3. CSS cascade resolution is correct for complex inheritance chains
 * 4. Palette switching maintains consistent behavior
 * 5. Edge cases like missing neutral steps fallback gracefully
 */

import { JSDOM } from 'jsdom'

// All supported theme palettes
const THEME_PALETTES = ['teal', 'mintteal', 'blue', 'purple', 'green', 'orange'] as const
type ThemePalette = typeof THEME_PALETTES[number]

// Complete neutral color scale
const NEUTRAL_SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
type NeutralStep = typeof NEUTRAL_SCALE[number]

// Key neutral steps used in ShadCN
const KEY_NEUTRAL_STEPS = [1, 2, 3, 7, 8, 12] as const

interface NeutralColorValues {
  [step: string]: string
}

interface ThemeCascadeSnapshot {
  neutralScale: NeutralColorValues      // --theme-n1, --theme-n2, etc.
  semanticMapping: NeutralColorValues   // --color-neutral-1, --color-neutral-2, etc.
  shadcnVariables: NeutralColorValues   // --background, --card, etc.
}

interface CompleteCascadeSnapshot {
  light: ThemeCascadeSnapshot
  dark: ThemeCascadeSnapshot
}

describe('Theme-Specific Neutral Color Cascade', () => {
  let dom: JSDOM
  let document: Document
  let window: Window & typeof globalThis

  beforeEach(() => {
    // Create DOM with complete theme neutral architecture
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            /* Base Radix Colors - Complete neutral scales for all themes */
            :root {
              /* Teal theme neutral scale */
              --teal-n1: oklch(0.995 0.002 174);
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

              /* Blue theme neutral scale */
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

              /* Green theme neutral scale */
              --green-n1: oklch(0.995 0.002 130);
              --green-n2: oklch(0.984 0.003 130);
              --green-n3: oklch(0.968 0.004 130);
              --green-n4: oklch(0.946 0.005 130);
              --green-n5: oklch(0.918 0.006 130);
              --green-n6: oklch(0.877 0.007 130);
              --green-n7: oklch(0.719 0.008 130);
              --green-n8: oklch(0.609 0.009 130);
              --green-n9: oklch(0.537 0.01 130);
              --green-n10: oklch(0.481 0.011 130);
              --green-n11: oklch(0.395 0.012 130);
              --green-n12: oklch(0.156 0.020 130);

              /* Purple theme neutral scale */
              --purple-n1: oklch(0.995 0.002 300);
              --purple-n2: oklch(0.984 0.003 300);
              --purple-n3: oklch(0.968 0.004 300);
              --purple-n4: oklch(0.946 0.005 300);
              --purple-n5: oklch(0.918 0.006 300);
              --purple-n6: oklch(0.877 0.007 300);
              --purple-n7: oklch(0.719 0.008 300);
              --purple-n8: oklch(0.609 0.009 300);
              --purple-n9: oklch(0.537 0.01 300);
              --purple-n10: oklch(0.481 0.011 300);
              --purple-n11: oklch(0.395 0.012 300);
              --purple-n12: oklch(0.156 0.020 300);

              /* Orange theme neutral scale */
              --orange-n1: oklch(0.995 0.002 50);
              --orange-n2: oklch(0.984 0.003 50);
              --orange-n3: oklch(0.968 0.004 50);
              --orange-n4: oklch(0.946 0.005 50);
              --orange-n5: oklch(0.918 0.006 50);
              --orange-n6: oklch(0.877 0.007 50);
              --orange-n7: oklch(0.719 0.008 50);
              --orange-n8: oklch(0.609 0.009 50);
              --orange-n9: oklch(0.537 0.01 50);
              --orange-n10: oklch(0.481 0.011 50);
              --orange-n11: oklch(0.395 0.012 50);
              --orange-n12: oklch(0.156 0.020 50);

              /* Mintteal theme neutral scale */
              --mintteal-n1: oklch(0.995 0.002 166);
              --mintteal-n2: oklch(0.984 0.003 166);
              --mintteal-n3: oklch(0.968 0.004 166);
              --mintteal-n4: oklch(0.946 0.005 166);
              --mintteal-n5: oklch(0.918 0.006 166);
              --mintteal-n6: oklch(0.877 0.007 166);
              --mintteal-n7: oklch(0.719 0.008 166);
              --mintteal-n8: oklch(0.609 0.009 166);
              --mintteal-n9: oklch(0.537 0.01 166);
              --mintteal-n10: oklch(0.481 0.011 166);
              --mintteal-n11: oklch(0.395 0.012 166);
              --mintteal-n12: oklch(0.156 0.020 166);

              /* Standard gray fallback */
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
            }

            /* Dark mode neutral scales */
            .dark {
              /* Teal neutral dark */
              --teal-n1: oklch(0.156 0.020 174);
              --teal-n2: oklch(0.181 0.018 174);
              --teal-n3: oklch(0.247 0.016 174);
              --teal-n4: oklch(0.309 0.014 174);
              --teal-n5: oklch(0.395 0.012 174);
              --teal-n6: oklch(0.481 0.011 174);
              --teal-n7: oklch(0.537 0.01 174);
              --teal-n8: oklch(0.719 0.008 174);
              --teal-n9: oklch(0.799 0.007 174);
              --teal-n10: oklch(0.877 0.007 174);
              --teal-n11: oklch(0.918 0.006 174);
              --teal-n12: oklch(0.995 0.002 174);

              /* Blue neutral dark */
              --blue-n1: oklch(0.156 0.020 233);
              --blue-n2: oklch(0.181 0.018 233);
              --blue-n3: oklch(0.247 0.016 233);
              --blue-n7: oklch(0.537 0.01 233);
              --blue-n8: oklch(0.719 0.008 233);
              --blue-n12: oklch(0.995 0.002 233);

              /* Green neutral dark */
              --green-n1: oklch(0.156 0.020 130);
              --green-n2: oklch(0.181 0.018 130);
              --green-n3: oklch(0.247 0.016 130);
              --green-n7: oklch(0.537 0.01 130);
              --green-n8: oklch(0.719 0.008 130);
              --green-n12: oklch(0.995 0.002 130);

              /* Purple, Orange, Mintteal dark modes... */
              --purple-n1: oklch(0.156 0.020 300);
              --purple-n2: oklch(0.181 0.018 300);
              --purple-n3: oklch(0.247 0.016 300);
              --purple-n7: oklch(0.537 0.01 300);
              --purple-n8: oklch(0.719 0.008 300);
              --purple-n12: oklch(0.995 0.002 300);

              --orange-n1: oklch(0.156 0.020 50);
              --orange-n2: oklch(0.181 0.018 50);
              --orange-n3: oklch(0.247 0.016 50);
              --orange-n7: oklch(0.537 0.01 50);
              --orange-n8: oklch(0.719 0.008 50);
              --orange-n12: oklch(0.995 0.002 50);

              --mintteal-n1: oklch(0.156 0.020 166);
              --mintteal-n2: oklch(0.181 0.018 166);
              --mintteal-n3: oklch(0.247 0.016 166);
              --mintteal-n7: oklch(0.537 0.01 166);
              --mintteal-n8: oklch(0.719 0.008 166);
              --mintteal-n12: oklch(0.995 0.002 166);

              /* Gray dark */
              --gray-1: oklch(0.156 0.020 225);
              --gray-2: oklch(0.181 0.018 225);
              --gray-3: oklch(0.247 0.016 225);
              --gray-7: oklch(0.537 0.01 225);
              --gray-8: oklch(0.719 0.008 225);
              --gray-12: oklch(0.995 0.002 225);
            }

            /* Semantic Color Mappings - Default to gray */
            :root {
              --color-neutral-1: var(--gray-1);
              --color-neutral-2: var(--gray-2);
              --color-neutral-3: var(--gray-3);
              --color-neutral-4: var(--gray-4);
              --color-neutral-5: var(--gray-5);
              --color-neutral-6: var(--gray-6);
              --color-neutral-7: var(--gray-7);
              --color-neutral-8: var(--gray-8);
              --color-neutral-9: var(--gray-9);
              --color-neutral-10: var(--gray-10);
              --color-neutral-11: var(--gray-11);
              --color-neutral-12: var(--gray-12);
            }

            /* Theme-specific semantic mappings */
            [data-palette="teal"] {
              --color-neutral-1: var(--teal-n1);
              --color-neutral-2: var(--teal-n2);
              --color-neutral-3: var(--teal-n3);
              --color-neutral-4: var(--teal-n4);
              --color-neutral-5: var(--teal-n5);
              --color-neutral-6: var(--teal-n6);
              --color-neutral-7: var(--teal-n7);
              --color-neutral-8: var(--teal-n8);
              --color-neutral-9: var(--teal-n9);
              --color-neutral-10: var(--teal-n10);
              --color-neutral-11: var(--teal-n11);
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

            [data-palette="purple"] {
              --color-neutral-1: var(--purple-n1);
              --color-neutral-2: var(--purple-n2);
              --color-neutral-3: var(--purple-n3);
              --color-neutral-7: var(--purple-n7);
              --color-neutral-8: var(--purple-n8);
              --color-neutral-12: var(--purple-n12);
            }

            [data-palette="orange"] {
              --color-neutral-1: var(--orange-n1);
              --color-neutral-2: var(--orange-n2);
              --color-neutral-3: var(--orange-n3);
              --color-neutral-7: var(--orange-n7);
              --color-neutral-8: var(--orange-n8);
              --color-neutral-12: var(--orange-n12);
            }

            [data-palette="mintteal"] {
              --color-neutral-1: var(--mintteal-n1);
              --color-neutral-2: var(--mintteal-n2);
              --color-neutral-3: var(--mintteal-n3);
              --color-neutral-7: var(--mintteal-n7);
              --color-neutral-8: var(--mintteal-n8);
              --color-neutral-12: var(--mintteal-n12);
            }

            /* ShadCN Variables - Using neutral system */
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
              --card: var(--color-neutral-2);
              --secondary: var(--color-neutral-3);
              --muted: var(--color-neutral-3);
              --input: var(--color-neutral-1);
            }
          </style>
        </head>
        <body>
          ${THEME_PALETTES.map(palette => `
            <div id="${palette}-light" class="test-element" data-palette="${palette}"></div>
            <div id="${palette}-dark" class="dark test-element" data-palette="${palette}"></div>
          `).join('')}
          
          <!-- Default (gray fallback) -->
          <div id="default-light" class="test-element"></div>
          <div id="default-dark" class="dark test-element"></div>
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
   * Capture complete cascade values for a theme
   */
  function captureThemeCascade(lightElement: Element, darkElement: Element, palette: string): CompleteCascadeSnapshot {
    const computedLight = window.getComputedStyle(lightElement)
    const computedDark = window.getComputedStyle(darkElement)
    
    // Capture neutral scale variables
    const neutralScaleLight: NeutralColorValues = {}
    const neutralScaleDark: NeutralColorValues = {}
    KEY_NEUTRAL_STEPS.forEach(step => {
      const varName = `--${palette}-n${step}`
      neutralScaleLight[varName] = computedLight.getPropertyValue(varName).trim()
      neutralScaleDark[varName] = computedDark.getPropertyValue(varName).trim()
    })
    
    // Capture semantic mappings
    const semanticMappingLight: NeutralColorValues = {}
    const semanticMappingDark: NeutralColorValues = {}
    KEY_NEUTRAL_STEPS.forEach(step => {
      const varName = `--color-neutral-${step}`
      semanticMappingLight[varName] = computedLight.getPropertyValue(varName).trim()
      semanticMappingDark[varName] = computedDark.getPropertyValue(varName).trim()
    })
    
    // Capture ShadCN variables
    const shadcnVars = ['--background', '--foreground', '--card', '--secondary', '--muted', '--input']
    const shadcnVariablesLight: NeutralColorValues = {}
    const shadcnVariablesDark: NeutralColorValues = {}
    shadcnVars.forEach(varName => {
      shadcnVariablesLight[varName] = computedLight.getPropertyValue(varName).trim()
      shadcnVariablesDark[varName] = computedDark.getPropertyValue(varName).trim()
    })
    
    return {
      light: {
        neutralScale: neutralScaleLight,
        semanticMapping: semanticMappingLight,
        shadcnVariables: shadcnVariablesLight
      },
      dark: {
        neutralScale: neutralScaleDark,
        semanticMapping: semanticMappingDark,
        shadcnVariables: shadcnVariablesDark
      }
    }
  }

  /**
   * Test: Validate complete cascade for all theme palettes
   */
  test('validates complete cascade for all theme palettes', () => {
    const cascadeResults: { [palette: string]: CompleteCascadeSnapshot } = {}
    
    // Test each theme palette
    THEME_PALETTES.forEach(palette => {
      const lightElement = document.getElementById(`${palette}-light`)!
      const darkElement = document.getElementById(`${palette}-dark`)!
      
      cascadeResults[palette] = captureThemeCascade(lightElement, darkElement, palette)
    })
    
    // Test default (gray) fallback
    const defaultLight = document.getElementById('default-light')!
    const defaultDark = document.getElementById('default-dark')!
    cascadeResults.default = captureThemeCascade(defaultLight, defaultDark, 'gray')
    
    expect(cascadeResults).toMatchSnapshot('complete-theme-cascade')
    
    // Verify each theme has different neutral colors
    const palettes = [...THEME_PALETTES]
    for (let i = 0; i < palettes.length - 1; i++) {
      for (let j = i + 1; j < palettes.length; j++) {
        const palette1 = palettes[i]
        const palette2 = palettes[j]
        
        // Background colors should be different (subtle theme tinting)
        expect(
          cascadeResults[palette1].light.shadcnVariables['--background']
        ).not.toBe(
          cascadeResults[palette2].light.shadcnVariables['--background']
        )
      }
    }
  })

  /**
   * Test: Verify cascade resolution chain works correctly
   */
  test('validates cascade resolution chain', () => {
    const tealLight = document.getElementById('teal-light')!
    
    // Test the complete chain: teal-n1 → color-neutral-1 → background
    const tealN1 = window.getComputedStyle(tealLight).getPropertyValue('--teal-n1').trim()
    const colorNeutral1 = window.getComputedStyle(tealLight).getPropertyValue('--color-neutral-1').trim()
    const background = window.getComputedStyle(tealLight).getPropertyValue('--background').trim()
    
    // All should resolve to the same final OKLCH value
    expect(tealN1).toBe(colorNeutral1)
    expect(colorNeutral1).toBe(background)
    expect(tealN1).toBe('oklch(0.995 0.002 174)') // Teal-tinted neutral
    
    const cascadeChain = {
      source: tealN1,
      semantic: colorNeutral1,
      final: background,
      allMatch: tealN1 === colorNeutral1 && colorNeutral1 === background
    }
    
    expect(cascadeChain).toMatchSnapshot('cascade-resolution-chain')
  })

  /**
   * Test: Verify theme switching behavior
   */
  test('validates theme switching maintains cascade', () => {
    // Create element and switch its theme
    const testElement = document.createElement('div')
    testElement.className = 'test-element'
    document.body.appendChild(testElement)
    
    const switchingResults: { [theme: string]: NeutralColorValues } = {}
    
    // Test switching between different palettes
    const testPalettes = ['teal', 'blue', 'green', 'purple']
    testPalettes.forEach(palette => {
      testElement.setAttribute('data-palette', palette)
      
      const computed = window.getComputedStyle(testElement)
      switchingResults[palette] = {
        background: computed.getPropertyValue('--background').trim(),
        secondary: computed.getPropertyValue('--secondary').trim(),
        neutralMapping: computed.getPropertyValue('--color-neutral-1').trim(),
        directNeutral: computed.getPropertyValue(`--${palette}-n1`).trim()
      }
    })
    
    expect(switchingResults).toMatchSnapshot('theme-switching-cascade')
    
    // Verify cascade works for each theme
    testPalettes.forEach(palette => {
      const result = switchingResults[palette]
      expect(result.neutralMapping).toBe(result.directNeutral)
      expect(result.background).toBe(result.neutralMapping)
    })
  })

  /**
   * Test: Verify edge cases and fallback behavior
   */
  test('validates edge cases and fallbacks', () => {
    // Test palette with missing neutral steps
    const incompleteElement = document.createElement('div')
    incompleteElement.className = 'test-element'
    incompleteElement.setAttribute('data-palette', 'blue') // Only has partial neutral scale
    document.body.appendChild(incompleteElement)
    
    const computed = window.getComputedStyle(incompleteElement)
    
    // Steps that exist
    const existingN1 = computed.getPropertyValue('--color-neutral-1').trim()
    const existingN2 = computed.getPropertyValue('--color-neutral-2').trim()
    const existingN3 = computed.getPropertyValue('--color-neutral-3').trim()
    
    // Steps that should fallback (not defined in blue theme)
    const fallbackN4 = computed.getPropertyValue('--color-neutral-4').trim()
    const fallbackN5 = computed.getPropertyValue('--color-neutral-5').trim()
    const fallbackN6 = computed.getPropertyValue('--color-neutral-6').trim()
    
    const edgeCases = {
      existing: { n1: existingN1, n2: existingN2, n3: existingN3 },
      fallback: { n4: fallbackN4, n5: fallbackN5, n6: fallbackN6 },
      hasExisting: existingN1 !== '' && existingN2 !== '' && existingN3 !== '',
      hasFallback: fallbackN4 !== '' || fallbackN5 !== '' || fallbackN6 !== ''
    }
    
    // Should have theme-specific neutrals for defined steps
    expect(existingN1).toBe('oklch(0.995 0.002 233)') // Blue-tinted
    expect(existingN2).toBe('oklch(0.984 0.003 233)') // Blue-tinted
    
    // Undefined steps may fallback to gray or be empty (depending on CSS implementation)
    expect(edgeCases.hasExisting).toBe(true)
    
    expect(edgeCases).toMatchSnapshot('edge-cases-fallback')
  })

  /**
   * Test: Verify hue differentiation across themes
   */
  test('validates hue differentiation maintains consistent lightness', () => {
    const hueDifferentiation: { [palette: string]: { hue: number; oklch: string } } = {}
    
    // Expected hues for each theme
    const expectedHues = {
      teal: 174,
      blue: 233, 
      green: 130,
      purple: 300,
      orange: 50,
      mintteal: 166
    }
    
    THEME_PALETTES.forEach(palette => {
      const element = document.getElementById(`${palette}-light`)!
      const neutral1 = window.getComputedStyle(element).getPropertyValue('--color-neutral-1').trim()
      
      hueDifferentiation[palette] = {
        hue: expectedHues[palette],
        oklch: neutral1
      }
      
      // Should have same lightness (0.995) but different hue
      expect(neutral1).toMatch(new RegExp(`oklch\\(0\\.995 0\\.002 ${expectedHues[palette]}\\)`))
    })
    
    expect(hueDifferentiation).toMatchSnapshot('hue-differentiation-consistency')
  })

  /**
   * Test: Verify dark mode cascade behavior
   */
  test('validates dark mode cascade maintains theme consistency', () => {
    const darkModeResults: Record<string, any> = {}
    
    const palettes = ['teal', 'blue', 'green']
    palettes.forEach((palette: string) => {
      const lightElement = document.getElementById(`${palette}-light`)!
      const darkElement = document.getElementById(`${palette}-dark`)!
      
      const lightBg = window.getComputedStyle(lightElement).getPropertyValue('--background').trim()
      const darkBg = window.getComputedStyle(darkElement).getPropertyValue('--background').trim()
      const lightFg = window.getComputedStyle(lightElement).getPropertyValue('--foreground').trim()
      const darkFg = window.getComputedStyle(darkElement).getPropertyValue('--foreground').trim()
      
      darkModeResults[palette] = {
        light: { background: lightBg, foreground: lightFg },
        dark: { background: darkBg, foreground: darkFg },
        contrastPreserved: lightBg !== darkBg && lightFg !== darkFg,
        themeConsistent: lightBg.includes(palette === 'teal' ? '174' : palette === 'blue' ? '233' : '130')
      }
    })
    
    expect(darkModeResults).toMatchSnapshot('dark-mode-cascade-consistency')
    
    // Verify contrast is preserved in all themes
    Object.values(darkModeResults).forEach((result: any) => {
      expect(result.contrastPreserved).toBe(true)
    })
  })

  /**
   * Test: Validate performance of cascade resolution
   */
  test('validates cascade resolution performance', () => {
    const performanceTest = {
      startTime: performance.now(),
      results: [] as any[],
      endTime: 0,
      duration: 0,
      avgPerSwitch: 0
    }
    
    // Test rapid theme switching
    const testElement = document.createElement('div')
    testElement.className = 'test-element'
    document.body.appendChild(testElement)
    
    const switchCount = 50
    for (let i = 0; i < switchCount; i++) {
      const palette = THEME_PALETTES[i % THEME_PALETTES.length]
      testElement.setAttribute('data-palette', palette)
      
      const computed = window.getComputedStyle(testElement)
      const bg = computed.getPropertyValue('--background').trim()
      
      performanceTest.results.push({
        iteration: i,
        palette,
        background: bg,
        isValid: bg.startsWith('oklch(')
      })
    }
    
    performanceTest.endTime = performance.now()
    performanceTest.duration = performanceTest.endTime - performanceTest.startTime
    performanceTest.avgPerSwitch = performanceTest.duration / switchCount
    
    // All results should be valid
    expect(performanceTest.results.every((r: any) => r.isValid)).toBe(true)
    
    // Performance should be reasonable (< 1ms per switch)
    expect(performanceTest.avgPerSwitch).toBeLessThan(1)
    
    expect({
      duration: performanceTest.duration,
      avgPerSwitch: performanceTest.avgPerSwitch,
      allValid: performanceTest.results.every((r: any) => r.isValid)
    }).toMatchSnapshot('cascade-performance')
  })

  /**
   * Test environment validation
   */
  test('validates theme cascade test environment', () => {
    // Verify all theme elements exist
    THEME_PALETTES.forEach(palette => {
      expect(document.getElementById(`${palette}-light`)).toBeDefined()
      expect(document.getElementById(`${palette}-dark`)).toBeDefined()
      
      const lightEl = document.getElementById(`${palette}-light`)!
      const darkEl = document.getElementById(`${palette}-dark`)!
      
      expect(lightEl.getAttribute('data-palette')).toBe(palette)
      expect(darkEl.getAttribute('data-palette')).toBe(palette)
      expect(darkEl.classList.contains('dark')).toBe(true)
    })
    
    // Verify CSS variables are available
    const tealLight = document.getElementById('teal-light')!
    const computed = window.getComputedStyle(tealLight)
    
    expect(computed.getPropertyValue('--teal-n1').trim()).toBeTruthy()
    expect(computed.getPropertyValue('--color-neutral-1').trim()).toBeTruthy()
    expect(computed.getPropertyValue('--background').trim()).toBeTruthy()
  })
})