"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Read persisted theme from storage only after mount
    let storedTheme: Theme | null = null;
    try {
      storedTheme = localStorage.getItem(storageKey) as Theme;
    } catch (e) {
      console.error("Error reading localStorage for theme", e);
    }

    // Set the theme based on storage or default, only if different from current
    const effectiveTheme = storedTheme || defaultTheme;
    if (effectiveTheme !== theme) {
      setTheme(effectiveTheme);
    }
  }, [storageKey, defaultTheme, theme, setMounted]); // Run only once on mount

  useEffect(() => {
    // This effect now only runs when theme state changes *after* initial mount sync
    if (!mounted) return; // Don't run before mount check completes

    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);

    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey, mounted]); // Depend on theme, storageKey, and mounted

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
    },
  };

  // To prevent flash of unstyled content or incorrect theme, ensure children are
  // only rendered after mount or provide a mechanism for initial styling (like the
  // removed inline script or specific CSS targeting :root[data-theme=...])
  // For now, relying on suppressHydrationWarning and the component-level mount checks.

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
