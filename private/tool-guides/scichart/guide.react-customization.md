# SciChart React Advanced Features Guide

## Customizing Legends and Axes

### Legend Configuration

```jsx
// Using JavaScript API with LegendModifier
import { LegendModifier, ELegendOrientation, ELegendPlacement } from 'scichart';

// Inside initChart function
sciChartSurface.chartModifiers.add(
  new LegendModifier({
    showLegend: true,
    showSeriesMarkers: true,
    showCheckboxes: true,
    orientation: ELegendOrientation.Horizontal,
    placement: ELegendPlacement.Bottom,
    margins: { top: 10, right: 10, bottom: 10, left: 10 },
    fontFamily: 'Arial',
    fontSize: 12,
    backgroundColor: '#202020',
    color: 'white',
  }),
);

// Using JSON Builder API
modifiers: [
  {
    type: EChart2DModifierType.Legend,
    options: {
      showLegend: true,
      showSeriesMarkers: true,
      showCheckboxes: true,
      orientation: ELegendOrientation.Vertical,
      placement: ELegendPlacement.TopRight,
      margins: { top: 10, right: 10, bottom: 10, left: 10 },
      fontFamily: 'Arial',
      fontSize: 12,
      backgroundColor: '#202020',
      color: 'white',
    },
  },
];
```

### Legend Customization

```jsx
// Add a legend and subscribe to changes
const legendModifier = new LegendModifier();

// Add a callback when series visibility changes via legend
legendModifier.isCheckedChanged.subscribe((args) => {
  const { isChecked, series } = args;
  console.log(
    `Series ${series.dataSeries.dataSeriesName} visibility: ${isChecked}`,
  );

  // You can perform additional actions when visibility changes
});

sciChartSurface.chartModifiers.add(legendModifier);
```

### Axis Types and Configuration

SciChart supports several axis types:

1. **NumericAxis** - Standard number-based axis
2. **DateTimeNumericAxis** - For date/time values
3. **LogarithmicAxis** - Logarithmic scale axis
4. **CategoryAxis** - Discrete categories

```jsx
// Example configuring various axis types
// NumericAxis
const xAxis = new NumericAxis(wasmContext, {
  axisTitle: 'X Values',
  axisTitleStyle: { fontSize: 14, color: '#FFFFFF' },
  majorGridLineStyle: { strokeThickness: 0.5, stroke: '#444444' },
  minorGridLineStyle: { strokeThickness: 0.25, stroke: '#333333' },
  visibleRange: new NumberRange(0, 100),
  growBy: new NumberRange(0.1, 0.1), // Add 10% padding to min/max
  labelStyle: { fontSize: 12, color: '#EEEEEE' },
  drawMajorBands: true,
  majorBandBrush: '#30FFFFFF',
});

// DateTimeNumericAxis
const xDateAxis = new DateTimeNumericAxis(wasmContext, {
  axisTitle: 'Time',
  axisTitleStyle: { fontSize: 14 },
  labelStyle: { color: '#EEEEEE' },
  labelFormat: ENumericFormat.Decimal_2,
});

// LogarithmicAxis
const yLogAxis = new LogarithmicAxis(wasmContext, {
  axisTitle: 'Log Scale',
  logBase: 10, // Base 10 logarithm
  scientificNotation: true,
  drawMajorBands: true,
});

// CategoryAxis
const categoryAxis = new CategoryAxis(wasmContext, {
  axisTitle: 'Categories',
  labelProvider: new TextLabelProvider(['A', 'B', 'C', 'D']),
});
```

### Axis Styling

```jsx
// Common axis styling options
const xAxis = new NumericAxis(wasmContext, {
  // Title options
  axisTitle: 'X Axis',
  axisTitleStyle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },

  // Tick lines
  majorTickLineStyle: {
    tickSize: 5,
    stroke: '#FFFFFF',
    strokeThickness: 1,
  },
  minorTickLineStyle: {
    tickSize: 3,
    stroke: '#888888',
    strokeThickness: 0.5,
  },

  // Grid lines
  majorGridLineStyle: {
    stroke: '#444444',
    strokeThickness: 1,
    strokeDashArray: [5, 5], // Dashed line
  },
  minorGridLineStyle: {
    stroke: '#333333',
    strokeThickness: 0.5,
  },

  // Label styling
  labelStyle: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Arial',
  },

  // Background and bands
  axisBackgroundFill: '#333333',
  axisBorderLeft: 1,
  axisBorderRight: 1,
  axisBorderTop: 1,
  axisBorderBottom: 1,
  axisBorderColor: '#666666',
  drawMajorBands: true,
  majorBandBrush: '#15FFFFFF', // Semi-transparent white
});
```

### Axis Label Formatting

```jsx
// Using NumericLabelProvider for custom formatting
import { NumericLabelProvider, ENumericFormat } from 'scichart';

// Simple format using built-in numeric formats
const xAxis = new NumericAxis(wasmContext, {
  labelFormat: ENumericFormat.Decimal_2, // 2 decimal places
});

// Custom label provider for more control
const customLabelProvider = new NumericLabelProvider({
  labelPrecision: 2,
  formatLabel: (dataValue) => {
    return `$${dataValue.toFixed(2)}`;
  },
});

const yAxis = new NumericAxis(wasmContext, {
  labelProvider: customLabelProvider,
});

// Date formatting
const dateAxis = new DateTimeNumericAxis(wasmContext, {
  labelFormat: ENumericFormat.Date_DDMMYYYY, // Format as DD/MM/YYYY
});

// Custom date label provider
const dateLabelProvider = new DateTimeLabelProvider();
dateLabelProvider.formatLabel = (dataValue) => {
  const date = new Date(dataValue);
  return date.toLocaleTimeString(); // Custom time format
};

const timeAxis = new DateTimeNumericAxis(wasmContext, {
  labelProvider: dateLabelProvider,
});
```

## Configuring Zoom and Pan Modifiers

### ZoomPanModifier

```jsx
// Basic ZoomPanModifier
import { ZoomPanModifier, EXyDirection } from 'scichart';

const zoomPanModifier = new ZoomPanModifier({
  xyDirection: EXyDirection.XDirection, // X direction only (can be Y or XY)
  clipModeX: EClipMode.None,
  clipModeY: EClipMode.None,
  enableZoom: true, // Enable pinch zoom
  zoomExtentsY: true, // Auto-fit Y axis after zoom
  minZoomFactor: 0.5, // Minimum allowed zoom level (0.5 = 50%)
  maxZoomFactor: 20, // Maximum allowed zoom level (20 = 2000%)
  zoomFactor: 1.2, // Zoom factor per interaction
});

sciChartSurface.chartModifiers.add(zoomPanModifier);

// With JSON Builder API
modifiers: [
  {
    type: EChart2DModifierType.ZoomPan,
    options: {
      xyDirection: EXyDirection.XyDirection,
      enableZoom: true,
      zoomFactor: 1.2,
      zoomExtentsY: true,
    },
  },
];
```

### MouseWheelZoomModifier

```jsx
import { MouseWheelZoomModifier, EXyDirection } from 'scichart';

const mouseWheelZoomModifier = new MouseWheelZoomModifier({
  xyDirection: EXyDirection.XDirection, // X direction only
  growFactor: 0.05, // Zoom speed factor
  zoomExtentsY: true, // Auto-fit Y axis after zoom
  zoomExtents: false, // Don't auto-fit X axis
});

sciChartSurface.chartModifiers.add(mouseWheelZoomModifier);

// With JSON Builder API
modifiers: [
  {
    type: EChart2DModifierType.MouseWheelZoom,
    options: {
      xyDirection: EXyDirection.XyDirection,
      growFactor: 0.05,
      zoomExtentsY: true,
    },
  },
];
```

### ZoomExtentsModifier (Reset Zoom)

```jsx
import { ZoomExtentsModifier } from 'scichart';

const zoomExtentsModifier = new ZoomExtentsModifier({
  isAnimated: true, // Smooth animation when resetting
  animationDuration: 500, // Animation duration in ms
  xyDirection: EXyDirection.XyDirection, // Reset both X and Y
});

sciChartSurface.chartModifiers.add(zoomExtentsModifier);

// With JSON Builder API
modifiers: [
  {
    type: EChart2DModifierType.ZoomExtents,
    options: {
      isAnimated: true,
      animationDuration: 500,
    },
  },
];
```

### RubberBandXyZoomModifier

```jsx
import { RubberBandXyZoomModifier, EXyDirection } from 'scichart';

const rubberBandModifier = new RubberBandXyZoomModifier({
  xyDirection: EXyDirection.XyDirection, // Both X and Y
  fill: 'rgba(255,0,0,0.1)', // Selection area fill color
  stroke: 'rgba(255,0,0,0.5)', // Selection area border color
  strokeThickness: 1, // Border thickness
  isAnimated: true, // Animate zoom
  animationDuration: 300, // Animation duration in ms
});

sciChartSurface.chartModifiers.add(rubberBandModifier);
```

### Combining Multiple Zoom Modifiers

```jsx
// Common setup for multiple zoom modifiers
sciChartSurface.chartModifiers.add(
  new ZoomPanModifier({
    xyDirection: EXyDirection.XyDirection,
    enableZoom: true,
  }),
  new MouseWheelZoomModifier({
    xyDirection: EXyDirection.XyDirection,
    growFactor: 0.1,
  }),
  new ZoomExtentsModifier(),
  new RubberBandXyZoomModifier(),
);
```

## Adding Custom Shapes and Annotations

### Available Annotation Types

SciChart supports several annotation types:

1. **BoxAnnotation** - Rectangle area
2. **LineAnnotation** - Diagonal line
3. **HorizontalLineAnnotation** - Horizontal line
4. **VerticalLineAnnotation** - Vertical line
5. **TextAnnotation** - Text label
6. **CustomAnnotation** - SVG-based custom shape
7. **AxisMarkerAnnotation** - Marker on an axis

### Adding Annotations

```jsx
// Inside initChart function
import {
  BoxAnnotation,
  LineAnnotation,
  HorizontalLineAnnotation,
  VerticalLineAnnotation,
  TextAnnotation,
} from 'scichart';

// Add a box annotation
const boxAnnotation = new BoxAnnotation({
  x1: 1, // Start X coordinate (in data values)
  y1: 2, // Start Y coordinate
  x2: 3, // End X coordinate
  y2: 4, // End Y coordinate
  fill: 'rgba(255, 0, 0, 0.3)', // Fill color
  stroke: '#FF0000', // Border color
  strokeThickness: 2, // Border thickness
});

// Add a line annotation
const lineAnnotation = new LineAnnotation({
  x1: 0,
  y1: 0,
  x2: 5,
  y2: 5,
  stroke: '#00FF00',
  strokeThickness: 2,

  // Optional dash pattern
  strokeDashArray: [5, 5], // 5px dash, 5px gap
});

// Add a horizontal line annotation
const horizontalLine = new HorizontalLineAnnotation({
  y1: 3, // Y position
  xAxisId: 'xAxis', // ID of the X axis to attach to
  yAxisId: 'yAxis', // ID of the Y axis to attach to
  stroke: '#FFFF00',
  strokeThickness: 2,

  // Optional label
  showLabel: true,
  label: 'Threshold',
});

// Add a vertical line annotation
const verticalLine = new VerticalLineAnnotation({
  x1: 4, // X position
  stroke: '#00FFFF',
  strokeThickness: 2,

  // Optional label
  showLabel: true,
  label: 'Marker',
});

// Add a text annotation
const textAnnotation = new TextAnnotation({
  x1: 2,
  y1: 4,
  text: 'Important Point',
  fontFamily: 'Arial',
  fontSize: 14,
  color: '#FFFFFF',

  // Optional background
  background: '#333333',
  padding: { left: 5, top: 5, right: 5, bottom: 5 },
});

// Add annotations to the chart
sciChartSurface.annotations.add(
  boxAnnotation,
  lineAnnotation,
  horizontalLine,
  verticalLine,
  textAnnotation,
);
```

### Making Annotations Interactive

```jsx
// Make annotations draggable
const boxAnnotation = new BoxAnnotation({
  x1: 1,
  y1: 2,
  x2: 3,
  y2: 4,
  fill: 'rgba(255, 0, 0, 0.3)',
  stroke: '#FF0000',
  strokeThickness: 2,

  // Enable dragging
  isDraggable: true,

  // Optional: Restrict dragging to one direction
  dragDirectionX: true,
  dragDirectionY: true,
});

// Add isSelected property for selection styling
boxAnnotation.isSelected = false;

// Subscribe to drag events
boxAnnotation.dragStarted.subscribe((args) => {
  console.log('Drag started:', args);
});

boxAnnotation.dragDelta.subscribe((args) => {
  console.log('Dragging:', args);
});

boxAnnotation.dragEnded.subscribe((args) => {
  console.log('Drag ended:', args);
  console.log('New position:', {
    x1: boxAnnotation.x1,
    y1: boxAnnotation.y1,
    x2: boxAnnotation.x2,
    y2: boxAnnotation.y2,
  });
});

// AnnotationHoverModifier for hover effects and selection
import { AnnotationHoverModifier } from 'scichart';

const hoverModifier = new AnnotationHoverModifier();
sciChartSurface.chartModifiers.add(hoverModifier);
```

### Creating Custom Annotations

```jsx
// Create a custom annotation using SVG
import { CustomAnnotation } from 'scichart';

const svgString = `
<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
  <circle cx="25" cy="25" r="20" fill="red" stroke="white" stroke-width="2" />
  <text x="25" y="30" text-anchor="middle" fill="white" font-family="Arial" font-size="16">!</text>
</svg>
`;

const customAnnotation = new CustomAnnotation({
  x1: 5,
  y1: 5,
  svgString: svgString,

  // Optional: Set size explicitly (otherwise uses SVG dimensions)
  width: 50,
  height: 50,
});

sciChartSurface.annotations.add(customAnnotation);
```

### Using Annotations with JSON Builder

```jsx
// Using JSON Builder API
annotations: [
  {
    type: EAnnotationType.BoxAnnotation,
    options: {
      x1: 1,
      y1: 2,
      x2: 3,
      y2: 4,
      fill: 'rgba(255, 0, 0, 0.3)',
      stroke: '#FF0000',
      strokeThickness: 2,
    },
  },
  {
    type: EAnnotationType.LineAnnotation,
    options: {
      x1: 0,
      y1: 0,
      x2: 5,
      y2: 5,
      stroke: '#00FF00',
      strokeThickness: 2,
    },
  },
  {
    type: EAnnotationType.HorizontalLineAnnotation,
    options: {
      y1: 3,
      stroke: '#FFFF00',
      strokeThickness: 2,
      showLabel: true,
      label: 'Threshold',
    },
  },
  {
    type: EAnnotationType.TextAnnotation,
    options: {
      x1: 2,
      y1: 4,
      text: 'Important Point',
      fontSize: 14,
      color: '#FFFFFF',
    },
  },
];
```
