/**
 * Test setup utilities for hero components
 *
 * Provides common test utilities, mocks, and data factories
 * for hero component testing.
 */

import { HeroContent, HeroFrameworkComponents } from '../../../types/hero';

/**
 * Mock framework components for testing
 */
export const mockFrameworkComponents: HeroFrameworkComponents = {
  LinkComponent: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
  ImageComponent: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
  VideoComponent: ({ src, ...props }: any) => (
    <video src={src} {...props} />
  ),
};

/**
 * Factory for creating test hero content
 */
export const createTestHeroContent = (overrides: Partial<HeroContent> = {}): HeroContent => ({
  title: 'Test Hero Title',
  subtitle: 'Test Hero Subtitle',
  description: 'This is a test hero description with some content.',
  primaryCTA: {
    label: 'Primary Action',
    href: '/primary-action',
    variant: 'primary',
  },
  secondaryCTA: {
    label: 'Secondary Action',
    href: '/secondary-action',
    variant: 'secondary',
  },
  background: {
    type: 'image',
    image: '/test-hero-background.jpg',
    imageDark: '/test-hero-background-dark.jpg',
  },
  overlay: {
    opacity: 0.4,
    color: '#000000',
  },
  animations: {
    text: 'fade',
    background: 'none',
    duration: 1000,
    respectMotionPreference: true,
  },
  accessibility: {
    backgroundAlt: 'Test hero background image',
    ariaLabel: 'Test hero section',
    announceChanges: false,
  },
  ...overrides,
});

/**
 * Test data for different hero variants
 */
export const testHeroVariants = {
  static: createTestHeroContent({
    background: {
      type: 'image',
      image: '/test-static-hero.jpg',
    },
  }),

  video: createTestHeroContent({
    background: {
      type: 'video',
      video: {
        src: '/test-hero-video.mp4',
        poster: '/test-hero-poster.jpg',
        autoPlay: true,
        loop: true,
        muted: true,
        fallbackImage: '/test-hero-fallback.jpg',
      },
    },
  }),

  slides: createTestHeroContent({
    background: {
      type: 'slides',
      slides: [
        {
          image: '/test-slide-1.jpg',
          title: 'Slide 1 Title',
          subtitle: 'Slide 1 Subtitle',
          duration: 5000,
        },
        {
          image: '/test-slide-2.jpg',
          title: 'Slide 2 Title',
          subtitle: 'Slide 2 Subtitle',
          duration: 5000,
        },
        {
          image: '/test-slide-3.jpg',
          title: 'Slide 3 Title',
          subtitle: 'Slide 3 Subtitle',
          duration: 5000,
        },
      ],
    },
  }),

  gradient: createTestHeroContent({
    background: {
      type: 'gradient',
      gradient: { from: 'accent-7', to: 'accent-10' },
    },
  }),
};

/**
 * Common test utilities
 */
export const testUtils = {
  /**
   * Create a mock intersection observer for testing animations
   */
  mockIntersectionObserver: () => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
    return mockIntersectionObserver;
  },

  /**
   * Mock matchMedia for responsive testing
   */
  mockMatchMedia: (matches: boolean = false) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  },

  /**
   * Mock prefers-reduced-motion
   */
  mockReducedMotion: (prefersReduced: boolean = false) => {
    testUtils.mockMatchMedia(prefersReduced);
  },
};

/**
 * Error scenarios for testing
 */
export const testErrorScenarios = {
  imageLoadError: createTestHeroContent({
    background: {
      type: 'image',
      image: '/non-existent-image.jpg',
    },
  }),

  videoLoadError: createTestHeroContent({
    background: {
      type: 'video',
      video: {
        src: '/non-existent-video.mp4',
        fallbackImage: '/test-fallback.jpg',
      },
    },
  }),

  invalidBackground: createTestHeroContent({
    background: {
      type: 'invalid' as any,
    },
  }),
};

/**
 * Performance test data
 */
export const performanceTestData = {
  largeImage: createTestHeroContent({
    background: {
      type: 'image',
      image: '/large-test-image-4k.jpg', // Simulate large image
    },
  }),

  multipleSlides: createTestHeroContent({
    background: {
      type: 'slides',
      slides: Array.from({ length: 10 }, (_, i) => ({
        image: `/test-slide-${i + 1}.jpg`,
        title: `Slide ${i + 1} Title`,
        duration: 3000,
      })),
    },
  }),
};