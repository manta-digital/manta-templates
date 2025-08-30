import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: [
      'node_modules/**',
      'dist/**',
      'src/__tests__/styles/**', // Keep existing custom style tests separate
      'src/__tests__/visual/**',
      'src/__tests__/build/**',
      'src/__tests__/integration/**',
      'src/__tests__/run-baseline-tests.ts',
      'src/__tests__/content.test.ts', // Keep existing custom content tests
      'src/__tests__/header.test.ts'   // Keep existing custom header tests
    ]
  },
  esbuild: {
    jsx: 'automatic'
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});