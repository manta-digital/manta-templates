import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavigationMenuItem } from '../NavigationMenuItem';
import { NavigationMenuItem as NavigationMenuItemType } from '../../../types/navigation';

// Mock the child components
jest.mock('../NavigationMenuLink', () => ({
  NavigationMenuLink: ({ item, active, onClick }: any) => (
    <a 
      href={item.href} 
      onClick={onClick}
      data-testid="mock-navigation-link"
      data-active={active}
    >
      {item.label}
    </a>
  )
}));

jest.mock('../NavigationMenuTrigger', () => ({
  NavigationMenuTrigger: ({ item, active, onClick }: any) => (
    <button 
      onClick={onClick}
      data-testid="mock-navigation-trigger"
      data-active={active}
    >
      {item.label}
    </button>
  )
}));

jest.mock('../NavigationMenuContent', () => ({
  NavigationMenuContent: ({ items, level }: any) => (
    <div data-testid="mock-navigation-content" data-level={level}>
      {items.map((item: any, index: number) => (
        <div key={index}>{item.label}</div>
      ))}
    </div>
  )
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Home: ({ size }: { size?: number }) => <span data-testid="home-icon" data-size={size}>🏠</span>,
  User: ({ size }: { size?: number }) => <span data-testid="user-icon" data-size={size}>👤</span>,
}));

describe('NavigationMenuItem', () => {
  const mockOnClick = jest.fn();
  const MockLinkComponent = ({ href, children, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Simple link items', () => {
    const simpleItem: NavigationMenuItemType = {
      label: 'Home',
      href: '/'
    };

    it('renders a simple link item correctly', () => {
      render(
        <NavigationMenuItem 
          item={simpleItem}
          LinkComponent={MockLinkComponent}
          onClick={mockOnClick}
        />
      );

      expect(screen.getByTestId('navigation-menu-item-link')).toBeInTheDocument();
      expect(screen.getByTestId('mock-navigation-link')).toBeInTheDocument();
    });

    it('applies active state correctly', () => {
      render(
        <NavigationMenuItem 
          item={simpleItem}
          LinkComponent={MockLinkComponent}
          active={true}
          onClick={mockOnClick}
        />
      );

      const link = screen.getByTestId('mock-navigation-link');
      expect(link).toHaveAttribute('data-active', 'true');
    });

    it('handles keyboard navigation with Enter key', () => {
      render(
        <NavigationMenuItem 
          item={simpleItem}
          LinkComponent={MockLinkComponent}
          onClick={mockOnClick}
        />
      );

      const menuItem = screen.getByTestId('navigation-menu-item-link');
      fireEvent.keyDown(menuItem, { key: 'Enter' });
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard navigation with Space key', () => {
      render(
        <NavigationMenuItem 
          item={simpleItem}
          LinkComponent={MockLinkComponent}
          onClick={mockOnClick}
        />
      );

      const menuItem = screen.getByTestId('navigation-menu-item-link');
      fireEvent.keyDown(menuItem, { key: ' ' });
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Dropdown items with children', () => {
    const dropdownItem: NavigationMenuItemType = {
      label: 'Products',
      children: [
        { label: 'Web Apps', href: '/web-apps' },
        { label: 'Mobile Apps', href: '/mobile-apps' }
      ]
    };

    it('renders a dropdown item correctly', () => {
      render(
        <NavigationMenuItem 
          item={dropdownItem}
          LinkComponent={MockLinkComponent}
          onClick={mockOnClick}
        />
      );

      expect(screen.getByTestId('navigation-menu-item-dropdown')).toBeInTheDocument();
      expect(screen.getByTestId('mock-navigation-trigger')).toBeInTheDocument();
      expect(screen.getByTestId('mock-navigation-content')).toBeInTheDocument();
    });

    it('passes correct level to NavigationMenuContent', () => {
      render(
        <NavigationMenuItem 
          item={dropdownItem}
          LinkComponent={MockLinkComponent}
          level={1}
          onClick={mockOnClick}
        />
      );

      const content = screen.getByTestId('mock-navigation-content');
      expect(content).toHaveAttribute('data-level', '2');
    });

    it('renders child items in content', () => {
      render(
        <NavigationMenuItem 
          item={dropdownItem}
          LinkComponent={MockLinkComponent}
          onClick={mockOnClick}
        />
      );

      expect(screen.getByText('Web Apps')).toBeInTheDocument();
      expect(screen.getByText('Mobile Apps')).toBeInTheDocument();
    });
  });

  describe('Items with icons', () => {
    const itemWithIcon: NavigationMenuItemType = {
      label: 'Home',
      href: '/',
      icon: 'Home'
    };

    it('renders disabled item with icon correctly', () => {
      const disabledItemWithIcon = { ...itemWithIcon, disabled: true };
      
      render(
        <NavigationMenuItem 
          item={disabledItemWithIcon}
          LinkComponent={MockLinkComponent}
          onClick={mockOnClick}
        />
      );

      expect(screen.getByTestId('navigation-menu-item-disabled')).toBeInTheDocument();
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
      expect(screen.getByTestId('home-icon')).toHaveAttribute('data-size', '16');
    });
  });

  describe('Items with badges', () => {
    const itemWithBadge: NavigationMenuItemType = {
      label: 'Messages',
      href: '/messages',
      badge: '3'
    };

    it('renders disabled item with badge correctly', () => {
      const disabledItemWithBadge = { ...itemWithBadge, disabled: true };
      
      render(
        <NavigationMenuItem 
          item={disabledItemWithBadge}
          LinkComponent={MockLinkComponent}
          onClick={mockOnClick}
        />
      );

      expect(screen.getByTestId('navigation-menu-item-disabled')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByLabelText('Badge: 3')).toBeInTheDocument();
    });
  });

  describe('Disabled items', () => {
    const disabledItem: NavigationMenuItemType = {
      label: 'Disabled Item',
      href: '/disabled',
      disabled: true
    };

    it('renders disabled item correctly', () => {
      render(
        <NavigationMenuItem 
          item={disabledItem}
          LinkComponent={MockLinkComponent}
          onClick={mockOnClick}
        />
      );

      const disabledElement = screen.getByTestId('navigation-menu-item-disabled');
      expect(disabledElement).toBeInTheDocument();
      expect(disabledElement).toHaveAttribute('aria-disabled', 'true');
      expect(disabledElement).toHaveClass('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
    });

    it('does not render as link or trigger when disabled', () => {
      render(
        <NavigationMenuItem 
          item={disabledItem}
          LinkComponent={MockLinkComponent}
          onClick={mockOnClick}
        />
      );

      expect(screen.queryByTestId('mock-navigation-link')).not.toBeInTheDocument();
      expect(screen.queryByTestId('mock-navigation-trigger')).not.toBeInTheDocument();
    });

    it('renders disabled dropdown item correctly', () => {
      const disabledDropdownItem = {
        ...disabledItem,
        children: [{ label: 'Child', href: '/child' }]
      };

      render(
        <NavigationMenuItem 
          item={disabledDropdownItem}
          LinkComponent={MockLinkComponent}
          onClick={mockOnClick}
        />
      );

      expect(screen.getByTestId('navigation-menu-item-disabled')).toBeInTheDocument();
      expect(screen.queryByTestId('mock-navigation-trigger')).not.toBeInTheDocument();
    });
  });

  describe('Level-based styling', () => {
    const simpleItem: NavigationMenuItemType = {
      label: 'Test Item',
      href: '/test'
    };

    it('applies correct padding for different levels', () => {
      const { rerender } = render(
        <NavigationMenuItem 
          item={simpleItem}
          LinkComponent={MockLinkComponent}
          level={0}
        />
      );

      let menuItem = screen.getByTestId('navigation-menu-item-link');
      expect(menuItem).not.toHaveClass('pl-4', 'pl-8', 'pl-12');

      rerender(
        <NavigationMenuItem 
          item={simpleItem}
          LinkComponent={MockLinkComponent}
          level={1}
        />
      );
      menuItem = screen.getByTestId('navigation-menu-item-link');
      expect(menuItem).toHaveClass('pl-4');

      rerender(
        <NavigationMenuItem 
          item={simpleItem}
          LinkComponent={MockLinkComponent}
          level={2}
        />
      );
      menuItem = screen.getByTestId('navigation-menu-item-link');
      expect(menuItem).toHaveClass('pl-8');

      rerender(
        <NavigationMenuItem 
          item={simpleItem}
          LinkComponent={MockLinkComponent}
          level={3}
        />
      );
      menuItem = screen.getByTestId('navigation-menu-item-link');
      expect(menuItem).toHaveClass('pl-12');
    });

    it('caps level styling at 3', () => {
      render(
        <NavigationMenuItem 
          item={simpleItem}
          LinkComponent={MockLinkComponent}
          level={10}
        />
      );

      const menuItem = screen.getByTestId('navigation-menu-item-link');
      expect(menuItem).toHaveClass('pl-12');
    });
  });

  describe('Custom className', () => {
    const simpleItem: NavigationMenuItemType = {
      label: 'Test Item',
      href: '/test'
    };

    it('applies custom className correctly', () => {
      render(
        <NavigationMenuItem 
          item={simpleItem}
          LinkComponent={MockLinkComponent}
          className="custom-class"
        />
      );

      const menuItem = screen.getByTestId('navigation-menu-item-link');
      expect(menuItem).toHaveClass('custom-class');
    });
  });
});