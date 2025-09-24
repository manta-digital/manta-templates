/**
 * HeroText Component Manual Tests
 *
 * Since no testing framework is configured, this file contains
 * manual test cases and verification points for the HeroText component.
 *
 * To run these tests:
 * 1. Create test data using the factory functions below
 * 2. Import and render HeroText in a test page
 * 3. Verify the expected behaviors described in each test case
 */

import { HeroTextProps } from '../../../types/hero';

/**
 * Test data factory for HeroText content
 */
export function createTestHeroContent(overrides?: Partial<HeroTextProps['content']>) {
  return {
    title: 'Test Hero Title',
    subtitle: 'Test Hero Subtitle',
    description: 'This is a test description with <strong>HTML content</strong>.',
    ...overrides,
  };
}

/**
 * Test Cases for HeroText Component
 */
export const heroTextTestCases = {
  /**
   * Test Case 1: Basic rendering with all content
   * Expected: Component renders title (h1), subtitle (p), and description (div with HTML)
   */
  basicRendering: {
    description: 'Should render title, subtitle, and description correctly',
    props: {
      content: createTestHeroContent(),
      textSize: 'md' as const,
      animation: 'none' as const,
    },
    expectedBehavior: [
      'Renders h1 element with title text',
      'Renders p element with subtitle text',
      'Renders div with HTML description content',
      'Applies proper typography classes for medium text size',
      'No animation classes applied when animation is "none"'
    ],
  },

  /**
   * Test Case 2: Text size variants
   * Expected: Different text sizes apply appropriate CSS classes
   */
  textSizeVariants: [
    {
      description: 'Small text size variant',
      props: {
        content: createTestHeroContent(),
        textSize: 'sm' as const,
      },
      expectedBehavior: [
        'Title uses text-3xl md:text-4xl classes',
        'Subtitle uses text-lg md:text-xl classes',
        'Description uses text-base classes',
        'Container has max-w-md class',
      ],
    },
    {
      description: 'Medium text size variant',
      props: {
        content: createTestHeroContent(),
        textSize: 'md' as const,
      },
      expectedBehavior: [
        'Title uses text-4xl md:text-5xl lg:text-6xl classes',
        'Subtitle uses text-xl md:text-2xl classes',
        'Description uses text-lg classes',
        'Container has max-w-2xl class',
      ],
    },
    {
      description: 'Large text size variant',
      props: {
        content: createTestHeroContent(),
        textSize: 'lg' as const,
      },
      expectedBehavior: [
        'Title uses text-5xl md:text-6xl lg:text-7xl classes',
        'Subtitle uses text-2xl md:text-3xl classes',
        'Description uses text-xl classes',
        'Container has max-w-4xl class',
      ],
    },
  ],

  /**
   * Test Case 3: Animation variants
   * Expected: Animation classes are applied correctly
   */
  animationVariants: [
    {
      description: 'Fade animation',
      props: {
        content: createTestHeroContent(),
        animation: 'fade' as const,
      },
      expectedBehavior: [
        'Container has animate-in fade-in-0 duration-1000 classes',
        'No delay classes on individual elements',
      ],
    },
    {
      description: 'Slide animation',
      props: {
        content: createTestHeroContent(),
        animation: 'slide' as const,
      },
      expectedBehavior: [
        'Container has animate-in slide-in-from-bottom-4 duration-1000 classes',
        'No delay classes on individual elements',
      ],
    },
    {
      description: 'Stagger animation',
      props: {
        content: createTestHeroContent(),
        animation: 'stagger' as const,
      },
      expectedBehavior: [
        'Container has animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 classes',
        'Title has animate-delay-100 class',
        'Subtitle has animate-delay-200 class',
        'Description has animate-delay-300 class',
      ],
    },
  ],

  /**
   * Test Case 4: Optional content handling
   * Expected: Component handles missing subtitle or description gracefully
   */
  optionalContent: [
    {
      description: 'Title only',
      props: {
        content: createTestHeroContent({
          subtitle: undefined,
          description: undefined,
        }),
      },
      expectedBehavior: [
        'Renders only h1 element with title',
        'No subtitle p element rendered',
        'No description div element rendered',
      ],
    },
    {
      description: 'Title and subtitle only',
      props: {
        content: createTestHeroContent({
          description: undefined,
        }),
      },
      expectedBehavior: [
        'Renders h1 element with title',
        'Renders p element with subtitle',
        'No description div element rendered',
      ],
    },
  ],

  /**
   * Test Case 5: HTML content sanitization
   * Expected: HTML content is properly handled
   */
  htmlContent: {
    description: 'Should handle HTML content in description',
    props: {
      content: createTestHeroContent({
        description: 'Description with <em>emphasis</em> and <a href="#test">links</a>.',
      }),
    },
    expectedBehavior: [
      'Description renders with proper HTML elements',
      'HTML content is not escaped',
      'dangerouslySetInnerHTML is used appropriately',
    ],
  },

  /**
   * Test Case 6: Reduced motion preference
   * Expected: Animations are disabled when user prefers reduced motion
   * Note: This requires manual testing or mocking matchMedia
   */
  reducedMotionPreference: {
    description: 'Should disable animations when prefers-reduced-motion is set',
    setupInstructions: 'Set prefers-reduced-motion: reduce in browser dev tools',
    props: {
      content: createTestHeroContent(),
      animation: 'fade' as const,
    },
    expectedBehavior: [
      'No animation classes applied when prefers-reduced-motion is active',
      'Component still renders all content correctly',
    ],
  },

  /**
   * Test Case 7: Custom className prop
   * Expected: Custom classes are merged with component classes
   */
  customClassName: {
    description: 'Should merge custom className with component classes',
    props: {
      content: createTestHeroContent(),
      className: 'custom-hero-text',
    },
    expectedBehavior: [
      'Component includes custom-hero-text class',
      'Component retains default space-y-4 z-10 relative classes',
      'Classes are properly merged without conflicts',
    ],
  },
};

/**
 * Test Utilities
 */
export const testUtils = {
  /**
   * Create minimal content for testing
   */
  createMinimalContent: () => ({
    title: 'Test Title',
  }),

  /**
   * Create content with all fields populated
   */
  createFullContent: () => ({
    title: 'Full Test Title',
    subtitle: 'Full Test Subtitle',
    description: 'Full test description with <strong>formatting</strong>.',
  }),

  /**
   * Create content with HTML in description
   */
  createHtmlContent: () => ({
    title: 'HTML Test Title',
    description: `
      <p>Paragraph with <em>emphasis</em> and <strong>strong</strong> text.</p>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
    `,
  }),
};

/**
 * Verification Checklist
 *
 * Manual verification steps:
 * □ Component renders without errors
 * □ Title always renders as h1 element
 * □ Subtitle renders as p element when provided
 * □ Description renders as div when provided
 * □ Text size variants apply correct classes
 * □ Animation variants apply correct classes
 * □ Reduced motion preference disables animations
 * □ HTML content in description renders correctly
 * □ Custom className is merged properly
 * □ Component has proper semantic structure
 * □ Component is accessible (proper heading hierarchy)
 */