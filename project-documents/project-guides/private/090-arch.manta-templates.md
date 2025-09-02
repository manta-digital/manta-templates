# Architecture: Manta Templates

## Color Space Handling

**Version**: 2025-09-02  
**Component**: CosineTerrainCard (Three.js integration)  
**Library**: colord v2.9.3 with LAB plugin

Modern browsers have changed their `getComputedStyle()` behavior to return colors in their original CSS color space format (such as `lab()`, `lch()`, `oklch()`) rather than automatically converting to RGB. This created compatibility issues with Three.js, which expects RGB/hex color formats and throws "Unknown color model" errors when receiving LAB colors. We implemented colord library (1.7KB gzipped) with its LAB plugin to handle proper color space conversions. The library is CSS Color Module Level 4 compliant, battle-tested, and provides reliable LAB-to-RGB conversion using correct color science matrices and gamma correction. This solution handles the browser evolution toward advanced color spaces while maintaining compatibility with graphics libraries that expect traditional RGB formats.