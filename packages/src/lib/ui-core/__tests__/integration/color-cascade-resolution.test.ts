#!/usr/bin/env tsx
/**
 * Color Cascade Resolution Integration Test
 * 
 * This test validates the CSS color system architecture by analyzing
 * CSS content directly rather than relying on JSDOM computed styles.
 * It ensures the current color architecture is sound before migration.
 */

import fs from 'fs'
import { performance } from 'perf_hooks'

interface CSSAnalysisResult {
  grayVariables: string[]
  shadcnVariables: string[]
  semanticVariables: string[]
  themeVariables: string[]
  oklchValues: string[]
  varReferences: string[]
  lightModeDefinitions: { [key: string]: string }
  darkModeDefinitions: { [key: string]: string }
}

interface TestResult {
  name: string
  passed: boolean
  error?: string
}

class ColorCascadeIntegrationTester {
  private cssContent: { [filename: string]: string } = {}
  private analysisResult!: CSSAnalysisResult
  private results: TestResult[] = []

  async initialize() {
    console.log('🔧 Loading CSS files for analysis...')
    
    try {
      // Load all CSS files
      this.cssContent = {
        radix: fs.readFileSync('src/styles/radixColors.css', 'utf-8'),
        semantic: fs.readFileSync('src/styles/semanticColors.css', 'utf-8'),
        shadcn: fs.readFileSync('src/styles/shadcn.css', 'utf-8'),
        index: fs.readFileSync('src/styles/index.css', 'utf-8')
      }

      // Analyze combined CSS content
      const combinedCSS = Object.values(this.cssContent).join('\n')
      this.analysisResult = analyzeCSSContent(combinedCSS)
      
      console.log('✅ CSS files loaded and analyzed successfully')
    } catch (error) {
      throw new Error(`Failed to initialize: ${error}`)
    }
  }

  runTest(name: string, testFn: () => void) {
    try {
      testFn()
      this.results.push({ name, passed: true })
      console.log(`✅ ${name}`)
    } catch (error) {
      this.results.push({ name, passed: false, error: String(error) })
      console.log(`❌ ${name}: ${error}`)
    }
  }

  async runAllTests() {
    await this.initialize()

    console.log('\n🧪 Running Color Cascade Integration Tests')
    console.log('=' .repeat(50))

    this.runTest('CSS files exist with substantial content', () => {
      const requiredFiles = ['radix', 'semantic', 'shadcn', 'index']
      
      requiredFiles.forEach(file => {
        if (!this.cssContent[file]) {
          throw new Error(`Missing CSS file: ${file}`)
        }
        if (this.cssContent[file].trim().length < 100) {
          throw new Error(`CSS file too small: ${file}`)
        }
      })
    })

    this.runTest('Gray variables are properly defined', () => {
      const expectedGrayVars = ['--gray-1', '--gray-2', '--gray-3', '--gray-7', '--gray-8', '--gray-12']
      
      expectedGrayVars.forEach(variable => {
        if (!this.analysisResult.grayVariables.includes(variable)) {
          throw new Error(`Missing gray variable: ${variable}`)
        }
      })

      // Should have light and dark mode definitions
      if (!this.analysisResult.lightModeDefinitions['--gray-1']) {
        throw new Error('Missing light mode --gray-1 definition')
      }
      if (!this.analysisResult.darkModeDefinitions['--gray-1']) {
        throw new Error('Missing dark mode --gray-1 definition')
      }
      
      // Light and dark should be different
      if (this.analysisResult.lightModeDefinitions['--gray-1'] === 
          this.analysisResult.darkModeDefinitions['--gray-1']) {
        throw new Error('Light and dark gray-1 values should be different')
      }
    })

    this.runTest('ShadCN variables use proper references', () => {
      const criticalShadcnVars = ['--background', '--foreground', '--card', '--secondary']
      
      criticalShadcnVars.forEach(variable => {
        if (!this.analysisResult.shadcnVariables.includes(variable)) {
          throw new Error(`Missing ShadCN variable: ${variable}`)
        }
      })

      // Background should reference gray-1
      if (!this.cssContent.shadcn.match(/--background:\s*var\(--gray-1\)/)) {
        throw new Error('--background should reference --gray-1')
      }
      
      // Secondary should reference gray-2  
      if (!this.cssContent.shadcn.match(/--secondary:\s*var\(--gray-2\)/)) {
        throw new Error('--secondary should reference --gray-2')
      }
    })

    this.runTest('OKLCH color format compliance', () => {
      if (this.analysisResult.oklchValues.length < 10) {
        throw new Error(`Expected at least 10 OKLCH values, found ${this.analysisResult.oklchValues.length}`)
      }
      
      // Check OKLCH format validity
      this.analysisResult.oklchValues.forEach(oklch => {
        if (!oklch.match(/oklch\(\s*[\d.]+\s+[\d.]+\s+[\d.]+(?:\s*\/\s*[\d.]+)?\s*\)/)) {
          throw new Error(`Invalid OKLCH format: ${oklch}`)
        }
      })

      // Specific OKLCH values should be present
      const lightGray1 = this.analysisResult.lightModeDefinitions['--gray-1']
      const darkGray1 = this.analysisResult.darkModeDefinitions['--gray-1']
      
      if (!lightGray1 || !lightGray1.match(/oklch\(0\.99\d/)) {
        throw new Error(`Invalid light gray-1 value: ${lightGray1}`)
      }
      if (!darkGray1 || !darkGray1.match(/oklch\(0\.15\d/)) {
        throw new Error(`Invalid dark gray-1 value: ${darkGray1}`)
      }
    })

    this.runTest('Theme system architecture', () => {
      // Should have semantic color variables
      const expectedSemanticVars = ['--color-accent-1', '--color-accent-9', '--color-border-accent']
      
      expectedSemanticVars.forEach(variable => {
        if (!this.analysisResult.semanticVariables.includes(variable)) {
          throw new Error(`Missing semantic variable: ${variable}`)
        }
      })

      // Should have theme-specific definitions (teal is default, so check for other themes)
      if (!this.cssContent.semantic.match(/\[data-palette="blue"\]/)) {
        throw new Error('Missing blue theme definition')
      }
      if (!this.cssContent.semantic.match(/\[data-palette="mintteal"\]/)) {
        throw new Error('Missing mintteal theme definition')
      }

      // Should have default teal color mappings in :root
      if (!this.cssContent.semantic.match(/--color-accent-1:\s*var\(--teal-1\)/)) {
        throw new Error('Missing default teal color mapping')
      }
    })

    this.runTest('Variable reference chains work', () => {
      // Test chain: --background -> var(--gray-1) -> oklch(...)
      const backgroundRef = extractVariableReference(this.cssContent.shadcn, '--background')
      if (backgroundRef !== 'var(--gray-1)') {
        throw new Error(`Expected --background to reference var(--gray-1), got: ${backgroundRef}`)
      }

      // Gray-1 should resolve to OKLCH
      if (!this.analysisResult.lightModeDefinitions['--gray-1'].match(/oklch\(/)) {
        throw new Error('Light gray-1 should be OKLCH value')
      }
      if (!this.analysisResult.darkModeDefinitions['--gray-1'].match(/oklch\(/)) {
        throw new Error('Dark gray-1 should be OKLCH value')
      }
    })

    this.runTest('CSS cascade order implications', () => {
      // Check that .dark selector appears after :root in files
      const radixCSS = this.cssContent.radix
      const rootIndex = radixCSS.indexOf(':root')
      const darkIndex = radixCSS.indexOf('.dark')
      
      if (darkIndex <= rootIndex) {
        throw new Error('.dark selector should appear after :root for proper cascade')
      }
    })

    this.runTest('CSS parsing performance', () => {
      const startTime = performance.now()
      
      // Re-analyze to measure performance
      const combinedCSS = Object.values(this.cssContent).join('\n')
      analyzeCSSContent(combinedCSS)
      
      const duration = performance.now() - startTime
      if (duration > 100) {
        throw new Error(`CSS parsing too slow: ${duration.toFixed(2)}ms`)
      }
    })

    this.runTest('Build system compatibility', () => {
      // CSS should not have syntax errors (basic validation)
      Object.entries(this.cssContent).forEach(([filename, content]) => {
        const openBraces = (content.match(/\{/g) || []).length
        const closeBraces = (content.match(/\}/g) || []).length
        
        if (openBraces !== closeBraces) {
          throw new Error(`Unmatched braces in ${filename}`)
        }
      })

      // Should not have any TODO or FIXME comments
      const combinedCSS = Object.values(this.cssContent).join('\n')
      if (combinedCSS.match(/TODO|FIXME/i)) {
        throw new Error('Found TODO or FIXME comments in CSS')
      }
    })

    this.runTest('Migration readiness checklist', () => {
      const readinessCheck = {
        hasGrayVariables: this.analysisResult.grayVariables.length >= 6,
        hasShadcnVariables: this.analysisResult.shadcnVariables.length >= 4,
        hasSemanticVariables: this.analysisResult.semanticVariables.length >= 3,
        hasThemeSupport: this.cssContent.semantic.includes('data-palette'),
        hasOklchValues: this.analysisResult.oklchValues.length >= 10,
        hasLightDarkModes: Object.keys(this.analysisResult.darkModeDefinitions).length >= 3
      }

      Object.entries(readinessCheck).forEach(([check, passed]) => {
        if (!passed) {
          throw new Error(`Migration readiness failed: ${check}`)
        }
      })

      console.log('   📊 Migration readiness checklist:', readinessCheck)
    })

    return this.printSummary()
  }

  printSummary() {
    const passed = this.results.filter(r => r.passed).length
    const failed = this.results.filter(r => !r.passed).length

    console.log('\n' + '='.repeat(50))
    console.log('📋 COLOR CASCADE INTEGRATION RESULTS')
    console.log('='.repeat(50))
    
    console.log(`✅ Passed: ${passed}`)
    console.log(`❌ Failed: ${failed}`)
    console.log(`📊 Success Rate: ${((passed / this.results.length) * 100).toFixed(1)}%`)

    if (failed > 0) {
      console.log('\n❌ Failed Tests:')
      this.results.filter(r => !r.passed).forEach(result => {
        console.log(`  • ${result.name}: ${result.error}`)
      })
    }

    const success = failed === 0
    console.log(`\n🎯 Integration Status: ${success ? '✅ READY FOR MIGRATION' : '❌ ISSUES FOUND'}`)
    
    if (success) {
      console.log('\n🚀 All integration tests passed!')
      console.log('   The color system architecture is solid.')
      console.log('   You can proceed with neutral colors migration.')
    } else {
      console.log('\n⚠️  Some integration issues found. Address these first.')
    }

    console.log('='.repeat(50))
    
    return success
  }
}

/**
 * Analyze CSS content to extract variable information
 */
function analyzeCSSContent(css: string): CSSAnalysisResult {
  // Extract different types of variables
  const grayVariables = Array.from(new Set(
    (css.match(/--gray-\d+/g) || [])
  ))
  
  const shadcnVariables = Array.from(new Set(
    (css.match(/--(background|foreground|card|secondary|muted|input|ring|border|popover|accent|destructive|primary)/g) || [])
  ))
  
  const semanticVariables = Array.from(new Set(
    (css.match(/--color-(accent|neutral|border|card|interactive)-[\w-]+/g) || [])
  ))
  
  const themeVariables = Array.from(new Set(
    (css.match(/--(teal|blue|green|purple|orange|mintteal)-[\w-]+/g) || [])
  ))
  
  const oklchValues = Array.from(new Set(
    (css.match(/oklch\([^)]+\)/g) || [])
  ))
  
  const varReferences = Array.from(new Set(
    (css.match(/var\(--[^)]+\)/g) || [])
  ))

  // Extract light and dark mode definitions
  const lightModeDefinitions = extractVariableDefinitions(css, ':root')
  const darkModeDefinitions = extractVariableDefinitions(css, '.dark')

  return {
    grayVariables,
    shadcnVariables,
    semanticVariables,
    themeVariables,
    oklchValues,
    varReferences,
    lightModeDefinitions,
    darkModeDefinitions
  }
}

/**
 * Extract variable definitions from a CSS selector block
 */
function extractVariableDefinitions(css: string, selector: string): { [key: string]: string } {
  const definitions: { [key: string]: string } = {}
  
  // Create regex that handles multiple selector blocks
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`${escapedSelector}\\s*\\{([^}]+)\\}`, 'g')
  let match

  while ((match = regex.exec(css)) !== null) {
    const block = match[1]
    const varRegex = /(--[\w-]+):\s*([^;]+);/g
    let varMatch
    
    while ((varMatch = varRegex.exec(block)) !== null) {
      definitions[varMatch[1]] = varMatch[2].trim()
    }
  }
  
  return definitions
}

/**
 * Extract the reference target for a CSS variable
 */
function extractVariableReference(css: string, variable: string): string | null {
  const regex = new RegExp(`${variable}:\\s*([^;]+);`)
  const match = css.match(regex)
  return match ? match[1].trim() : null
}

// Run tests if this file is executed directly
async function main() {
  const tester = new ColorCascadeIntegrationTester()
  
  try {
    const success = await tester.runAllTests()
    
    // Exit with appropriate code
    process.exit(success ? 0 : 1)
  } catch (error) {
    console.error('\n💥 Integration test crashed:', error)
    process.exit(1)
  }
}

// Only run if this is the main module
if (require.main === module) {
  main().catch(console.error)
}

export { ColorCascadeIntegrationTester }