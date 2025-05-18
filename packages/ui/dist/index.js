// src/lib/utils.ts
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function formatDate(date, locales, options) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locales, options);
}

// src/layouts/grid-layout/grid-container.tsx
import { jsx } from "react/jsx-runtime";
var GridContainer = ({
  children,
  rowHeight = "auto",
  // Default row height
  gap = 4,
  // Default gap
  columns = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
  // Default responsive columns
  className
  // Ensure className is destructured
}) => {
  const gridStyle = {
    gridAutoRows: rowHeight
  };
  let gapClass = "";
  if (typeof gap === "number") {
    if (gap === 0)
      gapClass = "gap-0";
    else if (gap === 1)
      gapClass = "gap-1";
    else if (gap === 2)
      gapClass = "gap-2";
    else if (gap === 3)
      gapClass = "gap-3";
    else if (gap === 4)
      gapClass = "gap-4";
    else if (gap === 5)
      gapClass = "gap-5";
    else if (gap === 6)
      gapClass = "gap-6";
    else if (gap === 8)
      gapClass = "gap-8";
    else
      gapClass = `gap-${gap}`;
  } else if (typeof gap === "string") {
    gapClass = gap;
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "grid",
        columns,
        gapClass,
        // Use the determined gapClass string
        className
      ),
      style: gridStyle,
      children
    }
  );
};
var grid_container_default = GridContainer;

// src/bento-layout.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var BentoLayout = ({
  children,
  className,
  rowHeight = "minmax(6rem, auto)",
  gap = 4,
  columns = "grid-cols-6",
  autoFlow = "row"
  // Default to row
}) => {
  return /* @__PURE__ */ jsx2(
    grid_container_default,
    {
      rowHeight,
      gap,
      columns,
      className: cn("bento-layout", autoFlow === "column" ? "grid-flow-col" : "grid-flow-row", className),
      children
    }
  );
};
var bento_layout_default = BentoLayout;

// src/layouts/grid-layout/grid-layout.tsx
import React from "react";

// src/hooks/useBreakpoint.ts
import { useEffect, useState } from "react";

// src/styles/breakpoints.ts
var breakpoints_default = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
};

// src/hooks/useBreakpoint.ts
function pxToNum(px) {
  return parseInt(px.replace("px", ""), 10);
}
var breakpointArray = Object.entries(breakpoints_default).map(([name, px]) => ({ name, min: pxToNum(px) })).sort((a, b) => b.min - a.min);
function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState("default");
  useEffect(() => {
    function getBreakpoint() {
      const width = window.innerWidth;
      for (const bp of breakpointArray) {
        if (width >= bp.min)
          return bp.name;
      }
      return "default";
    }
    function handleResize() {
      setBreakpoint(getBreakpoint());
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return breakpoint;
}

// src/layouts/grid-layout/grid-layout.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var DEFAULT_TOTAL_COLS = 6;
var GridLayout = ({ gridData, children, className, gap = "1rem", minRowHeight }) => {
  const breakpoint = useBreakpoint();
  const breakpoints = ["default", "sm", "md", "lg", "xl", "2xl"];
  const idx = breakpoints.indexOf(breakpoint);
  const searchKeys = breakpoints.slice(0, idx + 1).reverse();
  let layout = gridData["default"] || [];
  for (const key of searchKeys) {
    if (gridData[key]) {
      layout = gridData[key];
      break;
    }
  }
  const totalCols = layout[0]?.reduce((a, b) => a + b, 0) || DEFAULT_TOTAL_COLS;
  let childIndex = 0;
  return /* @__PURE__ */ jsx3(
    "div",
    {
      className: `grid ${className || ""}`,
      style: {
        gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))`,
        gap,
        ...minRowHeight && { gridAutoRows: minRowHeight }
      },
      children: layout.map((row, rowIdx) => /* @__PURE__ */ jsx3(React.Fragment, { children: row.map((span, colIdx) => {
        if (childIndex >= children.length)
          return null;
        const rawChild = children[childIndex++];
        const element = rawChild;
        const content = React.cloneElement(element, {
          className: `${element.props.className || ""} h-full`
        });
        return /* @__PURE__ */ jsx3(
          "div",
          {
            className: "h-full",
            style: { gridColumn: `span ${span} / span ${span}` },
            children: content
          },
          colIdx
        );
      }) }, rowIdx))
    }
  );
};
var grid_layout_default = GridLayout;

// src/layouts/grid-layout/grid-item.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var getSizeClasses = (size) => {
  switch (size) {
    case "small":
      return "col-span-2 row-span-1 md:col-span-2 md:row-span-1";
    case "medium":
      return "col-span-3 row-span-3 md:col-span-3 md:row-span-3";
    case "large":
      return "col-span-4 row-span-3 md:col-span-4 md:row-span-3";
    case "extra-large":
      return "col-span-6 row-span-3 md:col-span-6 md:row-span-3";
    default:
      return "col-span-2 row-span-2 md:col-span-2 md:row-span-2";
  }
};
var processResponsiveSpan = (spanProp) => {
  if (!spanProp)
    return "";
  if (typeof spanProp === "string")
    return spanProp;
  return Object.entries(spanProp).map(([breakpoint, value]) => breakpoint === "base" ? value : `${breakpoint}:${value}`).join(" ");
};
var GridItem = ({
  children,
  size = "small",
  // Default to small
  colSpan,
  rowSpan,
  className
}) => {
  const effectiveSize = size || "small";
  const colSpanClasses = processResponsiveSpan(colSpan);
  const rowSpanClasses = processResponsiveSpan(rowSpan);
  let finalSpanClasses = "";
  if (colSpanClasses || rowSpanClasses) {
    finalSpanClasses = cn(colSpanClasses, rowSpanClasses);
  } else {
    finalSpanClasses = getSizeClasses(effectiveSize);
  }
  return /* @__PURE__ */ jsx4(
    "div",
    {
      className: cn(
        "rounded p-0",
        // 'border border-[var(--grid-item-border-color)]', // Border removed
        finalSpanClasses,
        // Apply explicit or size-based span classes
        className
      ),
      children
    }
  );
};
var grid_item_default = GridItem;
export {
  bento_layout_default as BentoLayout,
  grid_container_default as GridContainer,
  grid_item_default as GridItem,
  grid_layout_default as GridLayout,
  cn,
  formatDate,
  useBreakpoint
};
