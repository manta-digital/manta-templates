import { colord, extend, getFormat } from 'colord';
import labPlugin from 'colord/plugins/lab';
import lchPlugin from 'colord/plugins/lch';

// Extend colord with LAB and LCH plugins
extend([labPlugin, lchPlugin]);

export interface ColorResolutionResult {
  hex: string;
  resolved: boolean;
  original: string | number;
}

/**
 * Resolves a CSS custom property to its computed value
 */
function resolveCSSVariable(varName: string): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const computedStyle = getComputedStyle(document.documentElement);
    const resolvedValue = computedStyle.getPropertyValue(varName).trim();
    return resolvedValue || null;
  } catch {
    return null;
  }
}

/**
 * Resolves a color input to hex format
 */
export function resolveThemeColor(
  color: string | number | undefined,
  fallback = '#ffffff'
): ColorResolutionResult {
  // Handle undefined/null
  if (color === undefined || color === null) {
    return { hex: fallback, resolved: false, original: color as any };
  }

  // Handle numeric colors (Three.js format)
  if (typeof color === 'number') {
    const hex = `#${color.toString(16).padStart(6, '0')}`;
    return { hex, resolved: true, original: color };
  }

  // Handle string colors
  if (typeof color !== 'string') {
    return { hex: fallback, resolved: false, original: color };
  }

  let resolvedColor = color;
  let wasResolved = true;

  // Handle CSS custom properties
  if (color.startsWith('var(')) {
    const varName = color.slice(4, -1); // Remove 'var(' and ')'
    const cssValue = resolveCSSVariable(varName);
    
    if (cssValue) {
      resolvedColor = cssValue;
    } else {
      return { hex: fallback, resolved: false, original: color };
    }
  }

  // Convert resolved color to hex
  let hex: string;

  try {
    // Check if colord can understand the format first
    const format = getFormat(resolvedColor);
    console.log(`🔍 Color format detected: ${format} for "${resolvedColor}"`);
    
    if (resolvedColor.startsWith('oklch(')) {
      // Parse OKLCH manually since colord doesn't support it directly
      const oklchMatch = resolvedColor.match(/oklch\(\s*([\d.-]+)\s*,?\s*([\d.-]+)\s*,?\s*([\d.-]+)\s*\)/);
      if (oklchMatch) {
        const l = parseFloat(oklchMatch[1]); // lightness 0-1
        const c = parseFloat(oklchMatch[2]); // chroma 0-0.4  
        const h = parseFloat(oklchMatch[3]); // hue 0-360
        
        console.log(`🔬 Parsed OKLCH: L=${l}, C=${c}, H=${h}`);
        
        // Try using colord's LCH format (scale values appropriately)
        // OKLCH lightness 0-1 -> LCH lightness 0-100
        // OKLCH chroma 0-0.4 -> LCH chroma roughly 0-100 (scale by 250)
        const colorObj = colord({ l: l * 100, c: c * 250, h });
        console.log(`🟦 Colord LCH isValid: ${colorObj.isValid()}`);
        
        if (colorObj.isValid()) {
          hex = colorObj.toHex();
          console.log(`🎨 Final hex result: ${hex}`);
        } else {
          throw new Error('Invalid OKLCH values converted to LCH');
        }
      } else {
        throw new Error('Invalid OKLCH format');
      }
    } else {
      // Use colord for standard parsing
      const colorObj = colord(resolvedColor);
      console.log(`📈 Colord isValid: ${colorObj.isValid()}`);
      if (colorObj.isValid()) {
        hex = colorObj.toHex();
        console.log(`🎨 Final hex result: ${hex}`);
      } else {
        throw new Error('Invalid color format');
      }
    }
  } catch (error) {
    console.warn(`Color parsing failed for "${resolvedColor}":`, error);
    return { hex: fallback, resolved: false, original: color };
  }

  return {
    hex,
    resolved: wasResolved,
    original: color
  };
}