import { useMemo } from 'react';
import { Accent } from '../types/theme';

export interface ThemeInfo {
  id: Accent;
  displayName: string;
  source: 'ui-core' | 'user';
}

/**
 * Hook to discover available themes from CSS registry system
 * Reads theme configuration from CSS variables and returns merged theme list
 */
export const useAvailableThemes = (): ThemeInfo[] => {
  return useMemo(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return getDefaultThemes();
    }

    try {
      const computedStyle = getComputedStyle(document.documentElement);
      
      // Get UI-core themes
      const uiThemes = parseThemeList(computedStyle.getPropertyValue('--ui-themes'));
      const uiThemeNames = parseThemeNames(computedStyle.getPropertyValue('--ui-theme-names'));
      
      // Get user-defined themes
      const userThemes = parseThemeList(computedStyle.getPropertyValue('--user-themes'));
      const userThemeNames = parseThemeNames(computedStyle.getPropertyValue('--user-theme-names'));
      
      // Combine themes from both sources
      const themes: ThemeInfo[] = [];
      
      // Add UI-core themes
      uiThemes.forEach((themeId, index) => {
        const rawDisplayName = uiThemeNames[index] || formatDisplayName(themeId);
        themes.push({
          id: themeId as Accent,
          displayName: stripEmojis(rawDisplayName),
          source: 'ui-core'
        });
      });
      
      // Add user themes
      userThemes.forEach((themeId, index) => {
        const rawDisplayName = userThemeNames[index] || formatDisplayName(themeId);
        themes.push({
          id: themeId as Accent,
          displayName: stripEmojis(rawDisplayName),
          source: 'user'
        });
      });
      
      return themes.length > 0 ? themes : getDefaultThemes();
    } catch (error) {
      console.warn('Failed to read theme registry from CSS variables:', error);
      return getDefaultThemes();
    }
  }, []);
};

/**
 * Parse comma-separated theme list from CSS variable
 */
function parseThemeList(value: string): string[] {
  if (!value || value.trim() === '""' || value.trim() === '') {
    return [];
  }
  
  // Remove quotes and split by comma
  const cleanValue = value.replace(/^["']|["']$/g, '').trim();
  return cleanValue.split(',').map(theme => theme.trim()).filter(Boolean);
}

/**
 * Parse semicolon-separated theme names from CSS variable
 */
function parseThemeNames(value: string): string[] {
  if (!value || value.trim() === '""' || value.trim() === '') {
    return [];
  }
  
  // Remove quotes and split by semicolon
  const cleanValue = value.replace(/^["']|["']$/g, '').trim();
  return cleanValue.split(';').map(name => name.trim()).filter(Boolean);
}

/**
 * Format theme ID into display name (fallback)
 * Strips emojis for clean UI display
 */
function formatDisplayName(themeId: string): string {
  // Convert camelCase/kebab-case to Title Case
  return themeId
    .replace(/([A-Z])/g, ' $1')
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Strip emojis from display name for clean UI
 */
function stripEmojis(displayName: string): string {
  return displayName.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();
}

/**
 * Default theme list when CSS variables are not available
 */
function getDefaultThemes(): ThemeInfo[] {
  return [
    { id: 'teal', displayName: 'Teal', source: 'ui-core' },
    { id: 'mintteal', displayName: 'Mint Teal', source: 'ui-core' },
    { id: 'blue', displayName: 'Blue', source: 'ui-core' },
    { id: 'purple', displayName: 'Purple', source: 'ui-core' },
    { id: 'orange', displayName: 'Orange', source: 'ui-core' },
  ];
}