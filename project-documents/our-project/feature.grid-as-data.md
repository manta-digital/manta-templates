# Feature: Grid as Data

###### Advanced Layout – Data-Driven Responsive Grid Abstraction

## Overview

This project introduces a "grid as data" abstraction for advanced, bento-style layouts. Layouts are specified as JavaScript objects, mapping Tailwind breakpoints (e.g., `default`, `md`, `lg`) to arrays of rows, where each row is an array of column spans.

## Motivation
- **Declarative layouts:** Define complex, responsive grids in a single data structure.
- **Rapid prototyping:** Change layouts by editing data, not code.
- **Visual tooling:** Enables future visual grid editors.
- **No ready-made alternative:** No known package offers this abstraction for React/Tailwind.

## Structure

```js
const gridData = {
  default: [
    [6],         // 1 item, spans all 6 columns
    [1, 4, 1],   // 3 items: 1 col, 4 cols, 1 col
    [3, 3],      // 2 items: 3 cols each
    [6]          // 1 item, spans all 6 columns
  ],
  md: [
    [3, 3],
    [2, 2, 2],
    [6]
  ],
  lg: [
    [2, 2, 2],
    [1, 1, 1, 1, 1, 1]
  ]
};
```

- **default:** Used for base/mobile.
- **md, lg:** Used for Tailwind's `md:` and `lg:` breakpoints.
- Each row's array must sum to the total number of columns for that breakpoint (e.g., 6).
- Add as many breakpoints as needed (e.g., `sm`, `xl`).

## Usage

1. **Define your grid layout** using the above structure.
2. **Pass `gridData` to your GridLayout component.**
3. **GridLayout** selects the correct layout for the current breakpoint and renders children accordingly.

## Example

```js
<GridLayout gridData={gridData}>
  {/* Render your cards or content here */}
</GridLayout>
```

## Extensibility
- Designed for future visual grid designer tools.
- Can be extended to support additional properties (e.g., row/col gaps, alignment).

## Status
- This is a custom, open-source solution developed for this project.
- No known ready-made package provides this abstraction.

---

*For schema updates and integration with project guides, see main documentation tree.*
