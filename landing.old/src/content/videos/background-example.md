---
title: "Background Video Demo"
description: "Looping background video with overlay content support."
videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
poster: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg"
displayMode: "background"
autoplay: true
controls: false
featured: false
order: 2
---

# Background Video Demo

This demonstrates a looping background video that can serve as an engaging backdrop for content overlays.

## Features

### 🔄 Seamless Looping
- Continuous playback without interruption
- Smooth transitions between loop cycles
- Optimized for performance

### 🎯 Overlay Support
- Text and content overlays
- Customizable positioning
- Responsive design
- Accessibility considerations

### ⚡ Auto-play Optimization
- Muted by default for browser compliance
- Graceful fallback for restricted environments
- Poster image for loading states
- Error handling for failed loads

## Use Cases

Perfect for:
- **Hero sections** with dynamic backgrounds
- **Product showcases** with motion
- **Landing pages** with engaging visuals
- **Portfolio pieces** with video content

## Technical Implementation

The background video component:
- Uses native HTML5 video element
- Implements autoplay best practices
- Provides fallback poster images
- Handles browser autoplay restrictions

## Browser Autoplay Policies

Modern browsers have strict autoplay policies:
- Videos must be muted for autoplay
- User interaction may be required
- Fallback to poster image when blocked
- Progressive enhancement approach

## Usage Example

```tsx
import VideoCardContainer from '@/components/cards/VideoCardContainer';

<VideoCardContainer 
  slug="background-example" 
  overlay={true}
  className="min-h-[400px]"
>
  <div className="absolute inset-0 flex items-center justify-center">
    <h2 className="text-white text-4xl font-bold">Your Content Here</h2>
  </div>
</VideoCardContainer>
```

This creates a background video with custom overlay content that remains accessible and performant across all devices.
