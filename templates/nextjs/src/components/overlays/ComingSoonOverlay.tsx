// src/components/overlays/ComingSoonOverlay.tsx
"use client";
import React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type ColorKey = "teal" | "purple" | "amber";

const colorMap: Record<ColorKey, {
  badgeBg: string;
  badgeText: string;
  icon: string;
  pattern: string;
  border: string;
}> = {
  teal: {
    badgeBg: "bg-teal-500/20",
    badgeText: "text-teal-300",
    icon: "text-teal-400",
    pattern: "from-teal-500 to-emerald-400",
    border: "border-teal-700/30",
  },
  purple: {
    badgeBg: "bg-purple-500/20",
    badgeText: "text-purple-300",
    icon: "text-purple-400",
    pattern: "from-purple-500 to-fuchsia-400",
    border: "border-purple-700/30",
  },
  amber: {
    badgeBg: "bg-amber-500/20",
    badgeText: "text-amber-300",
    icon: "text-amber-400",
    pattern: "from-amber-500 to-yellow-400",
    border: "border-amber-700/30",
  },
};

export interface ComingSoonOverlayProps {
  color?: ColorKey;
  label?: string;
  blurAmount?: "sm" | "md" | "lg";
  patternLines?: number;
  className?: string;
  children: React.ReactNode;
}

export const ComingSoonOverlay: React.FC<ComingSoonOverlayProps> = ({
  color = "teal",
  label = "Coming Soon",
  blurAmount = "md",
  patternLines = 12,
  className,
  children,
}) => {
  const c = colorMap[color];
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