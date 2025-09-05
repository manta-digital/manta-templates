import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mail, Search } from 'lucide-react';
import { Input } from '../input';

describe('Input', () => {
  it('renders with placeholder text', () => {
    render(<Input placeholder="Test placeholder" />);
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });

  it('applies default variant and size classes', () => {
    render(<Input placeholder="test" />);
    const input = screen.getByPlaceholderText('test');
    expect(input).toHaveClass('h-10'); // default size md
    expect(input).toHaveClass('px-3');
  });

  it('applies size variants correctly', () => {
    const { rerender } = render(<Input size="sm" placeholder="test" />);
    let input = screen.getByPlaceholderText('test');
    expect(input).toHaveClass('h-8', 'px-2', 'text-sm');

    rerender(<Input size="lg" placeholder="test" />);
    input = screen.getByPlaceholderText('test');
    expect(input).toHaveClass('h-12', 'px-4', 'text-lg');
  });

  it('applies state variants correctly', () => {
    const { rerender } = render(<Input state="error" placeholder="test" />);
    let input = screen.getByPlaceholderText('test');
    expect(input).toHaveClass('border-destructive');

    rerender(<Input state="success" placeholder="test" />);
    input = screen.getByPlaceholderText('test');
    expect(input).toHaveClass('border-green-500');

    rerender(<Input state="warning" placeholder="test" />);
    input = screen.getByPlaceholderText('test');
    expect(input).toHaveClass('border-yellow-500');
  });

  it('applies variant styles correctly', () => {
    const { rerender } = render(<Input variant="ghost" placeholder="test" />);
    let input = screen.getByPlaceholderText('test');
    expect(input).toHaveClass('border-transparent', 'bg-transparent');

    rerender(<Input variant="filled" placeholder="test" />);
    input = screen.getByPlaceholderText('test');
    expect(input).toHaveClass('border-transparent', 'bg-muted');
  });

  it('handles disabled state', () => {
    render(<Input disabled placeholder="test" />);
    const input = screen.getByPlaceholderText('test');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
  });

  it('handles focus and blur events', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="test" />);
    const input = screen.getByPlaceholderText('test');

    await user.click(input);
    expect(input).toHaveFocus();

    await user.tab();
    expect(input).not.toHaveFocus();
  });

  it('accepts input value changes', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="test" />);
    const input = screen.getByPlaceholderText('test') as HTMLInputElement;

    await user.type(input, 'hello world');
    expect(input.value).toBe('hello world');
  });

  it('renders left icon correctly', () => {
    render(<Input leftIcon={<Mail data-testid="mail-icon" />} placeholder="test" />);
    
    expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('test');
    expect(input).toHaveClass('pl-10');
  });

  it('renders right icon correctly', () => {
    render(<Input rightIcon={<Search data-testid="search-icon" />} placeholder="test" />);
    
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('test');
    expect(input).toHaveClass('pr-10');
  });

  it('renders both left and right icons', () => {
    render(
      <Input
        leftIcon={<Mail data-testid="mail-icon" />}
        rightIcon={<Search data-testid="search-icon" />}
        placeholder="test"
      />
    );
    
    expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('test');
    expect(input).toHaveClass('pl-10', 'pr-10');
  });

  it('forwards ref correctly', () => {
    let inputRef: HTMLInputElement | null = null;
    render(<Input ref={(ref) => { inputRef = ref; }} placeholder="test" />);
    
    expect(inputRef).toBeInstanceOf(HTMLInputElement);
    expect(inputRef).toHaveAttribute('placeholder', 'test');
  });

  it('spreads additional HTML attributes', () => {
    render(
      <Input
        placeholder="test"
        data-testid="custom-input"
        aria-label="Custom input"
        type="email"
      />
    );
    
    const input = screen.getByTestId('custom-input');
    expect(input).toHaveAttribute('aria-label', 'Custom input');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="test" />);
    const input = screen.getByPlaceholderText('test');
    expect(input).toHaveClass('custom-class');
  });
});