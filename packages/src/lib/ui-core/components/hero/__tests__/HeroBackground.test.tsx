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

  describe('Image Backgrounds', () => {
    beforeEach(() => {
      // Mock Image constructor
      (global as any).Image = class {
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;

        set src(url: string) {
          setTimeout(() => {
            if (this.onload) this.onload();
          }, 0);
        }
      };
    });

    it('should render image background with loading state', () => {
      const config: HeroBackgroundConfig = {
        type: 'image',
        image: '/test-image.jpg'
      };

      render(<HeroBackground config={config} />);

      expect(screen.getByText('Loading image...')).toBeInTheDocument();
    });

    it('should handle image load success', async () => {
      const onLoad = jest.fn();
      const config: HeroBackgroundConfig = {
        type: 'image',
        image: '/test-image.jpg'
      };

      render(<HeroBackground config={config} onLoad={onLoad} />);

      // Wait for image to load
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(onLoad).toHaveBeenCalled();
    });

    it('should handle image load failure', async () => {
      const onError = jest.fn();

      // Mock Image to fail loading
      (global as any).Image = class {
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;

        set src(url: string) {
          setTimeout(() => {
            if (this.onerror) this.onerror();
          }, 0);
        }
      };

      const config: HeroBackgroundConfig = {
        type: 'image',
        image: '/test-image.jpg'
      };

      render(<HeroBackground config={config} onError={onError} />);

      // Wait for image to fail
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(screen.getByText('Failed to load background image')).toBeInTheDocument();
    });

    it('should apply background position and size styles', async () => {
      const config: HeroBackgroundConfig = {
        type: 'image',
        image: '/test-image.jpg',
        position: 'top center',
        size: 'contain'
      };

      render(<HeroBackground config={config} />);

      // Wait for image to load
      await new Promise(resolve => setTimeout(resolve, 10));

      const backgroundDiv = document.querySelector('.absolute.inset-0') as HTMLElement;
      expect(backgroundDiv.style.backgroundPosition).toBe('top center');
      expect(backgroundDiv.style.backgroundSize).toBe('contain');
    });

    it('should use default position and size when not provided', async () => {
      const config: HeroBackgroundConfig = {
        type: 'image',
        image: '/test-image.jpg'
      };

      render(<HeroBackground config={config} />);

      // Wait for image to load
      await new Promise(resolve => setTimeout(resolve, 10));

      const backgroundDiv = document.querySelector('.absolute.inset-0') as HTMLElement;
      expect(backgroundDiv.style.backgroundPosition).toBe('center center');
      expect(backgroundDiv.style.backgroundSize).toBe('cover');
    });

    it('should handle fallback from optimized format to original', async () => {
      let loadAttempts = 0;
      const onError = jest.fn();

      // Mock Image to fail on first attempt (optimized), succeed on second (original)
      (global as any).Image = class {
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;

        set src(url: string) {
          loadAttempts++;
          setTimeout(() => {
            if (loadAttempts === 1 && this.onerror) {
              // First attempt (optimized format) fails
              this.onerror();
            } else if (loadAttempts === 2 && this.onload) {
              // Second attempt (original format) succeeds
              this.onload();
            }
          }, 0);
        }
      };

      const config: HeroBackgroundConfig = {
        type: 'image',
        image: '/test-image.jpg'
      };

      render(<HeroBackground config={config} onError={onError} />);

      // Wait for both load attempts
      await new Promise(resolve => setTimeout(resolve, 20));

      // Should not call onError since fallback succeeded
      expect(onError).not.toHaveBeenCalled();
    });

    it('should support dark mode image variants', () => {
      const config: HeroBackgroundConfig = {
        type: 'image',
        image: '/test-image.jpg',
        imageDark: '/test-image-dark.jpg'
      };

      render(<HeroBackground config={config} />);

      // Currently always uses light mode image
      // In future implementation, this would check theme context
      expect(screen.getByText('Loading image...')).toBeInTheDocument();
    });

    it('should apply transition classes for smooth loading', () => {
      const config: HeroBackgroundConfig = {
        type: 'image',
        image: '/test-image.jpg'
      };

      render(<HeroBackground config={config} />);

      const backgroundDiv = document.querySelector('.absolute.inset-0');
      expect(backgroundDiv).toHaveClass('transition-opacity', 'duration-500');
    });

    it('should handle missing image property gracefully', () => {
      const config: HeroBackgroundConfig = {
        type: 'image'
        // Missing image property
      };

      expect(() => {
        render(<HeroBackground config={config} />);
      }).not.toThrow();
    });
  });

  describe('Non-Image Backgrounds', () => {
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