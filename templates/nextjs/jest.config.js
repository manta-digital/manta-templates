// Jest configuration for Next.js server component testing
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  
  // Test file patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)',
    '<rootDir>/src/**/*.(test|spec).(js|jsx|ts|tsx)',
    '<rootDir>/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)'
  ],
  
  // Exclude type definition files from test discovery
  testPathIgnorePatterns: [
    '<rootDir>/.next/', 
    '<rootDir>/node_modules/',
    '.*\\.d\\.ts$'
  ],
  
  // Module name mapping for absolute imports
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // Mock ui-core to avoid ESM import issues with remark
    '^@manta-templates/ui-core$': '<rootDir>/src/__tests__/__mocks__/ui-core.js',
  },
  
  // Transform files
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  
  // Transform ESM modules
  transformIgnorePatterns: [
    'node_modules/(?!(remark|remark-parse|remark-html|remark-gfm|micromark|unist-util-stringify-position|unified|vfile|bail|trough|extend)/)'
  ],
  
  // Coverage settings
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/pages/_app.tsx',
    '!src/pages/_document.tsx',
  ],
  
  // Handle static assets
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  
  // Server component testing support
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);