import { GradientCardProps } from '../GradientCard';

/**
 * TypeScript Interface Verification
 * If this file compiles without errors, our interface changes are working correctly
 */

// Test 1: New range prop should be accepted
const rangeProps: GradientCardProps = {
  range: 50,
};

// Test 2: New from/to props should be accepted  
const fromToProps: GradientCardProps = {
  from: 'accent-7',
  to: 'accent-10',
};

// Test 3: CustomGradient should still work
const customProps: GradientCardProps = {
  customGradient: 'linear-gradient(135deg, var(--color-accent-9), var(--color-accent-11))',
};

// Test 4: All props together should work
const allProps: GradientCardProps = {
  range: 75,
  from: 'accent-9', 
  to: 'accent-11',
  customGradient: 'linear-gradient(45deg, red, blue)',
  shimmer: true,
  overlayOpacity: 0.5,
  title: 'Test Title',
  description: 'Test Description',
};

// Test 5: Original props should still work
const originalProps: GradientCardProps = {
  shimmer: false,
  overlayOpacity: 0.3,
  header: 'Header content',
  title: 'Card Title',
  description: 'Card Description',
  footer: 'Footer content',
  className: 'custom-class',
};

console.log('✅ Interface verification passed - all prop combinations compile successfully');
console.log('Range prop:', typeof rangeProps.range);
console.log('From/To props:', typeof fromToProps.from, typeof fromToProps.to);
console.log('CustomGradient prop:', typeof customProps.customGradient);
console.log('All combinations work correctly!');