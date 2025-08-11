"use client";

import React from "react";
import { useTheme } from "@/context/themecontext";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Droplet } from "lucide-react";
import { cn } from "@/lib/utils";

export const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className={cn(className)}>
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ) : (
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

const ACCENTS = ["teal", "mintteal", "blue", "purple"] as const;

type AccentKey = typeof ACCENTS[number];

export const AccentToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { accent, setAccent } = useTheme();

  const cycleAccent = () => {
    const idx = ACCENTS.indexOf(accent as AccentKey);
    const next = ACCENTS[(idx + 1) % ACCENTS.length];
    setAccent(next as AccentKey);
  };

  return (
    <Button variant="outline" size="sm" onClick={cycleAccent} className={cn("gap-2", className)}>
      <Droplet className="h-4 w-4" />
      <span className="capitalize">{accent}</span>
      <span className="sr-only">Toggle accent palette</span>
    </Button>
  );
};
