## React-Idiomatic Patterns for SciChart Axis Configuration

## Overview

Provides information on how to use React hooks to configure SciChart axes in a React application.

## Introduction

SciChart for React is designed to be flexible, but its underlying architecture is imperative and not fully declarative like typical React components. This means that while you can use React patterns, you must respect SciChart’s lifecycle requirements—especially for axis configuration.

### Recommended React Patterns

**1. The `initChart` Pattern (Most Idiomatic for SciChart)**

- Use the `<SciChartReact />` component (from `scichart-react`) and supply an `initChart` function as a prop.
- This function should synchronously create and configure all axes before adding them to the chart surface.
- This pattern is React-idiomatic because:
  - It keeps chart instantiation and configuration in one place.
  - It allows you to pass configuration and theming as props.
  - It supports multiple chart instances and clean unmounting.

**Example:**

```typescript
const initChart = async (rootElement) => {
  const { sciChartSurface, wasmContext } = await SciChartSurface.create(rootElement, { /* theme, etc. */ });
  const xAxis = new NumericAxis(wasmContext, { axisTitle: "X Axis" });
  const yAxis = new NumericAxis(wasmContext, { axisTitle: "Y Axis" });
  sciChartSurface.xAxes.add(xAxis);
  sciChartSurface.yAxes.add(yAxis);
  // Add series, modifiers, etc.
  return { sciChartSurface };
};

// Usage in React:
<SciChartReact initChart={initChart} style={{ width: 800, height: 600 }} />
```

This approach is highlighted in SciChart's own documentation as the preferred way to create reusable, modular chart components in React[2][3][4].

**2. Declarative `config` Object Pattern**

- SciChart also supports a `config` prop (a JSON object) for `<SciChartReact />` that describes axes, series, and modifiers declaratively.
- This is the most "React-like" approach and is suitable for static or lightly dynamic charts.
- For more advanced scenarios, combine with an `onInit` callback for post-hydration customization[3].

**3. Synchronous Configuration Functions**

- If you need modularity, write synchronous configuration functions or hooks that _return_ configuration functions.
- Call these functions immediately after axis creation, inside your `initChart` function, not in a React effect or after render.
- This keeps your configuration logic reusable and composable without violating SciChart’s lifecycle needs.

**Example:**

```typescript
function configureAxes(xAxis, yAxis, settings) {
  // ...apply settings
}

// In initChart:
const xAxis = new NumericAxis(wasmContext, { ... });
const yAxis = new NumericAxis(wasmContext, { ... });
configureAxes(xAxis, yAxis, chartSettings);
```

## Best Practices for Using Hooks with SciChart

- **Never use `useEffect` or any async React hook to configure axes after chart creation.** This will be too late, as axes must be configured _before_ being added to the surface and before series/modifiers are attached[2].
- **If you want to use hooks for modularity, use them to return configuration functions or objects, and call/apply them synchronously during chart initialization.**
- **Use refs only for storing chart instances, not for managing axis configuration timing.**
- **Always clean up chart surfaces on unmount to avoid memory leaks.** Use the cleanup function in `useEffect` as shown in SciChart's documentation[2].

## Summary Table

| Pattern                     | React-idiomatic? | SciChart-safe? | Supports Modularity? | Notes                                                     |
| --------------------------- | ---------------- | -------------- | -------------------- | --------------------------------------------------------- |
| `initChart` function prop   | Yes              | Yes            | Yes                  | Most flexible and recommended for complex charts[2][3][4] |
| Declarative `config` object | Yes              | Yes            | Limited              | Best for static/simple charts[3]                          |
| `useEffect` for config      | No               | No             | No                   | Causes timing issues, not recommended                     |
| Synchronous config function | Somewhat         | Yes            | Yes                  | Use inside `initChart` for modular logic                  |
| Hook returning function     | Yes              | Yes            | Yes                  | Call returned function synchronously in `initChart`       |

## Key Takeaways

- **The most React-idiomatic and safe pattern for SciChart is to use the `initChart` function prop with synchronous axis configuration.**
- **Hooks can be used for modularity, but only if they return configuration functions that are called synchronously during chart initialization.**
- **Do not use `useEffect` or similar hooks for axis configuration, as this breaks SciChart’s lifecycle.**
- **Use the `config` object for declarative, static chart setups.**

For further reference and examples, see SciChart’s official documentation on reusable React components and chart configuration[2][3][4].

Sources
[1] React Chart Axis Layout Options - SciChart.js Demo https://demo.scichart.com/react/chart-axis-layout-options
[2] Creating a SciChart React Component from the Ground Up https://www.scichart.com/documentation/js/current/TutorialReusableReactComponent.html
[3] Tutorial 01 - Setting up a project with scichart-react and config object https://www.scichart.com/documentation/js/current/TutorialSetupProjectWithSciChartReact.html
[4] Tutorial 02 - Creating a Chart with scichart-react https://www.scichart.com/documentation/js/current/Tutorial02CreatingChartsWithInitChart.html
[5] Axis API in React Chart API component - Syncfusion https://ej2.syncfusion.com/react/documentation/api/chart/axis/index
[6] React Charts with SciChart.js: Introducing “SciChart React” https://www.scichart.com/blog/react-charts-with-scichart-js/
[7] ashusharmatech/scichart-react-demo - GitHub https://github.com/ashusharmatech/scichart-react-demo
[8] What is React Strict Mode and why is my App Double Re-rendering? https://www.scichart.com/blog/what-is-react-strict-mode-and-why-is-my-application-double-re-rendering/
[9] React Chart with Static X Axis | SciChart.js Demo https://demo.scichart.com/react/static-x-axis
[10] How to Manage State and Data Fetching in React - LinkedIn https://www.linkedin.com/posts/shubham-singh-1471001a8_built-in-react-hooks-react-activity-7197339321446584320-bfz-
[11] GitHub - ABTSoftware/scichart-react https://github.com/ABTSoftware/scichart-react
[12] React hooks best practice? : r/react - Reddit https://www.reddit.com/r/react/comments/1fy8ddq/react_hooks_best_practice/
[13] Displaying Volume profile on a javascript chart - Stack Overflow https://stackoverflow.com/questions/36459542/displaying-volume-profile-on-a-javascript-chart
[14] React Charts and Graphs Library | 100X Performance - SciChart https://www.scichart.com/react-charts/
[15] top5relatedtags - Stack Exchange Data Explorer https://data.stackexchange.com/mathematica/revision/810898/1001314/top5relatedtags
[16] Best Practices With React Hooks - Smashing Magazine https://www.smashingmagazine.com/2020/04/react-hooks-best-practices/
[17] SciChartSurface | API Documentation for SciChart.js - v3.5.727 https://www.scichart.com/documentation/js/current/typedoc/classes/scichartsurface.html
[18] React Chart Data Point Selection | SciChart.js Demo https://demo.scichart.com/react/datapoint-selection
