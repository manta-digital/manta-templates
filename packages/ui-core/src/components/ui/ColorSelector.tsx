"use client";

import React from "react";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "./button";
import { Droplet } from "lucide-react";
import { cn } from "../../utils/cn";

const ACCENTS = ["teal", "mintteal", "blue", "purple", "orange"] as const;

type AccentKey = (typeof ACCENTS)[number];

export interface ColorSelectorProps {
  className?: string;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ className }) => {
  const { accent, setAccent } = useTheme();

  const cycleAccent = () => {
    const idx = ACCENTS.indexOf(accent as AccentKey);
    const next = ACCENTS[(idx + 1) % ACCENTS.length];
    setAccent(next as AccentKey);
  };

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
      title={`Accent: ${accent}`}
      aria-label="Toggle accent palette"
    >
      <Droplet className="h-4 w-4" />
      <span className="capitalize">{accent}</span>
      <span className="sr-only">Toggle accent palette</span>
    </Button>
  );
};