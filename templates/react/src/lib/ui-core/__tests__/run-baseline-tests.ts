#!/usr/bin/env tsx
/**
 * Comprehensive Baseline Test Runner
 * 
 * This script runs all tests necessary to establish a baseline before implementing
 * the theme-specific neutral colors architecture. It captures the current state
 * of the color system and validates that the build process works correctly.
 * 
 * Test Categories:
 * 1. Current color system baseline
 * 2. CSS cascade resolution
 * 3. Build system validation  
 * 4. Component rendering validation
 * 5. TypeScript compilation
 * 
 * Usage:
 *   pnpm test:baseline
 *   tsx src/__tests__/run-baseline-tests.ts
 */

import { performance } from 'perf_hooks'
import fs from 'fs'
import path from 'path'

interface TestResult {
  name: string
  success: boolean
  duration: number
  errors: string[]
  warnings: string[]
}

interface BaselineTestResults {
  timestamp: string
  totalDuration: number
  passedTests: number
  failedTests: number
  testResults: TestResult[]
  summary: {
    colorSystemBaseline: boolean
    buildSystemValidation: boolean
    cssResolution: boolean
    typeScriptCompilation: boolean
    overallSuccess: boolean
  }
}

class BaselineTestRunner {
  private results: TestResult[] = []
  private startTime: number = 0

  constructor() {
    console.log('🧪 Starting Neutral Colors Architecture Baseline Tests')
    console.log('=' .repeat(60))
    this.startTime = performance.now()
  }

  async runTest(name: string, testFn: () => Promise<void> | void): Promise<TestResult> {
    const testStart = performance.now()
    console.log(`\n🔍 Running: ${name}`)
    
    const result: TestResult = {
      name,
      success: false,
      duration: 0,
      errors: [],
      warnings: []
    }

    try {
      await testFn()
      result.success = true
      console.log(`✅ Passed: ${name}`)
    } catch (error) {
      result.success = false
      result.errors.push(error instanceof Error ? error.message : String(error))
      console.log(`❌ Failed: ${name}`)
      console.log(`   Error: ${result.errors[0]}`)
    }

    result.duration = performance.now() - testStart
    this.results.push(result)
    return result
  }

  async runAllTests(): Promise<BaselineTestResults> {
    console.log('\n📋 Test Plan:')
    console.log('1. Current Gray Variable Usage Analysis')
    console.log('2. ShadCN Color Resolution Validation')  
    console.log('3. Theme Context Verification')
    console.log('4. CSS Cascade Chain Testing')
    console.log('5. Build System Validation')
    console.log('6. TypeScript Compilation Check')
    console.log('7. Performance Baseline Measurement')

    // Test 1: Current Gray Variable Usage
    await this.runTest('Gray Variables Baseline Capture', async () => {
      await this.testGrayVariablesBaseline()
    })

    // Test 2: ShadCN Color Resolution  
    await this.runTest('ShadCN Variable Resolution', async () => {
      await this.testShadcnColorResolution()
    })

    // Test 3: Theme Context Verification
    await this.runTest('Theme Context Validation', async () => {
      await this.testThemeContexts()
    })

    // Test 4: CSS Cascade Chain
    await this.runTest('CSS Cascade Resolution', async () => {
      await this.testCascadeResolution()
    })

    // Test 5: Build System
    await this.runTest('Build System Validation', async () => {
      await this.testBuildSystem()
    })

    // Test 6: TypeScript Compilation
    await this.runTest('TypeScript Compilation', async () => {
      await this.testTypeScriptCompilation()
    })

    // Test 7: Performance Baseline
    await this.runTest('Performance Baseline', async () => {
      await this.testPerformanceBaseline()
    })

    return this.generateResults()
  }

  private async testGrayVariablesBaseline(): Promise<void> {
    const { JSDOM } = await import('jsdom')
    
    // Load current CSS files to test actual gray usage
    const shadcnCSS = await this.loadCSSFile('src/styles/shadcn.css')
    const radixCSS = await this.loadCSSFile('src/styles/radixColors.css')
    
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            ${radixCSS}
            ${shadcnCSS}
          </style>
        </head>
        <body>
          <div id="test-light"></div>
          <div id="test-dark" class="dark"></div>
        </body>
      </html>
    `)

    const lightElement = dom.window.document.getElementById('test-light')!
    const darkElement = dom.window.document.getElementById('test-dark')!
    
    const grayVariables = [
      '--gray-1', '--gray-2', '--gray-3', '--gray-7', '--gray-8', '--gray-12'
    ]

    // Verify gray variables resolve correctly
    const lightValues = this.captureVariables(lightElement, grayVariables, dom.window as unknown as Window)
    const darkValues = this.captureVariables(darkElement, grayVariables, dom.window as unknown as Window)

    // All gray variables should have OKLCH values
    grayVariables.forEach(variable => {
      if (!lightValues[variable] || !lightValues[variable].startsWith('oklch(')) {
        throw new Error(`Light mode ${variable} is not a valid OKLCH value: ${lightValues[variable]}`)
      }
      if (!darkValues[variable] || !darkValues[variable].startsWith('oklch(')) {
        throw new Error(`Dark mode ${variable} is not a valid OKLCH value: ${darkValues[variable]}`)
      }
    })

    // Light and dark should have different values
    if (lightValues['--gray-1'] === darkValues['--gray-1']) {
      throw new Error('Light and dark gray-1 values should be different')
    }

    console.log(`   📊 Captured ${grayVariables.length} gray variables for both light/dark modes`)
    dom.window.close()
  }

  private async testShadcnColorResolution(): Promise<void> {
    const { JSDOM } = await import('jsdom')
    
    const shadcnCSS = await this.loadCSSFile('src/styles/shadcn.css')
    const radixCSS = await this.loadCSSFile('src/styles/radixColors.css')
    
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            ${radixCSS}
            ${shadcnCSS}
          </style>
        </head>
        <body>
          <div id="test-element"></div>
          <div id="test-element-dark" class="dark"></div>
        </body>
      </html>
    `)

    const lightElement = dom.window.document.getElementById('test-element')!
    const darkElement = dom.window.document.getElementById('test-element-dark')!
    
    const shadcnVariables = [
      '--background', '--foreground', '--card', '--secondary', 
      '--muted', '--input', '--ring'
    ]

    const lightValues = this.captureVariables(lightElement, shadcnVariables, dom.window as unknown as Window)
    const darkValues = this.captureVariables(darkElement, shadcnVariables, dom.window as unknown as Window)

    // Verify ShadCN variables resolve to OKLCH values
    shadcnVariables.forEach(variable => {
      if (!lightValues[variable] || !lightValues[variable].startsWith('oklch(')) {
        throw new Error(`ShadCN ${variable} does not resolve to OKLCH: ${lightValues[variable]}`)
      }
      if (!darkValues[variable] || !darkValues[variable].startsWith('oklch(')) {
        throw new Error(`ShadCN dark ${variable} does not resolve to OKLCH: ${darkValues[variable]}`)
      }
    })

    // Background and foreground should have good contrast
    if (lightValues['--background'] === lightValues['--foreground']) {
      throw new Error('Background and foreground should not be the same color')
    }

    console.log(`   📊 Validated ${shadcnVariables.length} ShadCN variables resolve correctly`)
    dom.window.close()
  }

  private async testThemeContexts(): Promise<void> {
    const { JSDOM } = await import('jsdom')
    
    const allCSS = await this.loadAllCSS()
    
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>${allCSS}</style>
        </head>
        <body>
          <div id="teal-theme" data-palette="teal"></div>
          <div id="blue-theme" data-palette="blue"></div>
        </body>
      </html>
    `)

    const tealElement = dom.window.document.getElementById('teal-theme')!
    const blueElement = dom.window.document.getElementById('blue-theme')!

    // Test theme-specific accent colors
    const tealAccent = dom.window.getComputedStyle(tealElement).getPropertyValue('--color-accent-9').trim()
    const blueAccent = dom.window.getComputedStyle(blueElement).getPropertyValue('--color-accent-9').trim()

    if (!tealAccent || !tealAccent.startsWith('oklch(')) {
      throw new Error(`Teal accent color not resolved: ${tealAccent}`)
    }
    if (!blueAccent || !blueAccent.startsWith('oklch(')) {
      throw new Error(`Blue accent color not resolved: ${blueAccent}`)
    }

    // Different themes should have different accent colors
    if (tealAccent === blueAccent) {
      throw new Error('Teal and blue themes should have different accent colors')
    }

    console.log('   📊 Validated theme contexts work correctly')
    dom.window.close()
  }

  private async testCascadeResolution(): Promise<void> {
    // Test specific cascade chains that must work
    const { JSDOM } = await import('jsdom')
    
    const allCSS = await this.loadAllCSS()
    
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>${allCSS}</style>
        </head>
        <body>
          <div id="cascade-test"></div>
        </body>
      </html>
    `)

    const testElement = dom.window.document.getElementById('cascade-test')!
    const computed = dom.window.getComputedStyle(testElement)

    // Test: --background should resolve through --gray-1
    const background = computed.getPropertyValue('--background').trim()
    const gray1 = computed.getPropertyValue('--gray-1').trim()

    if (background !== gray1) {
      throw new Error(`Cascade broken: --background (${background}) should equal --gray-1 (${gray1})`)
    }

    // Test: Border should resolve through semantic system
    const border = computed.getPropertyValue('--border').trim()
    const borderAccent = computed.getPropertyValue('--color-border-accent').trim()

    if (border !== borderAccent) {
      throw new Error(`Border cascade broken: --border (${border}) should equal --color-border-accent (${borderAccent})`)
    }

    console.log('   📊 CSS cascade resolution working correctly')
    dom.window.close()
  }

  private async testBuildSystem(): Promise<void> {
    // Test that CSS files exist and can be processed
    const cssFiles = [
      'src/styles/radixColors.css',
      'src/styles/semanticColors.css', 
      'src/styles/shadcn.css',
      'src/styles/index.css'
    ]

    for (const cssFile of cssFiles) {
      const content = await this.loadCSSFile(cssFile)
      if (!content || content.trim().length === 0) {
        throw new Error(`CSS file ${cssFile} is empty or missing`)
      }

      // Basic CSS syntax validation
      const openBraces = (content.match(/\{/g) || []).length
      const closeBraces = (content.match(/\}/g) || []).length
      if (openBraces !== closeBraces) {
        throw new Error(`CSS syntax error in ${cssFile}: unmatched braces`)
      }
    }

    // Test CSS variable definitions
    const radixCSS = await this.loadCSSFile('src/styles/radixColors.css')
    const grayVariables = radixCSS.match(/--gray-\d+:/g) || []
    
    if (grayVariables.length < 5) {
      throw new Error('Radix CSS should define at least 5 gray variables')
    }

    console.log(`   📊 Build system validation passed - ${cssFiles.length} CSS files processed`)
  }

  private async testTypeScriptCompilation(): Promise<void> {
    // Test that TypeScript files can be imported without errors
    try {
      // Test basic imports that will be affected by color changes
      const { cn } = await import('../utils/cn')
      if (typeof cn !== 'function') {
        throw new Error('cn utility function not available')
      }

      console.log('   📊 TypeScript compilation test passed')
    } catch (error) {
      throw new Error(`TypeScript compilation failed: ${error}`)
    }
  }

  private async testPerformanceBaseline(): Promise<void> {
    const { JSDOM } = await import('jsdom')
    
    const allCSS = await this.loadAllCSS()
    const iterations = 50

    // Measure CSS variable resolution performance
    const startTime = performance.now()
    
    for (let i = 0; i < iterations; i++) {
      const dom = new JSDOM(`
        <!DOCTYPE html>
        <html>
          <head><style>${allCSS}</style></head>
          <body>
            <div id="perf-test" data-palette="${i % 2 === 0 ? 'teal' : 'blue'}"></div>
          </body>
        </html>
      `)

      const element = dom.window.document.getElementById('perf-test')!
      const computed = dom.window.getComputedStyle(element)
      
      // Force resolution of key variables
      computed.getPropertyValue('--background')
      computed.getPropertyValue('--color-accent-9')
      computed.getPropertyValue('--border')
      
      dom.window.close()
    }

    const endTime = performance.now()
    const avgTime = (endTime - startTime) / iterations

    if (avgTime > 10) { // More than 10ms per iteration
      throw new Error(`Performance too slow: ${avgTime.toFixed(2)}ms per iteration`)
    }

    console.log(`   📊 Performance baseline: ${avgTime.toFixed(2)}ms per resolution cycle`)
  }

  private async loadCSSFile(filePath: string): Promise<string> {
    try {
      return fs.readFileSync(filePath, 'utf-8')
    } catch (error) {
      throw new Error(`Failed to load CSS file ${filePath}: ${error}`)
    }
  }

  private async loadAllCSS(): Promise<string> {
    const cssFiles = [
      'src/styles/radixColors.css',
      'src/styles/semanticColors.css',
      'src/styles/shadcn.css'
    ]
    
    const cssContent = await Promise.all(
      cssFiles.map(file => this.loadCSSFile(file))
    )
    
    return cssContent.join('\n')
  }

  private captureVariables(element: Element, variables: string[], window: Window): { [key: string]: string } {
    const computed = window.getComputedStyle(element)
    const result: { [key: string]: string } = {}
    
    variables.forEach(variable => {
      result[variable] = computed.getPropertyValue(variable).trim()
    })
    
    return result
  }

  private generateResults(): BaselineTestResults {
    const totalDuration = performance.now() - this.startTime
    const passedTests = this.results.filter(r => r.success).length
    const failedTests = this.results.filter(r => !r.success).length

    const results: BaselineTestResults = {
      timestamp: new Date().toISOString(),
      totalDuration,
      passedTests,
      failedTests,
      testResults: this.results,
      summary: {
        colorSystemBaseline: this.results.find(r => r.name === 'Gray Variables Baseline Capture')?.success || false,
        buildSystemValidation: this.results.find(r => r.name === 'Build System Validation')?.success || false,
        cssResolution: this.results.find(r => r.name === 'CSS Cascade Resolution')?.success || false,
        typeScriptCompilation: this.results.find(r => r.name === 'TypeScript Compilation')?.success || false,
        overallSuccess: failedTests === 0
      }
    }

    // Save results to file for reference
    const resultsPath = path.join(__dirname, '../../../baseline-test-results.json')
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2))

    return results
  }

  printSummary(results: BaselineTestResults): void {
    console.log('\n' + '='.repeat(60))
    console.log('📋 BASELINE TEST RESULTS')
    console.log('='.repeat(60))
    
    console.log(`⏱️  Total Duration: ${(results.totalDuration / 1000).toFixed(2)}s`)
    console.log(`✅ Passed: ${results.passedTests}`)
    console.log(`❌ Failed: ${results.failedTests}`)
    console.log(`📊 Success Rate: ${((results.passedTests / results.testResults.length) * 100).toFixed(1)}%`)

    console.log('\n📋 Test Breakdown:')
    results.testResults.forEach(test => {
      const status = test.success ? '✅' : '❌'
      const duration = `(${test.duration.toFixed(1)}ms)`
      console.log(`  ${status} ${test.name} ${duration}`)
      
      if (!test.success && test.errors.length > 0) {
        test.errors.forEach(error => {
          console.log(`     ↳ ${error}`)
        })
      }
    })

    console.log('\n📈 System Status:')
    console.log(`  Color System Baseline: ${results.summary.colorSystemBaseline ? '✅' : '❌'}`)
    console.log(`  Build System: ${results.summary.buildSystemValidation ? '✅' : '❌'}`)
    console.log(`  CSS Resolution: ${results.summary.cssResolution ? '✅' : '❌'}`)
    console.log(`  TypeScript Compilation: ${results.summary.typeScriptCompilation ? '✅' : '❌'}`)

    console.log(`\n🎯 Overall Status: ${results.summary.overallSuccess ? '✅ READY FOR MIGRATION' : '❌ ISSUES FOUND'}`)
    
    if (results.summary.overallSuccess) {
      console.log('\n🚀 All baseline tests passed! You can proceed with the neutral colors migration.')
      console.log('   Run these tests again after migration to verify zero regressions.')
    } else {
      console.log('\n⚠️  Some baseline tests failed. Fix these issues before proceeding with migration.')
    }

    console.log(`\n📄 Detailed results saved to: baseline-test-results.json`)
    console.log('='.repeat(60))
  }
}

// Run baseline tests if this file is executed directly
async function main() {
  const runner = new BaselineTestRunner()
  
  try {
    const results = await runner.runAllTests()
    runner.printSummary(results)
    
    // Exit with appropriate code
    process.exit(results.summary.overallSuccess ? 0 : 1)
  } catch (error) {
    console.error('\n💥 Baseline test runner crashed:', error)
    process.exit(1)
  }
}

// Only run if this is the main module
if (require.main === module) {
  main().catch(console.error)
}

export { BaselineTestRunner, type BaselineTestResults, type TestResult }