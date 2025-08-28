'use client';

import React from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint';

/**
 * GridLayout component for data-driven bento layouts.
 * @param {object} props.gridData - Grid definition object (see feature.grid-as-data.md)
 * @param {React.ReactElement<any>[]} props.children - Content to render in grid order
 * @param {string} [props.className] - Optional extra classes for the grid container
 * @param {string} [props.gap] - Optional CSS gap value (e.g., '1rem', '1.5rem')
 * @param {string} [props.minRowHeight] - Optional CSS minimum row height (e.g., '150px')
 */
export type GridData = {
  [breakpoint: string]: number[][];
};

interface GridLayoutProps {
  gridData: GridData;
  children: React.JSX.Element[];
  className?: string;
  /** CSS gap value e.g. '1rem' or '0.5rem'. Optional, omit to use CSS classes for gap. */
  gap?: string;
  /** CSS grid-auto-rows value e.g. '150px' */
  minRowHeight?: string;
}

const DEFAULT_TOTAL_COLS = 6;

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
export const GridLayout: React.FC<GridLayoutProps> = ({ gridData, children, className = '', gap, minRowHeight }) => {
  const breakpoint = useBreakpoint();
  
  // Determine layout by falling back through breakpoints to the nearest defined gridData key
  const breakpoints = ['default','sm','md','lg','xl','2xl'] as const;
  const idx = breakpoints.indexOf(breakpoint as typeof breakpoints[number]);
  const searchKeys = breakpoints.slice(0, idx + 1).reverse();
  let layout = gridData['default'] || [];
  for (const key of searchKeys) {
    if (gridData[key]) {
      layout = gridData[key];
      break;
    }
  }
  const totalCols = layout[0]?.reduce((a, b) => a + b, 0) || DEFAULT_TOTAL_COLS;

  let childIndex = 0;

  // Build inline styles only for provided values
  const styles: React.CSSProperties = {
    gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))`,
    ...(gap ? { columnGap: gap, rowGap: gap } : {}),
    ...(minRowHeight ? { gridAutoRows: minRowHeight } : {}),
  };

  return (
    <div className={`grid ${className}`} style={styles}>
      {layout.map((row, rowIdx) => (
        <React.Fragment key={rowIdx}>
          {row.map((span, colIdx) => {
            if (childIndex >= children.length) return null;
            const rawChild = children[childIndex++];
            const element = rawChild as React.ReactElement<React.HTMLAttributes<HTMLDivElement>>;
            const content = React.cloneElement<React.HTMLAttributes<HTMLDivElement>>(element, {
              className: `${element.props.className || ''} h-full`,
            });
            return (
              <div
                key={colIdx}
                className="h-full"
                style={{ gridColumn: `span ${span} / span ${span}` }}
              >
                {content}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default GridLayout;
