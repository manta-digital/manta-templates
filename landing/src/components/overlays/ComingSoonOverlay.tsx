// src/components/overlays/ComingSoonOverlay.tsx
"use client";
import React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

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
      badgeBg: "bg-teal-500/20",
      badgeText: "text-teal-300",
      icon: "text-teal-400",
      pattern: "from-teal-500 to-emerald-400",
      border: "border-teal-700/30",
    },
    light: {
      badgeBg: "bg-teal-100/60",
      badgeText: "text-teal-700",
      icon: "text-teal-600",
      pattern: "from-teal-400 to-emerald-500",
      border: "border-teal-300/50",
    },
  },
  purple: {
    dark: {
      badgeBg: "bg-purple-500/20",
      badgeText: "text-purple-300",
      icon: "text-purple-400",
      pattern: "from-purple-500 to-fuchsia-400",
      border: "border-purple-700/30",
    },
    light: {
      badgeBg: "bg-purple-100/60",
      badgeText: "text-purple-700",
      icon: "text-purple-600",
      pattern: "from-purple-400 to-fuchsia-500",
      border: "border-purple-300/50",
    },
  },
  amber: {
    dark: {
      badgeBg: "bg-amber-500/20",
      badgeText: "text-amber-300",
      icon: "text-amber-400",
      pattern: "from-amber-500 to-yellow-400",
      border: "border-amber-700/30",
    },
    light: {
      badgeBg: "bg-amber-100/60",
      badgeText: "text-amber-700",
      icon: "text-amber-600",
      pattern: "from-amber-400 to-yellow-500",
      border: "border-amber-300/50",
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
  mode = 'dark',
}) => {
  const c = colorMap[color][mode];
  const blurMap = { sm: 'backdrop-blur-[2px]', md: 'backdrop-blur-[4px]', lg: 'backdrop-blur' };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Underlying content */}
      <div aria-disabled className={cn("pointer-events-none select-none")}>  
        {children}
      </div>

      {/* Overlay with backdrop blur */}
      <div
        role="presentation"
        className={cn(
          "absolute inset-0 rounded-[0.5em] flex items-center justify-center backdrop-filter",
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