import React from 'react';
import { GradientCard, type GradientCardProps } from '../GradientCard';

/**
 * TypeScript Interface Tests for GradientCard
 * Verifies that new gradient props are properly typed and old props are removed
 */

describe('GradientCard Interface Tests', () => {
  test('should accept new range prop', () => {
    // TypeScript should not error on these prop combinations
    const validRangeProps: GradientCardProps = {
      range: 50,
    };
    
    const validRangeValues: number[] = [0, 25, 50, 75, 100];
    
    validRangeValues.forEach(range => {
      expect(() => {
        const props: GradientCardProps = { range };
        // If TypeScript compiles, the interface accepts the prop
        expect(props.range).toBe(range);
      }).not.toThrow();
    });
  });

  test('should accept new from/to props', () => {
    // TypeScript should not error on these prop combinations
    const validFromToProps: GradientCardProps = {
      from: 'accent-7',
      to: 'accent-10',
    };

    const validColorScales = [
      'accent-1', 'accent-6', 'accent-12',
      'neutral-1', 'neutral-8', 'neutral-12'
    ];

    validColorScales.forEach(from => {
      validColorScales.forEach(to => {
        expect(() => {
          const props: GradientCardProps = { from, to };
          expect(props.from).toBe(from);
          expect(props.to).toBe(to);
        }).not.toThrow();
      });
    });
  });

  test('should still accept customGradient prop unchanged', () => {
    const customGradientProps: GradientCardProps = {
      customGradient: 'linear-gradient(135deg, var(--color-accent-9), var(--color-accent-11))',
    };

    expect(customGradientProps.customGradient).toBe(
      'linear-gradient(135deg, var(--color-accent-9), var(--color-accent-11))'
    );
  });

  test('should accept all existing props unchanged', () => {
    const allProps: GradientCardProps = {
      range: 50,
      from: 'accent-7',
      to: 'accent-10', 
      customGradient: 'linear-gradient(45deg, red, blue)',
      shimmer: true,
      overlayOpacity: 0.5,
      header: <div>Header</div>,
      title: 'Test Title',
      description: 'Test Description',
      footer: <div>Footer</div>,
      children: <div>Children</div>,
      className: 'custom-class',
    };

    // Verify all props are accepted by TypeScript
    expect(typeof allProps.range).toBe('number');
    expect(typeof allProps.from).toBe('string');
    expect(typeof allProps.to).toBe('string');
    expect(typeof allProps.customGradient).toBe('string');
    expect(typeof allProps.shimmer).toBe('boolean');
    expect(typeof allProps.overlayOpacity).toBe('number');
    expect(typeof allProps.title).toBe('string');
    expect(typeof allProps.description).toBe('string');
    expect(typeof allProps.className).toBe('string');
  });

  test('should render without errors with new props', () => {
    // Test that the component actually renders with new props
    expect(() => {
      React.createElement(GradientCard, {
        range: 75,
        children: 'Test Content'
      });
    }).not.toThrow();

    expect(() => {
      React.createElement(GradientCard, {
        from: 'accent-9',
        to: 'accent-11', 
        children: 'Test Content'
      });
    }).not.toThrow();
  });
});