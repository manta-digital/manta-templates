/**
 * HeroBackground component tests
 *
 * Tests for the HeroBackground component functionality including
 * gradient support, background type detection, and error handling.
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { HeroBackground } from '../HeroBackground';
import { HeroBackgroundConfig } from '../../../types/hero';
import { testUtils } from './test-setup';

describe('HeroBackground', () => {
  beforeEach(() => {
    testUtils.mockIntersectionObserver();
    testUtils.mockMatchMedia();
  });

  describe('Gradient Backgrounds', () => {
    it('should render gradient background with range', () => {
      const config: HeroBackgroundConfig = {
        type: 'gradient',
        gradient: { range: 75 }
      };

      render(<HeroBackground config={config} />);

      const backgroundDiv = document.querySelector('.absolute.inset-0');
      expect(backgroundDiv).toBeInTheDocument();
      expect(backgroundDiv).toHaveClass('absolute', 'inset-0', 'w-full', 'h-full');
    });

    it('should render gradient background with from/to', () => {
      const config: HeroBackgroundConfig = {
        type: 'gradient',
        gradient: { from: 'accent-9', to: 'accent-10' }
      };

      render(<HeroBackground config={config} />);

      const backgroundDiv = document.querySelector('.absolute.inset-0');
      expect(backgroundDiv).toBeInTheDocument();
      expect(backgroundDiv).toHaveClass('bg-gradient-to-br');
    });

    it('should render gradient background with custom gradient', () => {
      const customGradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      const config: HeroBackgroundConfig = {
        type: 'gradient',
        gradient: { custom: customGradient }
      };

      render(<HeroBackground config={config} />);

      const backgroundDiv = document.querySelector('.absolute.inset-0') as HTMLElement;
      expect(backgroundDiv).toBeInTheDocument();
      expect(backgroundDiv.style.background).toBe(customGradient);
    });

    it('should render default gradient when no gradient config provided', () => {
      const config: HeroBackgroundConfig = {
        type: 'gradient',
        gradient: {}
      };

      render(<HeroBackground config={config} />);

      const backgroundDiv = document.querySelector('.absolute.inset-0');
      expect(backgroundDiv).toBeInTheDocument();
    });

    it('should prioritize custom gradient over from/to', () => {
      const customGradient = 'linear-gradient(45deg, red, blue)';
      const config: HeroBackgroundConfig = {
        type: 'gradient',
        gradient: {
          custom: customGradient,
          from: 'accent-7',
          to: 'accent-10'
        }
      };

      render(<HeroBackground config={config} />);

      const backgroundDiv = document.querySelector('.absolute.inset-0') as HTMLElement;
      expect(backgroundDiv.style.background).toBe(customGradient);
    });

    it('should prioritize from/to over range', () => {
      const config: HeroBackgroundConfig = {
        type: 'gradient',
        gradient: {
          range: 50,
          from: 'accent-7',
          to: 'accent-10'
        }
      };

      render(<HeroBackground config={config} />);

      const backgroundDiv = document.querySelector('.absolute.inset-0');
      expect(backgroundDiv).toBeInTheDocument();
      expect(backgroundDiv).toHaveClass('bg-gradient-to-br');
    });
  });

  describe('Non-Gradient Backgrounds', () => {
    it('should render placeholder for image background', () => {
      const config: HeroBackgroundConfig = {
        type: 'image',
        image: '/test-image.jpg'
      };

      render(<HeroBackground config={config} />);

      expect(screen.getByText('Background type "image" - Coming soon')).toBeInTheDocument();
    });

    it('should render placeholder for video background', () => {
      const config: HeroBackgroundConfig = {
        type: 'video',
        video: {
          src: '/test-video.mp4'
        }
      };

      render(<HeroBackground config={config} />);

      expect(screen.getByText('Background type "video" - Coming soon')).toBeInTheDocument();
    });

    it('should render placeholder for slides background', () => {
      const config: HeroBackgroundConfig = {
        type: 'slides',
        slides: [
          { image: '/slide1.jpg' },
          { image: '/slide2.jpg' }
        ]
      };

      render(<HeroBackground config={config} />);

      expect(screen.getByText('Background type "slides" - Coming soon')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should handle gradient type with no gradient config', () => {
      const config: HeroBackgroundConfig = {
        type: 'gradient'
      };

      expect(() => {
        render(<HeroBackground config={config} />);
      }).not.toThrow();
    });

    it('should handle invalid background type gracefully', () => {
      const config = {
        type: 'invalid-type'
      } as any;

      render(<HeroBackground config={config} />);

      expect(screen.getByText('Background type "invalid-type" - Coming soon')).toBeInTheDocument();
    });

    it('should return null for gradient type with no gradient config', () => {
      const config: HeroBackgroundConfig = {
        type: 'gradient'
      };

      render(<HeroBackground config={config} />);

      // Should render placeholder background
      const backgroundDiv = document.querySelector('.absolute.inset-0');
      expect(backgroundDiv).toBeInTheDocument();
    });
  });

  describe('CSS Classes and Styling', () => {
    it('should accept and apply custom className', () => {
      const config: HeroBackgroundConfig = {
        type: 'gradient',
        gradient: { range: 50 }
      };

      render(<HeroBackground config={config} className="custom-bg-class" />);

      const backgroundDiv = document.querySelector('.absolute.inset-0');
      expect(backgroundDiv).toHaveClass('custom-bg-class');
    });

    it('should combine default and custom classes', () => {
      const config: HeroBackgroundConfig = {
        type: 'gradient',
        gradient: { from: 'accent-7', to: 'accent-10' }
      };

      render(<HeroBackground config={config} className="custom-class" />);

      const backgroundDiv = document.querySelector('.absolute.inset-0');
      expect(backgroundDiv).toHaveClass('absolute', 'inset-0', 'w-full', 'h-full', 'custom-class');
    });

    it('should apply proper positioning classes', () => {
      const config: HeroBackgroundConfig = {
        type: 'gradient',
        gradient: { range: 75 }
      };

      render(<HeroBackground config={config} />);

      const backgroundDiv = document.querySelector('.absolute.inset-0');
      expect(backgroundDiv).toHaveClass('absolute', 'inset-0', 'w-full', 'h-full');
    });
  });

  describe('Gradient Utility Integration', () => {
    it('should use gradient utility functions correctly', () => {
      const config: HeroBackgroundConfig = {
        type: 'gradient',
        gradient: { from: 'accent-8', to: 'accent-10' }
      };

      render(<HeroBackground config={config} />);

      const backgroundDiv = document.querySelector('.absolute.inset-0');
      expect(backgroundDiv).toHaveClass('bg-gradient-to-br');
    });

    it('should handle invalid color scales gracefully', () => {
      const config: HeroBackgroundConfig = {
        type: 'gradient',
        gradient: { from: 'invalid-color', to: 'accent-10' }
      };

      // Should not throw and should render something
      expect(() => {
        render(<HeroBackground config={config} />);
      }).not.toThrow();

      const backgroundDiv = document.querySelector('.absolute.inset-0');
      expect(backgroundDiv).toBeInTheDocument();
    });
  });

  describe('Callback Props', () => {
    it('should accept onLoad callback without error', () => {
      const onLoad = jest.fn();
      const config: HeroBackgroundConfig = {
        type: 'gradient',
        gradient: { range: 50 }
      };

      expect(() => {
        render(<HeroBackground config={config} onLoad={onLoad} />);
      }).not.toThrow();
    });

    it('should accept onError callback without error', () => {
      const onError = jest.fn();
      const config: HeroBackgroundConfig = {
        type: 'gradient',
        gradient: { range: 50 }
      };

      expect(() => {
        render(<HeroBackground config={config} onError={onError} />);
      }).not.toThrow();
    });
  });
});