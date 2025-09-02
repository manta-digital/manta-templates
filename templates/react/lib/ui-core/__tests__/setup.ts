import '@testing-library/jest-dom';

// Global test setup for Vitest + React Testing Library
// This file is automatically loaded before each test file

// Extend Vitest's expect with jest-dom matchers
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);