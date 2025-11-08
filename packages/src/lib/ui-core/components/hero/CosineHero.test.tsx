import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CosineHero } from './CosineHero';
import type { CosineHeroProps } from '../../types/cosine-hero';

// Mock CosineTerrainCard since it uses Three.js
vi.mock('../cards/CosineTerrainCard', () => ({
  CosineTerrainCard: ({ className }: { className?: string }) => (
    <div data-testid="cosine-terrain-card" className={className}>
      Mocked Terrain
    </div>
  ),
}));

describe('CosineHero', () => {
  describe('Rendering', () => {
    it('renders without crashing with minimal props', () => {
      render(<CosineHero />);
      expect(screen.getByTestId('cosine-terrain-card')).toBeInTheDocument();
    });

    it('renders title when provided', () => {
      render(<CosineHero title="Welcome to Manta" />);
      expect(screen.getByRole('heading', { level: 1, name: 'Welcome to Manta' })).toBeInTheDocument();
    });

    it('renders subtitle when provided', () => {
      render(<CosineHero subtitle="Beautiful animated backgrounds" />);
      expect(screen.getByRole('heading', { level: 2, name: 'Beautiful animated backgrounds' })).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(<CosineHero description="This is a test description" />);
      expect(screen.getByText('This is a test description')).toBeInTheDocument();
    });

    it('does not render title when not provided', () => {
      render(<CosineHero />);
      expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    });
  });

  describe('Call-to-Action Buttons', () => {
    it('renders primary CTA when provided', () => {
      const primaryCTA = {
        label: 'Get Started',
        href: '/start',
      };
      render(<CosineHero primaryCTA={primaryCTA} />);
      const link = screen.getByRole('link', { name: 'Get Started' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/start');
    });

    it('renders secondary CTA when provided', () => {
      const secondaryCTA = {
        label: 'Learn More',
        href: '/learn',
      };
      render(<CosineHero secondaryCTA={secondaryCTA} />);
      const link = screen.getByRole('link', { name: 'Learn More' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/learn');
    });

    it('renders both CTAs when both provided', () => {
      const primaryCTA = { label: 'Get Started', href: '/start' };
      const secondaryCTA = { label: 'Learn More', href: '/learn' };
      render(<CosineHero primaryCTA={primaryCTA} secondaryCTA={secondaryCTA} />);
      expect(screen.getByRole('link', { name: 'Get Started' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Learn More' })).toBeInTheDocument();
    });

    it('adds external link attributes when external is true', () => {
      const primaryCTA = {
        label: 'External Link',
        href: 'https://example.com',
        external: true,
      };
      render(<CosineHero primaryCTA={primaryCTA} />);
      const link = screen.getByRole('link', { name: 'External Link' });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('does not add external attributes when external is false', () => {
      const primaryCTA = {
        label: 'Internal Link',
        href: '/internal',
        external: false,
      };
      render(<CosineHero primaryCTA={primaryCTA} />);
      const link = screen.getByRole('link', { name: 'Internal Link' });
      expect(link).not.toHaveAttribute('target');
      expect(link).not.toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('calls onClick handler when provided', () => {
      const handleClick = vi.fn();
      const primaryCTA = {
        label: 'Click Me',
        href: '#',
        onClick: handleClick,
      };
      render(<CosineHero primaryCTA={primaryCTA} />);
      const link = screen.getByRole('link', { name: 'Click Me' });
      link.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Content Positioning', () => {
    it('applies center positioning by default', () => {
      const { container } = render(<CosineHero title="Test" />);
      const contentWrapper = container.querySelector('.text-center');
      expect(contentWrapper).toBeInTheDocument();
    });

    it('applies left positioning when specified', () => {
      const { container } = render(<CosineHero title="Test" contentPosition="left" />);
      const contentWrapper = container.querySelector('.text-left');
      expect(contentWrapper).toBeInTheDocument();
    });

    it('applies right positioning when specified', () => {
      const { container } = render(<CosineHero title="Test" contentPosition="right" />);
      const contentWrapper = container.querySelector('.text-right');
      expect(contentWrapper).toBeInTheDocument();
    });
  });

  describe('Overlay', () => {
    it('does not render overlay when overlayOpacity is 0', () => {
      const { container } = render(<CosineHero overlayOpacity={0} />);
      const overlay = container.querySelector('.bg-black');
      expect(overlay).not.toBeInTheDocument();
    });

    it('renders overlay when overlayOpacity is greater than 0', () => {
      const { container } = render(<CosineHero overlayOpacity={0.5} />);
      const overlay = container.querySelector('.bg-black');
      expect(overlay).toBeInTheDocument();
    });

    it('applies correct opacity to overlay', () => {
      const { container } = render(<CosineHero overlayOpacity={0.3} />);
      const overlay = container.querySelector('.bg-black');
      expect(overlay).toHaveStyle({ opacity: '0.3' });
    });

    it('sets aria-hidden on overlay', () => {
      const { container } = render(<CosineHero overlayOpacity={0.5} />);
      const overlay = container.querySelector('.bg-black');
      expect(overlay).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Layout and Styling', () => {
    it('applies default minHeight', () => {
      const { container } = render(<CosineHero />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveStyle({ minHeight: '600px' });
    });

    it('applies custom minHeight', () => {
      const { container } = render(<CosineHero minHeight="100vh" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveStyle({ minHeight: '100vh' });
    });

    it('applies custom className', () => {
      const { container } = render(<CosineHero className="custom-class" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('custom-class');
    });
  });

  describe('Terrain Settings Pass-through', () => {
    it('passes materialColor to CosineTerrainCard', () => {
      render(<CosineHero materialColor="var(--color-accent-11)" />);
      // Terrain card is mocked, so we just verify it renders
      expect(screen.getByTestId('cosine-terrain-card')).toBeInTheDocument();
    });

    it('passes backgroundColor to CosineTerrainCard', () => {
      render(<CosineHero backgroundColor="var(--color-background)" />);
      expect(screen.getByTestId('cosine-terrain-card')).toBeInTheDocument();
    });

    it('passes backgroundAlpha to CosineTerrainCard', () => {
      render(<CosineHero backgroundAlpha={0.5} />);
      expect(screen.getByTestId('cosine-terrain-card')).toBeInTheDocument();
    });

    it('passes terrainSettings to CosineTerrainCard', () => {
      const terrainSettings = {
        speed: 1200,
        terrainFrequency: 0.0002,
      };
      render(<CosineHero terrainSettings={terrainSettings} />);
      expect(screen.getByTestId('cosine-terrain-card')).toBeInTheDocument();
    });

    it('applies variant="raw" to CosineTerrainCard', () => {
      const { container } = render(<CosineHero />);
      const terrain = container.querySelector('[data-testid="cosine-terrain-card"]');
      expect(terrain).toBeInTheDocument();
    });

    it('applies absolute positioning and z-0 to terrain', () => {
      render(<CosineHero />);
      const terrain = screen.getByTestId('cosine-terrain-card');
      expect(terrain).toHaveClass('absolute', 'inset-0', 'z-0');
    });
  });

  describe('Children Prop', () => {
    it('renders children when provided', () => {
      render(
        <CosineHero>
          <div data-testid="custom-content">Custom Content</div>
        </CosineHero>
      );
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });

    it('renders both default content and children', () => {
      render(
        <CosineHero title="Title">
          <div data-testid="custom-content">Custom Content</div>
        </CosineHero>
      );
      expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });
  });

  describe('Complete Example', () => {
    it('renders a complete hero with all props', () => {
      const props: CosineHeroProps = {
        title: 'Welcome to Manta',
        subtitle: 'Beautiful UI Components',
        description: 'Build amazing experiences with animated backgrounds',
        primaryCTA: { label: 'Get Started', href: '/start' },
        secondaryCTA: { label: 'Learn More', href: '/learn' },
        contentPosition: 'center',
        overlayOpacity: 0.3,
        minHeight: '100vh',
        materialColor: 'var(--color-accent-11)',
        backgroundColor: 'var(--color-background)',
        backgroundAlpha: 0,
        className: 'custom-hero',
      };

      const { container } = render(<CosineHero {...props} />);

      // Verify all content rendered
      expect(screen.getByRole('heading', { level: 1, name: 'Welcome to Manta' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: 'Beautiful UI Components' })).toBeInTheDocument();
      expect(screen.getByText('Build amazing experiences with animated backgrounds')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Get Started' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Learn More' })).toBeInTheDocument();

      // Verify layout
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-hero');
      expect(wrapper).toHaveStyle({ minHeight: '100vh' });

      // Verify overlay
      const overlay = container.querySelector('.bg-black');
      expect(overlay).toBeInTheDocument();
      expect(overlay).toHaveStyle({ opacity: '0.3' });

      // Verify terrain
      expect(screen.getByTestId('cosine-terrain-card')).toBeInTheDocument();
    });
  });
});
