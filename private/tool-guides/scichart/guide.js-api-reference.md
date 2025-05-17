# SciChart.js API Reference Guide

## Introduction and Navigation

This reference guide provides a structured overview of the SciChart.js API (v3.5.727) with particular attention to elements that may be useful when programmatically working with or generating code for SciChart implementations.

### API Structure Overview

The SciChart.js API is organized into the following key areas:

1. **Core Components**

   - `SciChartSurface` - The central chart container
   - `SciChart3DSurface` - 3D charting container
   - `SciChartPieSurface` - Specialized container for pie/donut charts

2. **Data Representation**

   - Various `DataSeries` types (XY, XYY, XYZ, OHLC, etc.)
   - `RenderableSeries` classes for visualizing data

3. **Chart Elements**

   - Axis types
   - Annotations
   - Legends

4. **Interactivity**

   - ChartModifiers for zoom, pan, selection
   - Events and handlers

5. **Styling and Theming**
   - ThemeManager
   - Styling interfaces

## 1. Core Surface Types

### SciChartSurface

The primary class for 2D charting:

```javascript
const { sciChartSurface, wasmContext } = await SciChartSurface.create(
  rootElement,
  {
    theme: new SciChartJsNavyTheme(),
    title: 'Chart Title',
  },
);
```

Key properties:

- `xAxes` - Collection of X-axis instances
- `yAxes` - Collection of Y-axis instances
- `renderableSeries` - Collection of series to be rendered
- `chartModifiers` - Collection of interaction behaviors
- `annotations` - Collection of annotations

Methods:

- `zoomExtents()` - Fit all data in view
- `suspendUpdates()` & `resumeUpdates()` - Batch rendering operations
- `delete()` - Cleanup resources

### SciChart3DSurface

For 3D visualizations with similar structure to SciChartSurface but with 3D-specific properties and behaviors.

### SciChartPieSurface

For pie and donut charts, with specialized API for segments and radial layouts.

## 2. Axis System

### Common Axis Types

| Axis Type             | Description                   | Key Properties                  |
| --------------------- | ----------------------------- | ------------------------------- |
| `NumericAxis`         | Standard linear numeric scale | `visibleRange`, `growBy`        |
| `LogarithmicAxis`     | Logarithmic scale             | `logBase`, `scientificNotation` |
| `DateTimeNumericAxis` | For time-based data           | `labelFormat`                   |
| `CategoryAxis`        | Discrete categories           | `labels`                        |

Example:

```javascript
const xAxis = new NumericAxis(wasmContext, {
  axisTitle: 'X Values',
  growBy: new NumberRange(0.1, 0.1),
  visibleRange: new NumberRange(0, 100),
});
sciChartSurface.xAxes.add(xAxis);
```

### Axis Styling

All axis types support:

- `axisTitle` and `axisTitleStyle`
- `labelStyle` for tick labels
- `majorGridLineStyle` and `minorGridLineStyle`
- `majorTickLineStyle` and `minorTickLineStyle`

## 3. Chart Series Types

The following table lists the primary series types with their data requirements:

| Series Type                       | Data Type                | Description       | Specific Properties         |
| --------------------------------- | ------------------------ | ----------------- | --------------------------- |
| `FastLineRenderableSeries`        | XyDataSeries             | Basic line chart  | `stroke`, `strokeThickness` |
| `SplineLineRenderableSeries`      | XyDataSeries             | Smooth curves     | Same as line + smoothness   |
| `FastMountainRenderableSeries`    | XyDataSeries             | Area chart        | `fill`, `stroke`            |
| `FastColumnRenderableSeries`      | XyDataSeries             | Bar/column chart  | `fill`, `dataPointWidth`    |
| `FastCandlestickRenderableSeries` | OhlcDataSeries           | Candlestick chart | `brushUp`, `brushDown`      |
| `FastOhlcRenderableSeries`        | OhlcDataSeries           | OHLC chart        | `strokeUp`, `strokeDown`    |
| `FastBubbleRenderableSeries`      | XyzDataSeries            | Bubble chart      | `fill`, `stroke`            |
| `FastBandRenderableSeries`        | XyyDataSeries            | Band/range chart  | `fill`, `stroke`            |
| `UniformHeatmapRenderableSeries`  | UniformHeatmapDataSeries | Heatmap           | `colorMap`                  |
| `FastErrorBarsRenderableSeries`   | HlcDataSeries            | Error bars        | `stroke`, `errorDirection`  |

## 4. Data Series

DataSeries objects hold the actual data to be visualized and are passed to RenderableSeries. Key types:

### XyDataSeries

For simple X,Y data:

```javascript
const dataSeries = new XyDataSeries(wasmContext, {
  xValues: [0, 1, 2, 3, 4],
  yValues: [1, 3, 2, 4, 3],
  dataSeriesName: 'Line Data',
});
```

### OhlcDataSeries

For financial charts:

```javascript
const ohlcSeries = new OhlcDataSeries(wasmContext, {
  xValues: dates,
  openValues: opens,
  highValues: highs,
  lowValues: lows,
  closeValues: closes,
});
```

### Data Series Operations

Common methods:

- `append(x, y)` - Add a single point
- `appendRange(xValues, yValues)` - Add multiple points
- `update(index, newX, newY)` - Update a specific point
- `updateRange(indices, xValues, yValues)` - Update multiple points
- `remove(index)` - Remove a point
- `clear()` - Remove all points

For fifo (scrolling) charts:

```javascript
// Create a series with a maximum of 1000 points that automatically
// removes oldest points when capacity is reached
const fifoSeries = new XyDataSeries(wasmContext, {
  fifoCapacity: 1000,
});
```

## 5. Chart Modifiers (Interactivity)

| Modifier                   | Purpose                                   | Key Properties                  |
| -------------------------- | ----------------------------------------- | ------------------------------- |
| `ZoomPanModifier`          | Pan chart with mouse, pinch-zoom on touch | `xyDirection`, `clipModeX/Y`    |
| `MouseWheelZoomModifier`   | Zoom with scroll wheel                    | `growFactor`                    |
| `ZoomExtentsModifier`      | Reset to show all data                    | `isAnimated`                    |
| `RubberBandXyZoomModifier` | Drag to zoom area                         | `fill`, `stroke`                |
| `CursorModifier`           | Crosshair with tooltips                   | `showTooltip`, `showAxisLabels` |
| `RolloverModifier`         | Tooltips on hover                         | `showTooltip`, `showAxisLabels` |
| `LegendModifier`           | Display legend                            | `placement`, `orientation`      |

Example:

```javascript
sciChartSurface.chartModifiers.add(
  new ZoomPanModifier(),
  new MouseWheelZoomModifier(),
  new ZoomExtentsModifier(),
);
```

## 6. Annotations

Create visual overlays on the chart:

```javascript
// Draw a horizontal line at y=50
const line = new HorizontalLineAnnotation({
  y1: 50,
  stroke: 'red',
  strokeThickness: 2,
  showLabel: true,
  label: 'Threshold',
});

sciChartSurface.annotations.add(line);
```

Key annotation types:

- `BoxAnnotation` - Rectangle
- `LineAnnotation` - Diagonal line
- `HorizontalLineAnnotation` - Horizontal line
- `VerticalLineAnnotation` - Vertical line
- `TextAnnotation` - Text label
- `CustomAnnotation` - Custom SVG

## 7. Key Enumerations

SciChart.js uses enumerations extensively for configuration. Here are the most commonly used:

| Enum                   | Description          | Common Values                                                             |
| ---------------------- | -------------------- | ------------------------------------------------------------------------- |
| `EAxisType`            | Type of axis         | `NumericAxis`, `DateTimeNumericAxis`, `CategoryAxis`, `LogarithmicAxis`   |
| `ESeriesType`          | Type of chart series | `LineSeries`, `MountainSeries`, `ColumnSeries`, `CandlestickSeries`, etc. |
| `EChart2DModifierType` | Interactivity types  | `ZoomPan`, `MouseWheelZoom`, `Cursor`, `Rollover`, etc.                   |
| `EAxisAlignment`       | Axis position        | `Left`, `Right`, `Top`, `Bottom`                                          |
| `ELegendPlacement`     | Legend location      | `TopRight`, `TopLeft`, `BottomRight`, `BottomLeft`, etc.                  |
| `EAutoRange`           | Axis auto-fitting    | `Once`, `Always`, `Never`                                                 |
| `EPointMarkerType`     | Point marker shape   | `Ellipse`, `Square`, `Triangle`, `Cross`, etc.                            |

## 8. JSON Builder API

SciChart.js provides a JSON-based builder API for declarative chart creation:

```javascript
import { chartBuilder, ESeriesType, EAxisType } from 'scichart';

const { sciChartSurface } = await chartBuilder.build2DChart('divElementId', {
  surface: {
    theme: { type: 'SciChartJsDarkv2Theme' },
  },
  xAxes: [
    {
      type: EAxisType.NumericAxis,
      options: { axisTitle: 'X Axis' },
    },
  ],
  yAxes: [
    {
      type: EAxisType.NumericAxis,
      options: { axisTitle: 'Y Axis' },
    },
  ],
  series: [
    {
      type: ESeriesType.LineSeries,
      xyData: {
        xValues: [0, 1, 2, 3],
        yValues: [0, 1, 0, 2],
      },
      options: {
        stroke: 'red',
        strokeThickness: 2,
      },
    },
  ],
  modifiers: [
    { type: 'ZoomPan' },
    { type: 'MouseWheelZoom' },
    { type: 'ZoomExtents' },
  ],
});
```

## 9. Animation System

SciChart supports series animations:

```javascript
// Apply a sweep animation when the series first appears
const lineSeries = new FastLineRenderableSeries(wasmContext, {
  dataSeries: xyDataSeries,
  animation: new SweepAnimation({
    duration: 500,
    fadeEffect: true,
  }),
});
```

Animation types:

- `SweepAnimation` - Draws series from left to right
- `WaveAnimation` - Animates series with a wave effect
- `FadeAnimation` - Fades series in
- `ScaleAnimation` - Scales series from axis

## 10. Events and Callbacks

Many components support event subscription:

```javascript
// Subscribe to zoom events
xAxis.visibleRangeChanged.subscribe((args) => {
  console.log('Visible range changed:', args.visibleRange);
});

// Subscribe to series selection
lineSeries.selected.subscribe((args) => {
  console.log('Series selected:', args.isSelected);
});
```

## API Navigation Index

This table provides lookup indices for quickly finding API elements:

| Category       | Key Classes                                                             | Documentation Section    |
| -------------- | ----------------------------------------------------------------------- | ------------------------ |
| Chart Surfaces | `SciChartSurface`, `SciChart3DSurface`, `SciChartPieSurface`            | 1. Core Surface Types    |
| Axes           | `NumericAxis`, `DateTimeNumericAxis`, `LogarithmicAxis`, `CategoryAxis` | 2. Axis System           |
| Chart Types    | `FastLineRenderableSeries`, `FastMountainRenderableSeries`, etc.        | 3. Chart Series Types    |
| Data           | `XyDataSeries`, `OhlcDataSeries`, etc.                                  | 4. Data Series           |
| Interaction    | `ZoomPanModifier`, `CursorModifier`, etc.                               | 5. Chart Modifiers       |
| Annotations    | `LineAnnotation`, `BoxAnnotation`, etc.                                 | 6. Annotations           |
| Enums          | `ESeriesType`, `EAxisType`, etc.                                        | 7. Key Enumerations      |
| Builder API    | `chartBuilder`                                                          | 8. JSON Builder API      |
| Animations     | `SweepAnimation`, etc.                                                  | 9. Animation System      |
| Events         | `.subscribe()` methods                                                  | 10. Events and Callbacks |

## LLM Assistance Tags

When working with SciChart.js in an AI context, consider the following patterns:

### Pattern: Chart Creation

```javascript
// #PATTERN: Basic chart creation with X/Y axes
const { sciChartSurface, wasmContext } =
  await SciChartSurface.create(containerElement);
sciChartSurface.xAxes.add(new NumericAxis(wasmContext));
sciChartSurface.yAxes.add(new NumericAxis(wasmContext));
```

### Pattern: Adding Series with Data

```javascript
// #PATTERN: Create and add a series with data
const dataSeries = new XyDataSeries(wasmContext, {
  xValues,
  yValues,
  dataSeriesName: 'Series Name',
});
const series = new FastLineRenderableSeries(wasmContext, {
  dataSeries: dataSeries,
  stroke: '#FF6600',
  strokeThickness: 2,
});
sciChartSurface.renderableSeries.add(series);
```

### Pattern: Interactive Features

```javascript
// #PATTERN: Add standard interaction features
sciChartSurface.chartModifiers.add(
  new ZoomPanModifier(),
  new MouseWheelZoomModifier(),
  new ZoomExtentsModifier(),
  new LegendModifier(),
);
```

### Pattern: Real-time Updates

```javascript
// #PATTERN: Update data in real-time
function updateData() {
  const nextX = getNextX();
  const nextY = getNextY();
  dataSeries.append(nextX, nextY);

  // Optional auto-scroll if viewing latest data
  sciChartSurface.zoomExtents();
}
```

These patterns can be used as anchors when generating SciChart.js code or explaining functionality.
