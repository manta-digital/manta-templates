"use client";

import React from "react";
import { useTheme } from "../../hooks/useTheme";
import { useAvailableThemes } from "../../hooks/useAvailableThemes";
import { Button } from "./button";
import { Droplet } from "lucide-react";
import { cn } from "../../utils/cn";

export interface ColorSelectorProps {
  className?: string;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ className }) => {
  const { accent, setAccent } = useTheme();
  const availableThemes = useAvailableThemes();

  const cycleAccent = () => {
    const currentIndex = availableThemes.findIndex(theme => theme.id === accent);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    const nextTheme = availableThemes[nextIndex];
    setAccent(nextTheme.id);
  };

  const currentTheme = availableThemes.find(theme => theme.id === accent);
  const displayName = currentTheme?.displayName || accent;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={cycleAccent}
      className={cn(
        "gap-2 rounded-full border-2 transition-all outline-none",
        "text-[var(--color-accent-11)] !border-[var(--color-border-accent)] dark:!border-[var(--color-border-accent)]",
        "!bg-transparent dark:!bg-transparent",
        "hover:!bg-[var(--color-accent-3)] dark:hover:!bg-[var(--color-accent-4)]",
        "hover:!text-[var(--color-accent-12)] hover:!border-[var(--color-border-accent-hover)]",
        className
      )}
      title={`Theme: ${displayName}`}
      aria-label="Cycle through available themes"
    >
      <Droplet className="h-4 w-4" />
      <span>{displayName}</span>
      <span className="sr-only">Cycle through available themes</span>
    </Button>
  );
};