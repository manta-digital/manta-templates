import React from 'react';

/**
 * Slide transition engine for handling different slide transition effects
 */

interface SlideTransitionEngineProps {
  currentSlide: any;
  previousSlide: any;
  currentSlideLoaded: boolean;
  previousSlideLoaded: boolean;
  transitionType: 'fade' | 'slide' | 'zoom' | 'dissolve';
  transitionDuration: number;
  transitionEasing: string;
  transitionDirection: 'forward' | 'backward';
  isTransitioning: boolean;
  backgroundPosition: string;
  backgroundSize: string;
}

export function SlideTransitionEngine({
  currentSlide,
  previousSlide,
  currentSlideLoaded,
  previousSlideLoaded,
  transitionType,
  transitionDuration,
  transitionEasing,
  transitionDirection,
  isTransitioning,
  backgroundPosition,
  backgroundSize,
}: SlideTransitionEngineProps) {

  const baseSlideStyle = {
    backgroundPosition,
    backgroundSize,
    backgroundRepeat: 'no-repeat' as const,
  };

  const transitionStyle = {
    transition: `all ${transitionDuration}ms ${transitionEasing}`,
  };

  // Render transition based on type
  switch (transitionType) {
    case 'slide':
      return (
        <div className="absolute inset-0 w-full h-full">
          {/* Previous slide (slides out during transition) */}
          {previousSlide && isTransitioning && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                ...baseSlideStyle,
                ...transitionStyle,
                backgroundImage: `url(${previousSlide.image})`,
                transform: transitionDirection === 'forward'
                  ? 'translateX(-100%)'
                  : 'translateX(100%)',
                opacity: previousSlideLoaded ? 1 : 0,
                zIndex: 1,
              }}
            />
          )}
          {/* Current slide (always visible, slides in during transition) */}
          {currentSlide && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                ...baseSlideStyle,
                ...transitionStyle,
                backgroundImage: `url(${currentSlide.image})`,
                transform: 'translateX(0%)', // Always at center
                opacity: currentSlideLoaded ? 1 : 0,
                zIndex: isTransitioning ? 2 : 1,
              }}
            />
          )}
        </div>
      );

    case 'zoom':
      return (
        <div className="absolute inset-0 w-full h-full">
          {/* Previous slide */}
          {previousSlide && isTransitioning && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                ...baseSlideStyle,
                ...transitionStyle,
                backgroundImage: `url(${previousSlide.image})`,
                transform: 'scale(0.9)',
                opacity: previousSlideLoaded ? 0 : 0,
              }}
            />
          )}
          {/* Current slide */}
          {currentSlide && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                ...baseSlideStyle,
                ...transitionStyle,
                backgroundImage: `url(${currentSlide.image})`,
                transform: isTransitioning ? 'scale(1)' : 'scale(1.1)',
                opacity: currentSlideLoaded ? 1 : 0,
              }}
            />
          )}
        </div>
      );

    case 'dissolve':
      return (
        <div className="absolute inset-0 w-full h-full">
          {/* Previous slide */}
          {previousSlide && isTransitioning && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                ...baseSlideStyle,
                ...transitionStyle,
                backgroundImage: `url(${previousSlide.image})`,
                opacity: previousSlideLoaded ? 0.3 : 0,
                filter: 'blur(2px) brightness(0.8)',
              }}
            />
          )}
          {/* Current slide */}
          {currentSlide && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                ...baseSlideStyle,
                ...transitionStyle,
                backgroundImage: `url(${currentSlide.image})`,
                opacity: currentSlideLoaded ? 1 : 0,
                filter: isTransitioning ? 'blur(0px) brightness(1)' : 'blur(1px) brightness(0.9)',
              }}
            />
          )}
        </div>
      );

    case 'fade':
    default:
      return (
        <div className="absolute inset-0 w-full h-full">
          {/* Previous slide */}
          {previousSlide && isTransitioning && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                ...baseSlideStyle,
                ...transitionStyle,
                backgroundImage: `url(${previousSlide.image})`,
                opacity: previousSlideLoaded ? 0 : 0,
              }}
            />
          )}
          {/* Current slide */}
          {currentSlide && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                ...baseSlideStyle,
                ...transitionStyle,
                backgroundImage: `url(${currentSlide.image})`,
                opacity: currentSlideLoaded ? 1 : 0,
              }}
            />
          )}
        </div>
      );
  }
}

SlideTransitionEngine.displayName = 'SlideTransitionEngine';