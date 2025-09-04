"use client";

import React, {
  createContext,
  useState,
  useEffect,
} from "react";
import { Theme, Accent, ThemeProviderProps, ThemeProviderState } from "../types/theme";

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
  accent: "teal",
  setAccent: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

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
      if (storedAccent === "teal" || storedAccent === "mintteal" || storedAccent === "blue" || storedAccent === "purple" || storedAccent === "orange") {
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