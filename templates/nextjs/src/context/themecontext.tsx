"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Theme = "light" | "dark";
type Accent = "teal" | "mintteal" | "blue" | "purple";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  defaultAccent?: Accent;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  accent: Accent;
  setAccent: (accent: Accent) => void;
}

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
  accent: "teal",
  setAccent: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "ui-theme",
  defaultAccent = "teal",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [accent, setAccent] = useState<Accent>(defaultAccent);

  // Initialize theme/accent from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey) as Theme;
      if (stored === "light" || stored === "dark") {
        setTheme(stored);
      }
      const storedAccent = localStorage.getItem(`${storageKey}-accent`) as Accent;
      if (storedAccent === "teal" || storedAccent === "mintteal" || storedAccent === "blue" || storedAccent === "purple") {
        setAccent(storedAccent);
      }
    } catch {}
  }, [storageKey]);

  // Apply selected theme and persist
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    try {
      localStorage.setItem(storageKey, theme);
    } catch {}
  }, [theme, storageKey]);

  // Apply selected accent and persist
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-palette", accent);
    try {
      localStorage.setItem(`${storageKey}-accent`, accent);
    } catch {}
  }, [accent, storageKey]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
    },
    accent,
    setAccent: (newAccent: Accent) => {
      setAccent(newAccent);
    },
  };

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
