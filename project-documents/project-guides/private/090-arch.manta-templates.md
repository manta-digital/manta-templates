# Architecture: Manta Templates

## Color Space Handling

**Version**: 2025-09-02  
**Component**: CosineTerrainCard (Three.js integration)  
**Library**: colord v2.9.3 with LAB plugin

Modern browsers have changed their `getComputedStyle()` behavior to return colors in their original CSS color space format (such as `lab()`, `lch()`, `oklch()`) rather than automatically converting to RGB. This created compatibility issues with Three.js, which expects RGB/hex color formats and throws "Unknown color model" errors when receiving LAB colors.

**Implementation Details (2025-09-02)**:
- **Library**: colord v2.9.3 with LAB plugin extension
- **Key Learning**: colord LAB plugin requires object format `{l: 72.4, a: -38.3, b: 4.1}`, not string format `lab(72.4% -38.3 4.1)`
- **Solution**: Parse LAB strings with regex, convert to object, then use `colord({l, a, b}).toHex()`
- **Compatibility**: Handles all CSS color formats (hex, rgb, hsl, oklch, lab) through single colord interface
- **Performance**: 1.7KB gzipped, 3x faster than alternatives, zero dependencies

**Critical Architecture Decision**: Avoid manual color conversion math. Previous attempts at manual OKLCH-to-RGB conversion were error-prone and incomplete. Colord provides CSS Color Module Level 4 compliance with proper color science matrices and gamma correction. This future-proofs against additional color space evolution while maintaining simplicity.

**Template Integration**: CosineTerrainCard `resolveCSSColor()` function now uses unified colord conversion for all color types, eliminating 50+ lines of manual parsing code in favor of 3-line colord calls.