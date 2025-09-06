import { colord, extend } from 'colord';
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
  const wasResolved = true;

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
    if (resolvedColor.startsWith('oklch(')) {
      // Parse OKLCH manually since colord doesn't support it directly
      const oklchMatch = resolvedColor.match(/oklch\(\s*([\d.-]+%?)\s*,?\s*([\d.-]+)\s*,?\s*([\d.-]+)\s*\)/);
      if (oklchMatch) {
        const l = parseFloat(oklchMatch[1]); // lightness
        const c = parseFloat(oklchMatch[2]); // chroma 0-0.4  
        const h = parseFloat(oklchMatch[3]); // hue 0-360
        
        //console.log(`🔬 Parsed OKLCH: L=${l}${oklchMatch[1].includes('%') ? '%' : ''}, C=${c}, H=${h}`);
        
        let colorObj;
        if (oklchMatch[1].includes('%')) {
          // Percentage format is essentially LCH already
          const lchL = l; // 14.2% -> 14.2 (LCH lightness 0-100)
          const lchC = c * 100; // scale chroma appropriately for LCH
          //console.log(`🔄 Converting to LCH: L=${lchL}, C=${lchC}, H=${h}`);
          colorObj = colord({ l: lchL, c: lchC, h });
        } else {
          // Non-percentage format: OKLCH lightness 0-1 -> LCH lightness 0-100
          const lchL = l * 100;
          const lchC = c * 250; // scale chroma for LCH
          //console.log(`🔄 Converting to LCH: L=${lchL}, C=${lchC}, H=${h}`);
          colorObj = colord({ l: lchL, c: lchC, h });
        }

        if(colorObj.isDark()) {
          colorObj = colorObj.darken(0.1);
        }
        //console.log(`🟦 Colord LCH isValid: ${colorObj.isValid()}`);
        
        if (colorObj.isValid()) {
          hex = colorObj.toHex();
          //console.log(`🎨 Final hex result: ${hex}`);
        } else {
          throw new Error('Invalid OKLCH values converted to LCH');
        }
      } else {
        throw new Error('Invalid OKLCH format');
      }
    } else if (resolvedColor.startsWith('lab(')) {
      // Parse LAB manually - similar pattern to OKLCH
      const labMatch = resolvedColor.match(/lab\(\s*([\d.-]+%?)\s+([\d.-]+)\s+([\d.-]+)\s*\)/);
      if (labMatch) {
        const l = parseFloat(labMatch[1]); // lightness (LAB uses 0-100, percentage is already in correct range)
        const a = parseFloat(labMatch[2]); // a component  
        const b = parseFloat(labMatch[3]); // b component
        
        console.log(`🔬 Parsed LAB: L=${l}${labMatch[1].includes('%') ? '%' : ''}, A=${a}, B=${b}`);
        
        let colorObj = colord({ l, a, b });
        if (colorObj.isValid()) {
          if (colorObj.isDark()) {
            colorObj = colorObj.darken(0.1);
          }
          hex = colorObj.toHex();
          console.log(`🎨 Final hex result: ${hex}`);
        } else {
          throw new Error('Invalid LAB values');
        }
      } else {
        throw new Error('Invalid LAB format');
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