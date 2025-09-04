/**
 * GradientCard Theme-Aware Functionality Tests
 * Comprehensive test suite for the new gradient system
 */

import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { GradientCard } from '../GradientCard';

describe('GradientCard Theme-Aware Functionality', () => {
  // Mock console.warn to capture validation warnings
  const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

  beforeEach(() => {
    consoleWarnSpy.mockClear();
  });

  describe('Gradient System Validation', () => {
    test('warns when both range and from/to props are provided', () => {
      render(
        <GradientCard range={50} from="accent-7" to="accent-10">
          Test content
        </GradientCard>
      );

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'GradientCard: Cannot use both range and from/to props. Range will be ignored.'
      );
    });

    test('warns when from is provided without to', () => {
      render(
        <GradientCard from="accent-7">
          Test content
        </GradientCard>
      );

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'GradientCard: Both from and to props must be provided together for advanced gradients.'
      );
    });

    test('warns when to is provided without from', () => {
      render(
        <GradientCard to="accent-10">
          Test content
        </GradientCard>
      );

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'GradientCard: Both from and to props must be provided together for advanced gradients.'
      );
    });
  });

  describe('Range-Based Gradients', () => {
    test('renders with range=0 (minimal gradient)', () => {
      const { container } = render(
        <GradientCard range={0} data-testid="gradient-card">
          Minimal gradient
        </GradientCard>
      );

      const card = container.querySelector('[data-testid="gradient-card"]');
      expect(card).toHaveClass('bg-gradient-to-br');
      expect(screen.getByText('Minimal gradient')).toBeInTheDocument();
    });

    test('renders with range=50 (moderate gradient)', () => {
      const { container } = render(
        <GradientCard range={50} data-testid="gradient-card">
          Moderate gradient
        </GradientCard>
      );

      const card = container.querySelector('[data-testid="gradient-card"]');
      expect(card).toHaveClass('bg-gradient-to-br');
      expect(screen.getByText('Moderate gradient')).toBeInTheDocument();
    });

    test('renders with range=100 (maximum gradient)', () => {
      const { container } = render(
        <GradientCard range={100} data-testid="gradient-card">
          Maximum gradient
        </GradientCard>
      );

      const card = container.querySelector('[data-testid="gradient-card"]');
      expect(card).toHaveClass('bg-gradient-to-br');
      expect(screen.getByText('Maximum gradient')).toBeInTheDocument();
    });
  });

  describe('Accent-to-Accent Gradients', () => {
    test('renders with from="accent-7" to="accent-10"', () => {
      const { container } = render(
        <GradientCard from="accent-7" to="accent-10" data-testid="gradient-card">
          Accent gradient
        </GradientCard>
      );

      const card = container.querySelector('[data-testid="gradient-card"]');
      expect(card).toHaveClass('bg-gradient-to-br');
      expect(screen.getByText('Accent gradient')).toBeInTheDocument();
    });

    test('renders with mixed color types', () => {
      const { container } = render(
        <GradientCard from="neutral-3" to="accent-8" data-testid="gradient-card">
          Mixed gradient
        </GradientCard>
      );

      const card = container.querySelector('[data-testid="gradient-card"]');
      expect(card).toHaveClass('bg-gradient-to-br');
      expect(screen.getByText('Mixed gradient')).toBeInTheDocument();
    });
  });

  describe('Custom Gradients', () => {
    test('renders with customGradient override', () => {
      const customGradient = 'linear-gradient(135deg, red, blue)';
      const { container } = render(
        <GradientCard customGradient={customGradient} data-testid="gradient-card">
          Custom gradient
        </GradientCard>
      );

      const card = container.querySelector('[data-testid="gradient-card"]');
      expect(card).toHaveStyle({ background: customGradient });
      expect(screen.getByText('Custom gradient')).toBeInTheDocument();
    });

    test('customGradient overrides range prop', () => {
      const customGradient = 'linear-gradient(45deg, green, purple)';
      const { container } = render(
        <GradientCard 
          range={50} 
          customGradient={customGradient} 
          data-testid="gradient-card"
        >
          Override test
        </GradientCard>
      );

      const card = container.querySelector('[data-testid="gradient-card"]');
      expect(card).toHaveStyle({ background: customGradient });
      expect(screen.getByText('Override test')).toBeInTheDocument();
    });

    test('customGradient overrides from/to props', () => {
      const customGradient = 'linear-gradient(90deg, yellow, orange)';
      const { container } = render(
        <GradientCard 
          from="accent-7" 
          to="accent-10" 
          customGradient={customGradient} 
          data-testid="gradient-card"
        >
          Override test
        </GradientCard>
      );

      const card = container.querySelector('[data-testid="gradient-card"]');
      expect(card).toHaveStyle({ background: customGradient });
      expect(screen.getByText('Override test')).toBeInTheDocument();
    });
  });

  describe('Default Behavior', () => {
    test('renders with default gradient when no gradient props provided', () => {
      const { container } = render(
        <GradientCard data-testid="gradient-card">
          Default gradient
        </GradientCard>
      );

      const card = container.querySelector('[data-testid="gradient-card"]');
      expect(card).toHaveClass('bg-gradient-to-br');
      expect(screen.getByText('Default gradient')).toBeInTheDocument();
    });
  });

  describe('Additional Props', () => {
    test('renders with shimmer effect', () => {
      const { container } = render(
        <GradientCard range={50} shimmer={true} data-testid="gradient-card">
          Shimmer test
        </GradientCard>
      );

      const card = container.querySelector('[data-testid="gradient-card"]');
      expect(card).toHaveClass('before:bg-gradient-to-r');
      expect(screen.getByText('Shimmer test')).toBeInTheDocument();
    });

    test('renders with overlay opacity', () => {
      render(
        <GradientCard range={50} overlayOpacity={0.5}>
          Overlay test
        </GradientCard>
      );

      expect(screen.getByText('Overlay test')).toBeInTheDocument();
    });

    test('renders with title and description', () => {
      render(
        <GradientCard 
          from="accent-7" 
          to="accent-10"
          title="Test Title"
          description="Test Description"
        >
          Content test
        </GradientCard>
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('Content test')).toBeInTheDocument();
    });

    test('renders with header and footer', () => {
      render(
        <GradientCard 
          range={25}
          header={<div>Header Content</div>}
          footer={<div>Footer Content</div>}
        >
          Main content
        </GradientCard>
      );

      expect(screen.getByText('Header Content')).toBeInTheDocument();
      expect(screen.getByText('Main content')).toBeInTheDocument();
      expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });
  });

  describe('Theme System Integration', () => {
    test('applies theme-aware CSS custom properties', () => {
      const { container } = render(
        <GradientCard from="accent-9" to="accent-11" data-testid="gradient-card">
          Theme test
        </GradientCard>
      );

      const card = container.querySelector('[data-testid="gradient-card"]');
      expect(card).toHaveClass('bg-gradient-to-br');
      
      // Check that the card has the CSS custom property set
      const computedStyle = window.getComputedStyle(card!);
      expect(computedStyle.getPropertyValue('--card-foreground')).toBe('#fff');
    });
  });
});