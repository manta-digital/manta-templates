"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BentoLayout: () => bento_layout_default,
  GridContainer: () => grid_container_default,
  GridItem: () => grid_item_default,
  GridLayout: () => grid_layout_default,
  cn: () => cn,
  formatDate: () => formatDate,
  useBreakpoint: () => useBreakpoint
});
module.exports = __toCommonJS(src_exports);

// src/lib/utils.ts
var import_clsx = __toESM(require("clsx"), 1);
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.default)(inputs));
}
function formatDate(date, locales, options) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locales, options);
}

// src/layouts/grid-layout/grid-container.tsx
var import_jsx_runtime = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_jsx_runtime2 = require("react/jsx-runtime");
var BentoLayout = ({
  children,
  className,
  rowHeight = "minmax(6rem, auto)",
  gap = 4,
  columns = "grid-cols-6",
  autoFlow = "row"
  // Default to row
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var import_react2 = __toESM(require("react"), 1);

// src/hooks/useBreakpoint.ts
var import_react = require("react");

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
  const [breakpoint, setBreakpoint] = (0, import_react.useState)("default");
  (0, import_react.useEffect)(() => {
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
var import_jsx_runtime3 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "div",
    {
      className: `grid ${className || ""}`,
      style: {
        gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))`,
        gap,
        ...minRowHeight && { gridAutoRows: minRowHeight }
      },
      children: layout.map((row, rowIdx) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react2.default.Fragment, { children: row.map((span, colIdx) => {
        if (childIndex >= children.length)
          return null;
        const rawChild = children[childIndex++];
        const element = rawChild;
        const content = import_react2.default.cloneElement(element, {
          className: `${element.props.className || ""} h-full`
        });
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var import_jsx_runtime4 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BentoLayout,
  GridContainer,
  GridItem,
  GridLayout,
  cn,
  formatDate,
  useBreakpoint
});
