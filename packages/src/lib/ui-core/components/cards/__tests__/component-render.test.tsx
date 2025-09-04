/**
 * GradientCard Component Rendering Tests
 * Verifies that the GradientCard component renders correctly with new gradient system
 */

import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { GradientCard } from '../GradientCard';

describe('GradientCard Component Rendering', () => {
  test('renders with range prop', () => {
    render(
      <GradientCard range={50} title="Range Gradient Test">
        Testing range-based gradient
      </GradientCard>
    );
    
    expect(screen.getByText('Testing range-based gradient')).toBeInTheDocument();
    expect(screen.getByText('Range Gradient Test')).toBeInTheDocument();
  });

  test('renders with from/to props', () => {
    render(
      <GradientCard from="accent-7" to="accent-10" title="Advanced Gradient Test">
        Testing from/to gradient
      </GradientCard>
    );
    
    expect(screen.getByText('Testing from/to gradient')).toBeInTheDocument();
    expect(screen.getByText('Advanced Gradient Test')).toBeInTheDocument();
  });

  test('renders with customGradient prop', () => {
    render(
      <GradientCard
        customGradient="linear-gradient(135deg, var(--color-accent-9), var(--color-accent-11))"
        title="Custom Gradient Test"
      >
        Testing custom gradient
      </GradientCard>
    );
    
    expect(screen.getByText('Testing custom gradient')).toBeInTheDocument();
    expect(screen.getByText('Custom Gradient Test')).toBeInTheDocument();
  });

  test('renders with all props', () => {
    render(
      <GradientCard
        from="accent-9"
        to="accent-11"
        shimmer={true}
        overlayOpacity={0.3}
        title="Full Props Test"
        description="Testing all component functionality"
        header={<div>Header Content</div>}
        footer={<div>Footer Content</div>}
      >
        Testing full component with all features
      </GradientCard>
    );
    
    expect(screen.getByText('Testing full component with all features')).toBeInTheDocument();
    expect(screen.getByText('Full Props Test')).toBeInTheDocument();
    expect(screen.getByText('Testing all component functionality')).toBeInTheDocument();
    expect(screen.getByText('Header Content')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  test('renders with default gradient fallback', () => {
    render(
      <GradientCard title="Default Gradient Test">
        Testing default fallback gradient
      </GradientCard>
    );
    
    expect(screen.getByText('Testing default fallback gradient')).toBeInTheDocument();
    expect(screen.getByText('Default Gradient Test')).toBeInTheDocument();
  });

  test('applies correct gradient classes', () => {
    const { container } = render(
      <GradientCard range={50} data-testid="gradient-card">
        Test content
      </GradientCard>
    );
    
    const card = container.querySelector('[data-testid="gradient-card"]');
    expect(card).toHaveClass('bg-gradient-to-br');
  });

  test('applies custom styles when customGradient is provided', () => {
    const customGradient = 'linear-gradient(135deg, red, blue)';
    const { container } = render(
      <GradientCard customGradient={customGradient} data-testid="custom-gradient">
        Test content
      </GradientCard>
    );
    
    const card = container.querySelector('[data-testid="custom-gradient"]');
    expect(card).toHaveStyle({ background: customGradient });
  });
});