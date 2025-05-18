import React from 'react';

/**
 * Props for the GridContainer component.
 */
interface GridContainerProps {
    /** The content of the grid, typically GridItem components. */
    children: React.ReactNode;
    /**
     * Defines the height of implicitly created grid rows.
     * Accepts any valid CSS value for 'grid-auto-rows'.
     * @default 'auto'
     */
    rowHeight?: string;
    /** Optional Tailwind spacing unit for the gap between grid items (e.g., 4 for gap-4). */
    gap?: number | string;
    /** Optional Tailwind class string for grid columns (e.g., 'grid-cols-6'). */
    columns?: string;
    /** Optional additional CSS classes to apply to the container. */
    className?: string;
}
declare const GridContainer: React.FC<GridContainerProps>;

interface BentoLayoutProps extends Omit<GridContainerProps, 'children'> {
    children: React.ReactNode;
    className?: string;
    autoFlow?: 'row' | 'column';
}
/**
 * A layout component that arranges children (expected to be GridItems)
 * in a responsive bento-style grid using GridContainer.
 */
/**
 * BentoLayout: Flexible, item-driven grid container.
 *
 * Builds on GridContainer to allow each child (e.g., cards) to control its own placement and span
 * using Tailwind utility classes (e.g., col-span-*, row-span-*).
 * Use BentoLayout when your items need to directly influence the grid structure.
 * GridLayout, in contrast, follows a strict grid pattern defined by data arrays, placing
 * children into the next available slots in order.
 *
 * @param {BentoLayoutProps} props - Configuration props for the layout.
 * @param {React.ReactNode} props.children - Elements to render in the grid; expected to be GridItems.
 * @param {string} [props.className] - Additional CSS classes for the container.
 * @param {string} [props.rowHeight] - CSS value for grid-auto-rows, e.g., 'minmax(6rem, auto)'.
 * @param {number|string} [props.gap] - Gap between items; number for Tailwind gap-{n} or CSS value string.
 * @param {string} [props.columns] - Tailwind grid-cols classes to set column count or pattern.
 * @param {'row'|'column'} [props.autoFlow] - Controls grid-auto-flow direction; 'row' (default) or 'column'.
 */
declare const BentoLayout: React.FC<BentoLayoutProps>;

/**
 * GridLayout component for data-driven bento layouts.
 * @param {object} props.gridData - Grid definition object (see feature.grid-as-data.md)
 * @param {React.ReactElement<any>[]} props.children - Content to render in grid order
 * @param {string} [props.className] - Optional extra classes for the grid container
 * @param {string} [props.gap] - Optional CSS gap value (e.g., '1rem', '1.5rem')
 * @param {string} [props.minRowHeight] - Optional CSS minimum row height (e.g., '150px')
 */
type GridData = {
    [breakpoint: string]: number[][];
};
interface GridLayoutProps {
    gridData: GridData;
    children: React.JSX.Element[];
    className?: string;
    gap?: string;
    minRowHeight?: string;
}
/**
 * GridLayout: Data-driven grid container.
 *
 * Uses `gridData` mappings of breakpoints to arrays of column spans to define the grid structure.
 * Automatically places children (e.g., cards) into the next available slots in order.
 * Use GridLayout when you require a container that follows a strict, predetermined grid pattern.
 * BentoLayout, in contrast, allows individual items to influence their own placement and span.
 *
 * @param {GridData} props.gridData - Breakpoint-to-structure mapping for grid configuration.
 * @param {React.JSX.Element[]} props.children - Elements to render in grid order.
 * @param {string} [props.className] - Optional CSS classes for the grid container.
 * @param {string} [props.gap] - Optional CSS gap value (e.g., '1rem').
 * @param {string} [props.minRowHeight] - Optional CSS minimum row height (e.g., '150px').
 */
declare const GridLayout: React.FC<GridLayoutProps>;

/**
 * GridItem provides a flexible, responsive cell for grid layouts using Tailwind CSS.
 *
 * - Use the `size` prop for standard layouts (small, medium, large, extra-large).
 * - Override with `colSpan`/`rowSpan` for custom or responsive spans.
 * - Responsive props can be a string or an object mapping breakpoints to Tailwind classes.
 *
 * This pattern ensures both ease of use for common cases and full control when needed.
 */
type GridItemSize = 'small' | 'medium' | 'large' | 'extra-large';
/**
 * Represents a responsive span value, which can be a single Tailwind class string
 * or an object mapping breakpoint prefixes (e.g., 'base', 'sm', 'md') to Tailwind class strings.
 */
type ResponsiveSpanValue = string | Record<string, string>;
/**
 * Props for the GridItem component.
 */
interface GridItemProps {
    /** The content to render inside the grid item. */
    children: React.ReactNode;
    /**
     * The predefined size variant of the grid item. Used if colSpan/rowSpan are not provided.
     * @default 'small'
     */
    size?: GridItemSize;
    /**
     * Custom column span. Can be a Tailwind class string (e.g., 'col-span-2')
     * or an object for responsive values (e.g., { base: 'col-span-full', md: 'col-span-3' }).
     * If provided, overrides column span from 'size' prop.
     */
    colSpan?: ResponsiveSpanValue;
    /**
     * Custom row span. Can be a Tailwind class string (e.g., 'row-span-2')
     * or an object for responsive values (e.g., { base: 'row-span-1', md: 'row-span-auto' }).
     * If provided, overrides row span from 'size' prop.
     */
    rowSpan?: ResponsiveSpanValue;
    /** Optional additional CSS classes to apply to the grid item container. */
    className?: string;
}
/**
 * Renders a grid item with appropriate Tailwind span classes.
 * - If `colSpan` or `rowSpan` are provided, they take precedence.
 * - Otherwise, falls back to the span classes for the given `size`.
 *
 * This ensures both quick usage for common patterns and flexibility for advanced layouts.
 */
declare const GridItem: React.FC<GridItemProps>;

/**
 * React hook to get the current Tailwind breakpoint name (or 'default' for mobile)
 * Uses breakpoints defined in src/styles/breakpoints.js
 */
declare function useBreakpoint(): string;

declare function cn(...inputs: any[]): string;
/**
 * Formats a date to a locale string.
 */
declare function formatDate(date: string | Date, locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;

export { BentoLayout, GridContainer, GridItem, GridLayout, cn, formatDate, useBreakpoint };
