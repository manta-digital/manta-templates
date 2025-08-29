// packages/ui-core/src/components/overlays/ComingSoonOverlay.tsx
"use client";
import React from "react";
import { Clock } from "lucide-react";
import { cn } from "../../utils/cn";

type ColorKey = "teal" | "purple" | "amber";

const colorMap: Record<ColorKey, {
  dark: {
    badgeBg: string;
    badgeText: string;
    icon: string;
    pattern: string;
    border: string;
  };
  light: {
    badgeBg: string;
    badgeText: string;
    icon: string;
    pattern: string;
    border: string;
  };
}> = {
  teal: {
    dark: {
      badgeBg: "bg-[var(--color-accent-4)]/40",
      badgeText: "text-[var(--color-accent-11)]",
      icon: "text-[var(--color-accent-10)]",
      pattern: "from-[var(--color-accent-9)] to-[var(--color-accent-10)]",
      border: "border-[var(--color-card-border)]/30",
    },
    light: {
      badgeBg: "bg-[var(--color-accent-3)]/60",
      badgeText: "text-[var(--color-accent-12)]",
      icon: "text-[var(--color-accent-11)]",
      pattern: "from-[var(--color-accent-9)] to-[var(--color-accent-10)]",
      border: "border-[var(--color-card-border)]/50",
    },
  },
  purple: {
    dark: {
      badgeBg: "bg-[var(--color-accent-4)]/40",
      badgeText: "text-[var(--color-accent-11)]",
      icon: "text-[var(--color-accent-10)]",
      pattern: "from-[var(--color-accent-9)] to-[var(--color-accent-10)]",
      border: "border-[var(--color-card-border)]/30",
    },
    light: {
      badgeBg: "bg-[var(--color-accent-3)]/60",
      badgeText: "text-[var(--color-accent-12)]",
      icon: "text-[var(--color-accent-11)]",
      pattern: "from-[var(--color-accent-9)] to-[var(--color-accent-10)]",
      border: "border-[var(--color-card-border)]/50",
    },
  },
  amber: {
    dark: {
      badgeBg: "bg-[var(--color-accent-4)]/40",
      badgeText: "text-[var(--color-accent-11)]",
      icon: "text-[var(--color-accent-10)]",
      pattern: "from-[var(--color-accent-9)] to-[var(--color-accent-10)]",
      border: "border-[var(--color-card-border)]/30",
    },
    light: {
      badgeBg: "bg-[var(--color-accent-3)]/60",
      badgeText: "text-[var(--color-accent-12)]",
      icon: "text-[var(--color-accent-11)]",
      pattern: "from-[var(--color-accent-9)] to-[var(--color-accent-10)]",
      border: "border-[var(--color-card-border)]/50",
    },
  },
};

export interface ComingSoonOverlayProps {
  color?: ColorKey;
  label?: string;
  blurAmount?: "sm" | "md" | "lg";
  patternLines?: number;
  className?: string;
  children: React.ReactNode;
  mode?: 'dark' | 'light';
}

export const ComingSoonOverlay: React.FC<ComingSoonOverlayProps> = ({
  color = "teal",
  label = "Coming Soon",
  blurAmount = "md",
  patternLines = 12,
  className,
  children,
  mode,
}) => {
  // Default to dark mode if mode not provided, but allow override
  const currentMode = mode || 'dark';
  const c = colorMap[color]?.[currentMode] || colorMap[color].dark;
  const blurMap = { sm: 'backdrop-blur-[2px]', md: 'backdrop-blur-[4px]', lg: 'backdrop-blur' };

  return (
    <div className={cn("relative overflow-hidden h-full", className)}>
      {/* Underlying content */}
      <div aria-disabled className={cn("pointer-events-none select-none h-full")}>  
        {children}
      </div>

      {/* Overlay with backdrop blur */}
      <div
        role="presentation"
        className={cn(
          "absolute inset-0 rounded-lg flex items-center justify-center backdrop-filter border",
          blurMap[blurAmount],
          c.border,
          "z-10 overflow-hidden"
        )}
      >
        {/* Diagonal line pattern */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          {[...Array(patternLines)].map((_, i) => (
            <div
              key={i}
              className={cn("absolute h-px bg-gradient-to-r", c.pattern)}
              style={{
                top: `${(i * 100) / patternLines}%`,
                left: -20,
                right: -20,
                transform: "rotate(15deg)",
                transformOrigin: "left",
              }}
            />
          ))}
        </div>

        {/* Badge */}
        <div className={cn("flex items-center space-x-2 px-3 py-1.5 rounded-full z-20", c.badgeBg)}>
          <Clock size={14} className={c.icon} />
          <span className={cn("text-xs font-medium", c.badgeText)}>
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};