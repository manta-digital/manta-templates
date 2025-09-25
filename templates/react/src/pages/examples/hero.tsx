'use client';

import { HeroSection } from '../../lib/ui-core/components/hero/HeroSection';
import type { HeroContent } from '../../lib/ui-core/types/hero';

/**
 * Hero section test page
 * Quick testing page for hero section development
 */
export default function HeroTestPage() {
  // Test content for different gradient variants
  const simpleGradientContent: HeroContent = {
    title: 'Simple Range Gradient',
    subtitle: 'Using range-based gradient (75/100)',
    description: 'This hero uses the same gradient system as GradientCard',
    primaryCTA: {
      label: 'Get Started',
      href: '/get-started',
      variant: 'primary'
    },
    secondaryCTA: {
      label: 'Learn More',
      href: '/learn-more',
      variant: 'secondary'
    },
    background: {
      type: 'gradient',
      gradient: { from: 'accent-9', to: 'accent-8' }
    }
  };

  const advancedGradientContent: HeroContent = {
    title: 'Advanced Gradient',
    subtitle: 'Using from/to color scales',
    description: 'Accent-1 to Accent-8 gradient for rich colors',
    background: {
      type: 'gradient',
      gradient: { from: 'accent-1', to: 'accent-8' }
    }
  };

  const customGradientContent: HeroContent = {
    title: 'Custom Gradient',
    subtitle: 'Using custom CSS gradient',
    description: 'Full control over gradient definition',
    background: {
      type: 'gradient',
      gradient: { custom: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
    }
  };

  // Test content for image backgrounds
  const imageBackgroundContent: HeroContent = {
    title: 'Image Background Hero',
    subtitle: 'With automatic format optimization',
    description: 'This hero supports WebP/AVIF optimization, loading states, and fallback handling',
    primaryCTA: {
      label: 'Explore Features',
      href: '/features',
      variant: 'primary'
    },
    secondaryCTA: {
      label: 'View Gallery',
      href: '/gallery',
      variant: 'outline'
    },
    background: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop',
      position: 'center center',
      size: 'cover'
    },
    overlay: {
      opacity: 0.4,
      color: '#000000'
    }
  };

  const imageWithCustomPositionContent: HeroContent = {
    title: 'Custom Positioned Image',
    subtitle: 'Background image with top positioning',
    description: 'Demonstrates different background positioning and sizing options',
    background: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
      position: 'top center',
      size: 'cover'
    },
    overlay: {
      opacity: 0.3,
      color: '#1a1a1a'
    }
  };

  const imageContainContent: HeroContent = {
    title: 'Contained Image Background',
    subtitle: 'Using background-size: contain',
    description: 'Shows how images can be contained rather than cropped',
    background: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=600&fit=crop',
      position: 'center center',
      size: 'contain'
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold p-4 text-center">Hero Section Test Page</h1>

      {/* Basic hero test with default gradient */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold p-4">Basic Hero (Default Gradient)</h2>
        <HeroSection size="md" />
      </div>

      {/* Simple range gradient */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold p-4">Simple Range Gradient</h2>
        <HeroSection
          content={simpleGradientContent}
          size="md"
        />
      </div>

      {/* Advanced from/to gradient */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold p-4">Advanced From/To Gradient</h2>
        <HeroSection
          content={advancedGradientContent}
          size="md"
        />
      </div>

      {/* Custom gradient */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold p-4">Custom CSS Gradient</h2>
        <HeroSection
          content={customGradientContent}
          size="md"
        />
      </div>

      {/* Image background with overlay */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold p-4">Image Background with Overlay</h2>
        <HeroSection
          content={imageBackgroundContent}
          size="lg"
        />
      </div>

      {/* Custom positioned image */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold p-4">Custom Positioned Image</h2>
        <HeroSection
          content={imageWithCustomPositionContent}
          size="md"
          contentPosition="left"
        />
      </div>

      {/* Contained image */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold p-4">Contained Image Background</h2>
        <HeroSection
          content={imageContainContent}
          size="sm"
          contentPosition="right"
        />
      </div>

      {/* Fullscreen image hero */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold p-4">Fullscreen Image Hero</h2>
        <HeroSection
          content={{
            title: 'Fullscreen Hero Experience',
            subtitle: 'Taking up the full viewport height',
            description: 'Perfect for landing pages and impactful first impressions',
            primaryCTA: {
              label: 'Get Started',
              href: '/get-started',
              variant: 'primary'
            },
            secondaryCTA: {
              label: 'Learn More',
              href: '/learn-more',
              variant: 'outline'
            },
            background: {
              type: 'image',
              image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80',
              position: 'center center',
              size: 'cover'
            },
            overlay: {
              opacity: 0.5,
              color: '#000000'
            }
          }}
          size="xl"
          variant="fullscreen"
          contentPosition="center"
        />
      </div>

      {/* HeroText Variants Section */}
      <div className="mb-8 p-4">
        <h2 className="text-xl font-bold mb-4">HeroText Component Variants</h2>
        <p className="text-muted-foreground mb-6">
          Demonstrating different text sizes, animations, and content configurations
        </p>

        {/* Small Text Size */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Small Text Size (sm)</h3>
          <HeroSection
            content={{
              title: 'Small Hero Text',
              subtitle: 'Compact text for secondary heroes',
              description: 'Perfect for page sections that need less visual weight while maintaining hierarchy.',
              background: {
                type: 'gradient',
                gradient: { from: 'accent-2', to: 'accent-4' }
              }
            }}
            size="md"
            textSize="sm"
            contentPosition="left"
          />
        </div>

        {/* Medium Text Size (Default) */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Medium Text Size (md) - Default</h3>
          <HeroSection
            content={{
              title: 'Medium Hero Text',
              subtitle: 'Balanced text sizing for most use cases',
              description: 'The default text size provides excellent readability and visual impact for most hero sections.',
              background: {
                type: 'gradient',
                gradient: { from: 'accent-3', to: 'accent-6' }
              }
            }}
            size="md"
            textSize="md"
            contentPosition="center"
          />
        </div>

        {/* Large Text Size */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Large Text Size (lg)</h3>
          <HeroSection
            content={{
              title: 'Large Hero Text',
              subtitle: 'Bold and impactful for primary heroes',
              description: 'Large text size creates maximum visual impact for landing pages and primary marketing messages.',
              background: {
                type: 'gradient',
                gradient: { from: 'accent-4', to: 'accent-8' }
              }
            }}
            size="lg"
            textSize="lg"
            contentPosition="center"
          />
        </div>

        {/* Animation Examples */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Text Animations</h3>

          {/* Fade Animation */}
          <div className="mb-6">
            <h4 className="text-md font-medium mb-2">Fade Animation</h4>
            <HeroSection
              content={{
                title: 'Fade Animation Example',
                subtitle: 'Smooth fade-in effect',
                description: 'Text elements fade in smoothly when the component mounts.',
                background: {
                  type: 'gradient',
                  gradient: { from: 'accent-1', to: 'accent-3' }
                },
                animations: {
                  text: 'fade'
                }
              }}
              size="sm"
              textSize="sm"
            />
          </div>

          {/* Slide Animation */}
          <div className="mb-6">
            <h4 className="text-md font-medium mb-2">Slide Animation</h4>
            <HeroSection
              content={{
                title: 'Slide Animation Example',
                subtitle: 'Slide up from bottom effect',
                description: 'Text elements slide up from the bottom with a smooth transition.',
                background: {
                  type: 'gradient',
                  gradient: { from: 'accent-2', to: 'accent-5' }
                },
                animations: {
                  text: 'slide'
                }
              }}
              size="sm"
              textSize="sm"
            />
          </div>

          {/* Stagger Animation */}
          <div className="mb-6">
            <h4 className="text-md font-medium mb-2">Stagger Animation</h4>
            <HeroSection
              content={{
                title: 'Stagger Animation Example',
                subtitle: 'Sequential element animation',
                description: 'Text elements animate in sequence: title first, then subtitle, then description.',
                background: {
                  type: 'gradient',
                  gradient: { from: 'accent-3', to: 'accent-7' }
                },
                animations: {
                  text: 'stagger'
                }
              }}
              size="sm"
              textSize="sm"
            />
          </div>
        </div>

        {/* Content Variations */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Content Variations</h3>

          {/* Title Only */}
          <div className="mb-6">
            <h4 className="text-md font-medium mb-2">Title Only</h4>
            <HeroSection
              content={{
                title: 'Minimalist Hero with Title Only',
                background: {
                  type: 'gradient',
                  gradient: { from: 'accent-1', to: 'accent-2' }
                }
              }}
              size="sm"
              textSize="md"
            />
          </div>

          {/* Title + Subtitle */}
          <div className="mb-6">
            <h4 className="text-md font-medium mb-2">Title + Subtitle</h4>
            <HeroSection
              content={{
                title: 'Hero with Title and Subtitle',
                subtitle: 'Clean design with essential information',
                background: {
                  type: 'gradient',
                  gradient: { from: 'accent-2', to: 'accent-4' }
                }
              }}
              size="sm"
              textSize="md"
            />
          </div>

          {/* HTML Content */}
          <div className="mb-6">
            <h4 className="text-md font-medium mb-2">HTML Content in Description</h4>
            <HeroSection
              content={{
                title: 'Rich HTML Content Support',
                subtitle: 'Description with formatted text',
                description: 'This description includes <strong>bold text</strong>, <em>italic text</em>, and even <a href="#" style="color: inherit; text-decoration: underline;">links</a> for rich content presentation.',
                background: {
                  type: 'gradient',
                  gradient: { from: 'accent-4', to: 'accent-6' }
                }
              }}
              size="sm"
              textSize="md"
            />
          </div>
        </div>
      </div>

      {/* HeroOverlay Variants Section */}
      <div className="mb-8 p-4">
        <h2 className="text-xl font-bold mb-4">HeroOverlay Component Variants</h2>
        <p className="text-muted-foreground mb-6">
          Demonstrating overlay effects for better text contrast over images and backgrounds
        </p>

        {/* Light overlay over image */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Light Overlay (20% opacity)</h3>
          <HeroSection
            content={{
              title: 'Subtle Overlay Effect',
              subtitle: 'Light darkening for minimal contrast',
              description: 'A 20% black overlay provides subtle contrast without overwhelming the background image.',
              background: {
                type: 'image',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
                position: 'center center',
                size: 'cover'
              },
              overlay: {
                opacity: 0.2,
                color: '#000000'
              }
            }}
            size="md"
            textSize="md"
          />
        </div>

        {/* Medium overlay over image */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Medium Overlay (50% opacity)</h3>
          <HeroSection
            content={{
              title: 'Balanced Overlay Effect',
              subtitle: 'Perfect balance of image and text visibility',
              description: 'A 50% black overlay provides excellent text contrast while preserving background details.',
              background: {
                type: 'image',
                image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop',
                position: 'center center',
                size: 'cover'
              },
              overlay: {
                opacity: 0.5,
                color: '#000000'
              }
            }}
            size="md"
            textSize="md"
          />
        </div>

        {/* Strong overlay over image */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Strong Overlay (80% opacity)</h3>
          <HeroSection
            content={{
              title: 'High Contrast Overlay',
              subtitle: 'Maximum text readability',
              description: 'An 80% black overlay ensures perfect text contrast, ideal for important messaging.',
              background: {
                type: 'image',
                image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1920&h=1080&fit=crop',
                position: 'center center',
                size: 'cover'
              },
              overlay: {
                opacity: 0.8,
                color: '#000000'
              }
            }}
            size="md"
            textSize="md"
          />
        </div>

        {/* Colored overlay */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Colored Overlay (Blue tint)</h3>
          <HeroSection
            content={{
              title: 'Creative Colored Overlay',
              subtitle: 'Brand-colored overlay effect',
              description: 'A blue overlay creates a cohesive brand experience while maintaining text readability.',
              background: {
                type: 'image',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
                position: 'center center',
                size: 'cover'
              },
              overlay: {
                opacity: 0.6,
                color: '#1e3a8a' // Blue-800
              }
            }}
            size="md"
            textSize="md"
          />
        </div>

        {/* Gradient overlay */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Gradient Overlay</h3>
          <HeroSection
            content={{
              title: 'Sophisticated Gradient Overlay',
              subtitle: 'Professional gradient effect',
              description: 'A gradient overlay from transparent to dark creates a sophisticated, professional appearance.',
              background: {
                type: 'image',
                image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop',
                position: 'center center',
                size: 'cover'
              },
              overlay: {
                opacity: 1.0,
                gradient: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)'
              }
            }}
            size="md"
            textSize="md"
            contentPosition="left"
          />
        </div>

        {/* Radial gradient overlay (vignette effect) */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Vignette Overlay</h3>
          <HeroSection
            content={{
              title: 'Cinematic Vignette Effect',
              subtitle: 'Dramatic focus on center content',
              description: 'A radial gradient overlay creates a cinematic vignette effect, drawing focus to the center.',
              background: {
                type: 'image',
                image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1920&h=1080&fit=crop',
                position: 'center center',
                size: 'cover'
              },
              overlay: {
                opacity: 1.0,
                gradient: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.7) 100%)'
              }
            }}
            size="md"
            textSize="md"
          />
        </div>

        {/* No overlay comparison */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">No Overlay (Comparison)</h3>
          <HeroSection
            content={{
              title: 'No Overlay Example',
              subtitle: 'Text directly over image',
              description: 'Without an overlay, text contrast depends entirely on the background image content.',
              background: {
                type: 'image',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
                position: 'center center',
                size: 'cover'
              }
              // No overlay specified
            }}
            size="md"
            textSize="md"
          />
        </div>
      </div>

      {/* Video Background Examples Section */}
      <div className="mb-8 p-4">
        <h2 className="text-xl font-bold mb-4">Video Background Heroes</h2>
        <p className="text-muted-foreground mb-6">
          Demonstrating video backgrounds with different configurations, optimizations, and fallbacks
        </p>
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Some browsers may block autoplay. If you see a play button overlay,
            click it to start video playback. Videos show poster images while loading, then transition to playing video.
            All videos are muted for autoplay compatibility.
          </p>
        </div>

        {/* Simple Test Video */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Simple Test Video</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Basic video test with a very small, reliable video file.
          </p>
          <HeroSection
            content={{
              title: 'Simple Video Test',
              subtitle: 'Testing video playback',
              description: 'This should show a small test video if video playback is working.',
              background: {
                type: 'video',
                video: {
                  src: 'https://www.w3schools.com/html/mov_bbb.mp4',
                  poster: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop&q=80',
                  autoPlay: true,
                  loop: true,
                  muted: true,
                }
              },
              overlay: {
                opacity: 0.3,
                color: '#000000'
              }
            }}
            size="sm"
            textSize="sm"
          />
        </div>

        {/* Basic Video Background */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Basic Video Background</h3>
          <p className="text-sm text-muted-foreground mb-4">
            MP4 video with autoplay, loop, and muted attributes. Includes poster image and fallback.
          </p>
          <HeroSection
            content={{
              title: 'Video Hero Experience',
              subtitle: 'Engaging motion backgrounds',
              description: 'Video backgrounds create dynamic, engaging hero sections that capture attention and enhance storytelling.',
              primaryCTA: {
                label: 'Watch Demo',
                href: '/demo',
                variant: 'primary'
              },
              secondaryCTA: {
                label: 'Learn More',
                href: '/learn-more',
                variant: 'outline'
              },
              background: {
                type: 'video',
                video: {
                  src: 'https://www.w3schools.com/html/mov_bbb.mp4',
                  poster: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&q=80',
                  autoPlay: true,
                  loop: true,
                  muted: true,
                  fallbackImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&q=80'
                },
                position: 'center center',
                size: 'cover'
              },
              overlay: {
                opacity: 0.4,
                color: '#000000'
              }
            }}
            size="lg"
            textSize="lg"
            contentPosition="center"
          />
        </div>

        {/* Video with Strong Overlay */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Video with Strong Overlay</h3>
          <p className="text-sm text-muted-foreground mb-4">
            High contrast overlay ensures text readability over motion backgrounds.
          </p>
          <HeroSection
            content={{
              title: 'High Contrast Video Hero',
              subtitle: 'Maximum readability over motion',
              description: 'Strong overlays ensure perfect text contrast even with dynamic video backgrounds.',
              background: {
                type: 'video',
                video: {
                  src: 'https://www.w3schools.com/html/movie.mp4',
                  poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80',
                  autoPlay: true,
                  loop: true,
                  muted: true,
                  fallbackImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80'
                }
              },
              overlay: {
                opacity: 0.7,
                color: '#000000'
              }
            }}
            size="md"
            textSize="md"
            contentPosition="left"
          />
        </div>

        {/* Video with Gradient Overlay */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Video with Gradient Overlay</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Sophisticated gradient overlay creates professional appearance over video.
          </p>
          <HeroSection
            content={{
              title: 'Professional Video Presentation',
              subtitle: 'Gradient overlay for sophistication',
              description: 'Gradient overlays combine beautifully with video backgrounds for elegant, professional presentations.',
              primaryCTA: {
                label: 'Get Started',
                href: '/start',
                variant: 'primary'
              },
              background: {
                type: 'video',
                video: {
                  src: 'https://www.w3schools.com/html/mov_bbb.mp4',
                  poster: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1920&h=1080&fit=crop&q=80',
                  autoPlay: true,
                  loop: true,
                  muted: true,
                  fallbackImage: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1920&h=1080&fit=crop&q=80'
                }
              },
              overlay: {
                opacity: 1.0,
                gradient: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)'
              }
            }}
            size="md"
            textSize="md"
            contentPosition="center"
          />
        </div>

        {/* Mobile-Optimized Video */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Mobile-Optimized Video</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Automatically falls back to static image on mobile devices for better performance.
          </p>
          <HeroSection
            content={{
              title: 'Mobile-Friendly Video Hero',
              subtitle: 'Optimized for all devices',
              description: 'Desktop users see the video background, while mobile users get an optimized static image for better performance and data usage.',
              background: {
                type: 'video',
                video: {
                  src: 'https://www.w3schools.com/html/movie.mp4',
                  poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80',
                  autoPlay: true,
                  loop: true,
                  muted: true,
                  fallbackImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80'
                }
              },
              overlay: {
                opacity: 0.5,
                color: '#1a1a1a'
              }
            }}
            size="md"
            textSize="md"
            contentPosition="right"
          />
        </div>

        {/* Video with Custom Positioning */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Video with Custom Positioning</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Video background with custom object positioning for better focal point control.
          </p>
          <HeroSection
            content={{
              title: 'Precisely Positioned Video',
              subtitle: 'Control the focal point',
              description: 'Custom positioning allows you to control which part of the video is visible and how it aligns within the hero section.',
              background: {
                type: 'video',
                video: {
                  src: 'https://www.w3schools.com/html/mov_bbb.mp4',
                  poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&q=80',
                  autoPlay: true,
                  loop: true,
                  muted: true,
                  fallbackImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&q=80'
                },
                position: 'top center',
                size: 'cover'
              },
              overlay: {
                opacity: 0.3,
                color: '#000000'
              }
            }}
            size="sm"
            textSize="sm"
            contentPosition="left"
          />
        </div>

        {/* Fullscreen Video Hero */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Fullscreen Video Hero</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Full viewport height video hero for maximum impact on landing pages.
          </p>
          <HeroSection
            content={{
              title: 'Cinematic Video Experience',
              subtitle: 'Full-screen impact',
              description: 'Create unforgettable first impressions with full-screen video heroes that immediately engage your audience.',
              primaryCTA: {
                label: 'Experience Now',
                href: '/experience',
                variant: 'primary'
              },
              secondaryCTA: {
                label: 'See Features',
                href: '/features',
                variant: 'outline'
              },
              background: {
                type: 'video',
                video: {
                  src: 'https://www.w3schools.com/html/mov_bbb.mp4',
                  poster: 'https://images.unsplash.com/photo-1418065460487-3956c3bac438?w=1920&h=1080&fit=crop&q=80',
                  autoPlay: true,
                  loop: true,
                  muted: true,
                  fallbackImage: 'https://images.unsplash.com/photo-1418065460487-3956c3bac438?w=1920&h=1080&fit=crop&q=80'
                }
              },
              overlay: {
                opacity: 0.6,
                gradient: 'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)'
              }
            }}
            size="xl"
            variant="fullscreen"
            textSize="lg"
            contentPosition="center"
          />
        </div>

        {/* Video Error Handling Demo */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Video Error Handling</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Demonstrates graceful fallback when video fails to load (using intentionally broken video URL).
          </p>
          <HeroSection
            content={{
              title: 'Robust Error Handling',
              subtitle: 'Graceful fallback system',
              description: 'When videos fail to load, the system automatically falls back to static images ensuring your hero section always looks professional.',
              background: {
                type: 'video',
                video: {
                  src: '/nonexistent-video.mp4', // This will fail and trigger fallback
                  poster: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1920&h=1080&fit=crop',
                  autoPlay: true,
                  loop: true,
                  muted: true,
                  fallbackImage: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1920&h=1080&fit=crop'
                }
              },
              overlay: {
                opacity: 0.5,
                color: '#000000'
              }
            }}
            size="md"
            textSize="md"
            contentPosition="center"
          />
        </div>
      </div>

      {/* Slide Background Heroes Section */}
      <div className="mb-8 p-4">
        <h2 className="text-xl font-bold mb-4">Slide Background Heroes</h2>
        <p className="text-muted-foreground mb-6">
          Demonstrating slide carousel backgrounds with autoplay, navigation controls, and transitions
        </p>

        {/* Basic Slide Carousel */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Basic Slide Carousel</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Simple slide carousel with autoplay and dot navigation.
          </p>
          <HeroSection
            content={{
              title: 'Dynamic Slide Backgrounds',
              subtitle: 'Engaging visual storytelling',
              description: 'Slide backgrounds create dynamic visual experiences that capture attention and enhance your message.',
              primaryCTA: {
                label: 'View Gallery',
                href: '/gallery',
                variant: 'primary'
              },
              secondaryCTA: {
                label: 'Learn More',
                href: '/learn-more',
                variant: 'outline'
              },
              background: {
                type: 'slides',
                slides: {
                  items: [
                    {
                      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80',
                      duration: 4000
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&q=80',
                      duration: 4000
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1920&h=1080&fit=crop&q=80',
                      duration: 4000
                    }
                  ],
                  transition: {
                    type: 'fade',
                    duration: 800
                  },
                  navigation: {
                    showDots: true,
                    showArrows: true,
                    autoPlay: true,
                    pauseOnHover: true
                  },
                  accessibility: {
                    slideAnnouncements: true,
                    keyboardNavigation: true
                  }
                }
              },
              overlay: {
                opacity: 0.4,
                color: '#000000'
              }
            }}
            size="lg"
            textSize="lg"
            contentPosition="center"
          />
        </div>

        {/* Slides with Per-Slide Content */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Slides with Dynamic Content</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Each slide can override the main hero content with its own title and subtitle.
          </p>
          <HeroSection
            content={{
              title: 'Default Hero Title',
              subtitle: 'This appears when no slide override is set',
              description: 'The description remains consistent across all slides, providing context.',
              primaryCTA: {
                label: 'Get Started',
                href: '/start',
                variant: 'primary'
              },
              background: {
                type: 'slides',
                slides: {
                  items: [
                    {
                      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop&q=80',
                      title: 'Adventure Awaits',
                      subtitle: 'Explore the great outdoors',
                      duration: 5000
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&q=80',
                      title: 'Peaceful Moments',
                      subtitle: 'Find tranquility in nature',
                      duration: 5000
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1418065460487-3956c3bac438?w=1920&h=1080&fit=crop&q=80',
                      title: 'Urban Exploration',
                      subtitle: 'Discover city landscapes',
                      duration: 5000
                    }
                  ],
                  transition: {
                    type: 'fade',
                    duration: 1000
                  },
                  navigation: {
                    showDots: true,
                    showArrows: true,
                    autoPlay: true
                  }
                }
              },
              overlay: {
                opacity: 0.5,
                color: '#000000'
              }
            }}
            size="md"
            textSize="md"
            contentPosition="left"
          />
        </div>

        {/* Manual Navigation Only */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Manual Navigation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Slides without autoplay - user controls the experience.
          </p>
          <HeroSection
            content={{
              title: 'Control Your Journey',
              subtitle: 'Navigate at your own pace',
              description: 'Some experiences are better when you control the timing. Use the navigation controls to explore each slide.',
              background: {
                type: 'slides',
                slides: {
                  items: [
                    {
                      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&q=80'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1920&h=1080&fit=crop&q=80'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop&q=80'
                    }
                  ],
                  transition: {
                    type: 'fade',
                    duration: 600
                  },
                  navigation: {
                    showDots: true,
                    showArrows: true,
                    autoPlay: false
                  }
                }
              },
              overlay: {
                opacity: 0.6,
                gradient: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%)'
              }
            }}
            size="md"
            textSize="md"
            contentPosition="left"
          />
        </div>

        {/* Fast Slideshow */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Fast Slideshow</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Quick slide transitions for dynamic energy.
          </p>
          <HeroSection
            content={{
              title: 'Dynamic Energy',
              subtitle: 'Fast-paced visual experience',
              description: 'Quick transitions create energy and movement, perfect for highlighting multiple products or locations.',
              background: {
                type: 'slides',
                slides: {
                  items: [
                    {
                      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&q=80',
                      duration: 2000
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1418065460487-3956c3bac438?w=1920&h=1080&fit=crop&q=80',
                      duration: 2000
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop&q=80',
                      duration: 2000
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80',
                      duration: 2000
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&q=80',
                      duration: 2000
                    }
                  ],
                  transition: {
                    type: 'fade',
                    duration: 400
                  },
                  navigation: {
                    showDots: true,
                    showArrows: false,
                    autoPlay: true,
                    pauseOnHover: true
                  }
                }
              },
              overlay: {
                opacity: 0.3,
                color: '#000000'
              }
            }}
            size="sm"
            textSize="sm"
            contentPosition="center"
          />
        </div>

        {/* Minimal Slides (Dots Only) */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Minimal Navigation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Clean interface with dot navigation only.
          </p>
          <HeroSection
            content={{
              title: 'Clean & Minimal',
              subtitle: 'Distraction-free experience',
              description: 'Sometimes less is more. Clean slide navigation keeps focus on your content.',
              background: {
                type: 'slides',
                slides: {
                  items: [
                    {
                      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1920&h=1080&fit=crop&q=80',
                      duration: 6000
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop&q=80',
                      duration: 6000
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&q=80',
                      duration: 6000
                    }
                  ],
                  transition: {
                    type: 'fade',
                    duration: 1200
                  },
                  navigation: {
                    showDots: true,
                    showArrows: false,
                    autoPlay: true,
                    pauseOnHover: true
                  }
                }
              },
              overlay: {
                opacity: 0.5,
                gradient: 'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)'
              }
            }}
            size="md"
            textSize="md"
            contentPosition="center"
          />
        </div>
      </div>
    </div>
  );
}