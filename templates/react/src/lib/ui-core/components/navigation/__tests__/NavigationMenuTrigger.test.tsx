import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavigationMenuTrigger } from '../NavigationMenuTrigger';
import { NavigationMenuItem } from '../../../types/navigation';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ChevronDown: ({ size, className }: { size?: number; className?: string }) => (
    <span data-testid="chevron-down" data-size={size} className={className}>⌄</span>
  ),
  ChevronUp: ({ size, className }: { size?: number; className?: string }) => (
    <span data-testid="chevron-up" data-size={size} className={className}>⌃</span>
  ),
  Home: ({ size, className }: { size?: number; className?: string }) => (
    <span data-testid="home-icon" data-size={size} className={className}>🏠</span>
  ),
  User: ({ size, className }: { size?: number; className?: string }) => (
    <span data-testid="user-icon" data-size={size} className={className}>👤</span>
  ),
}));

describe('NavigationMenuTrigger', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic functionality', () => {
    const basicItem: NavigationMenuItem = {
      label: 'Products',
      children: [
        { label: 'Web Apps', href: '/web-apps' }
      ]
    };

    it('renders trigger with label correctly', () => {
      render(
        <NavigationMenuTrigger 
          item={basicItem}
          onClick={mockOnClick}
        />
      );

      expect(screen.getByTestId('navigation-menu-trigger')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
    });

    it('renders with default ChevronDown indicator', () => {
      render(
        <NavigationMenuTrigger 
          item={basicItem}
          onClick={mockOnClick}
        />
      );

      expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
      expect(screen.getByTestId('chevron-down')).toHaveAttribute('data-size', '16');
    });

    it('handles click events', () => {
      render(
        <NavigationMenuTrigger 
          item={basicItem}
          onClick={mockOnClick}
        />
      );

      fireEvent.click(screen.getByTestId('navigation-menu-trigger'));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('includes proper ARIA attributes', () => {
      render(
        <NavigationMenuTrigger 
          item={basicItem}
          onClick={mockOnClick}
        />
      );

      const trigger = screen.getByTestId('navigation-menu-trigger');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-haspopup', 'true');
      expect(trigger).toHaveAttribute('aria-label', 'Products menu');
    });
  });

  describe('Variants', () => {
    const item: NavigationMenuItem = {
      label: 'Test Item'
    };

    it('applies default variant correctly', () => {
      render(
        <NavigationMenuTrigger 
          item={item}
          variant="default"
          onClick={mockOnClick}
        />
      );

      const trigger = screen.getByTestId('navigation-menu-trigger');
      expect(trigger).toHaveClass('text-accent-11');
    });

    it('applies ghost variant correctly', () => {
      render(
        <NavigationMenuTrigger 
          item={item}
          variant="ghost"
          onClick={mockOnClick}
        />
      );

      const trigger = screen.getByTestId('navigation-menu-trigger');
      expect(trigger).toHaveClass('text-foreground');
    });

    it('applies subtle variant correctly', () => {
      render(
        <NavigationMenuTrigger 
          item={item}
          variant="subtle"
          onClick={mockOnClick}
        />
      );

      const trigger = screen.getByTestId('navigation-menu-trigger');
      expect(trigger).toHaveClass('text-muted-foreground');
    });
  });

  describe('Sizes', () => {
    const item: NavigationMenuItem = {
      label: 'Test Item'
    };

    it('applies small size correctly', () => {
      render(
        <NavigationMenuTrigger 
          item={item}
          size="sm"
          onClick={mockOnClick}
        />
      );

      const trigger = screen.getByTestId('navigation-menu-trigger');
      expect(trigger).toHaveClass('px-2', 'py-1', 'text-sm');
      
      // Check indicator icon size
      const indicator = screen.getByTestId('chevron-down');
      expect(indicator).toHaveAttribute('data-size', '14');
    });

    it('applies default size correctly', () => {
      render(
        <NavigationMenuTrigger 
          item={item}
          size="default"
          onClick={mockOnClick}
        />
      );

      const trigger = screen.getByTestId('navigation-menu-trigger');
      expect(trigger).toHaveClass('px-3', 'py-2');
      
      const indicator = screen.getByTestId('chevron-down');
      expect(indicator).toHaveAttribute('data-size', '16');
    });

    it('applies large size correctly', () => {
      render(
        <NavigationMenuTrigger 
          item={item}
          size="lg"
          onClick={mockOnClick}
        />
      );

      const trigger = screen.getByTestId('navigation-menu-trigger');
      expect(trigger).toHaveClass('px-4', 'py-3', 'text-lg');
      
      const indicator = screen.getByTestId('chevron-down');
      expect(indicator).toHaveAttribute('data-size', '20');
    });
  });

  describe('Active state', () => {
    const item: NavigationMenuItem = {
      label: 'Active Item'
    };

    it('applies active styling when active prop is true', () => {
      render(
        <NavigationMenuTrigger 
          item={item}
          active={true}
          onClick={mockOnClick}
        />
      );

      const trigger = screen.getByTestId('navigation-menu-trigger');
      expect(trigger).toHaveClass('bg-accent', 'text-accent-foreground');
    });

    it('does not apply active styling when active prop is false', () => {
      render(
        <NavigationMenuTrigger 
          item={item}
          active={false}
          onClick={mockOnClick}
        />
      );

      const trigger = screen.getByTestId('navigation-menu-trigger');
      expect(trigger).not.toHaveClass('bg-accent', 'text-accent-foreground');
    });
  });

  describe('Icon support', () => {
    const itemWithIcon: NavigationMenuItem = {
      label: 'Home',
      icon: 'Home'
    };

    it('renders item icon correctly', () => {
      render(
        <NavigationMenuTrigger 
          item={itemWithIcon}
          onClick={mockOnClick}
        />
      );

      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
      expect(screen.getByTestId('home-icon')).toHaveAttribute('data-size', '16');
    });

    it('renders item icon with correct size for different trigger sizes', () => {
      const { rerender } = render(
        <NavigationMenuTrigger 
          item={itemWithIcon}
          size="sm"
          onClick={mockOnClick}
        />
      );

      expect(screen.getByTestId('home-icon')).toHaveAttribute('data-size', '14');

      rerender(
        <NavigationMenuTrigger 
          item={itemWithIcon}
          size="lg"
          onClick={mockOnClick}
        />
      );

      expect(screen.getByTestId('home-icon')).toHaveAttribute('data-size', '20');
    });
  });

  describe('Badge support', () => {
    const itemWithBadge: NavigationMenuItem = {
      label: 'Messages',
      badge: '3'
    };

    it('renders badge correctly', () => {
      render(
        <NavigationMenuTrigger 
          item={itemWithBadge}
          onClick={mockOnClick}
        />
      );

      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByLabelText('Badge: 3')).toBeInTheDocument();
    });

    it('applies correct badge styling for different sizes', () => {
      const { rerender } = render(
        <NavigationMenuTrigger 
          item={itemWithBadge}
          size="sm"
          onClick={mockOnClick}
        />
      );

      let badge = screen.getByText('3');
      expect(badge).toHaveClass('px-1.5', 'py-0.5', 'text-xs');

      rerender(
        <NavigationMenuTrigger 
          item={itemWithBadge}
          size="lg"
          onClick={mockOnClick}
        />
      );

      badge = screen.getByText('3');
      expect(badge).toHaveClass('px-2.5', 'py-1', 'text-sm');
    });
  });

  describe('Custom indicator', () => {
    const item: NavigationMenuItem = {
      label: 'Custom Indicator'
    };

    it('renders custom indicator icon', () => {
      render(
        <NavigationMenuTrigger 
          item={item}
          indicatorIcon="ChevronUp"
          onClick={mockOnClick}
        />
      );

      expect(screen.getByTestId('chevron-up')).toBeInTheDocument();
      expect(screen.queryByTestId('chevron-down')).not.toBeInTheDocument();
    });

    it('hides indicator when showIndicator is false', () => {
      render(
        <NavigationMenuTrigger 
          item={item}
          showIndicator={false}
          onClick={mockOnClick}
        />
      );

      expect(screen.queryByTestId('chevron-down')).not.toBeInTheDocument();
      expect(screen.queryByTestId('chevron-up')).not.toBeInTheDocument();
    });

    it('applies transition classes to indicator', () => {
      render(
        <NavigationMenuTrigger 
          item={item}
          onClick={mockOnClick}
        />
      );

      const indicator = screen.getByTestId('chevron-down');
      expect(indicator).toHaveClass(
        'shrink-0',
        'transition-transform',
        'duration-200',
        'data-[state=open]:rotate-180',
        'group-hover:scale-110'
      );
    });
  });

  describe('Custom children', () => {
    const item: NavigationMenuItem = {
      label: 'With Children'
    };

    it('renders custom children content', () => {
      render(
        <NavigationMenuTrigger 
          item={item}
          onClick={mockOnClick}
        >
          <span data-testid="custom-content">Custom Content</span>
        </NavigationMenuTrigger>
      );

      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    const item: NavigationMenuItem = {
      label: 'Custom Class'
    };

    it('applies custom className correctly', () => {
      render(
        <NavigationMenuTrigger 
          item={item}
          className="custom-trigger-class"
          onClick={mockOnClick}
        />
      );

      const trigger = screen.getByTestId('navigation-menu-trigger');
      expect(trigger).toHaveClass('custom-trigger-class');
    });
  });

  describe('Complex combinations', () => {
    const complexItem: NavigationMenuItem = {
      label: 'Complex Item',
      icon: 'User',
      badge: 'New'
    };

    it('renders item with icon, badge, and custom indicator together', () => {
      render(
        <NavigationMenuTrigger 
          item={complexItem}
          variant="ghost"
          size="lg"
          indicatorIcon="ChevronUp"
          active={true}
          onClick={mockOnClick}
        >
          <span data-testid="extra-content">Extra</span>
        </NavigationMenuTrigger>
      );

      // Check all elements are present
      expect(screen.getByTestId('user-icon')).toBeInTheDocument();
      expect(screen.getByText('Complex Item')).toBeInTheDocument();
      expect(screen.getByText('New')).toBeInTheDocument();
      expect(screen.getByTestId('chevron-up')).toBeInTheDocument();
      expect(screen.getByTestId('extra-content')).toBeInTheDocument();

      // Check styling combinations
      const trigger = screen.getByTestId('navigation-menu-trigger');
      expect(trigger).toHaveClass(
        'text-foreground', // ghost variant
        'px-4', 'py-3', 'text-lg', // lg size
        'bg-accent', 'text-accent-foreground' // active state
      );
    });
  });
});