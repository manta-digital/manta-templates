---
title: "Interactive Video Player Demo"
description: "Demonstration of the interactive video player with full controls and accessibility features."
videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
thumbnailUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
displayMode: "player"
autoplay: false
controls: true
featured: true
order: 1
---

# Interactive Video Player Demo

This video demonstrates the capabilities of our interactive video player component with full controls and accessibility features.

## Features

### 🎮 Full Player Controls
- Play/pause functionality
- Volume control
- Seek bar for navigation
- Fullscreen support
- Picture-in-picture mode

### ♿ Accessibility Features
- Screen reader support
- Keyboard navigation
- ARIA labels and descriptions
- Focus management
- Reduced motion support

### 🚀 Performance Optimizations
- Lazy loading with intersection observer
- Dynamic import for client-side only rendering
- Preload options for optimal loading
- Error handling and fallbacks

## Technical Details

The video player is built using:
- **ReactPlayer**: Robust video player library
- **Intersection Observer**: For lazy loading
- **Dynamic Imports**: Client-side only rendering
- **Accessibility APIs**: WCAG compliant implementation

## Usage Example

```tsx
import VideoCardContainer from '@/components/cards/VideoCardContainer';

<VideoCardContainer 
  slug="player-example" 
  overlay={true}
/>
```

This creates a fully interactive video player with controls, accessibility features, and performance optimizations built-in.

## Browser Support

The video player supports all modern browsers including:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

For older browsers, graceful fallbacks are provided to ensure basic video functionality remains available.
