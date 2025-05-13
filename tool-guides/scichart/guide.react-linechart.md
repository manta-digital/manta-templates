# SciChart React Implementation Guide

## Setting Up SciChart React in a Project

### Installation and Configuration

```bash
npm install scichart scichart-react
npm install copy-files-from-to --save-dev
```

For Next.js projects, add to package.json:

```json
"scripts": {
  "copyWasm": "copy-files-from-to --config copy-files-from-to.json",
  "dev": "npm run copyWasm && next dev",
  "build": "npm run copyWasm && next build",
  "start": "next start"
}
```

Create `copy-files-from-to.json`:

```json
{
  "copyFilesSettings": {
    "whenFileExists": "overwrite"
  },
  "copyFiles": [
    {
      "from": "./node_modules/scichart/_wasm/scichart2d.data",
      "to": "./public/scichart2d.data"
    }
  ]
}
```

Update Next.js config:

```js
// next.config.js
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    const destWasmFolder = 'static/chunks/pages';
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: 'node_modules/scichart/_wasm/scichart2d.wasm',
            to: destWasmFolder,
          },
        ],
      }),
    );

    return config;
  },
};
```

## Creating Charts with SciChart React

### Basic Chart Implementation

There are two main approaches to creating charts with SciChart React:

#### 1. Using the `initChart` function

```jsx
import React from 'react';
import { SciChartReact } from 'scichart-react';
import {
  SciChartSurface,
  NumericAxis,
  FastLineRenderableSeries,
  XyDataSeries,
} from 'scichart';

const initChart = async (rootElement) => {
  // Create the SciChartSurface
  const { sciChartSurface, wasmContext } =
    await SciChartSurface.create(rootElement);

  // Add X and Y axes
  sciChartSurface.xAxes.add(new NumericAxis(wasmContext));
  sciChartSurface.yAxes.add(new NumericAxis(wasmContext));

  // Add data and series
  const xValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const yValues = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

  // Create a line series
  const lineSeries = new FastLineRenderableSeries(wasmContext, {
    dataSeries: new XyDataSeries(wasmContext, { xValues, yValues }),
    strokeThickness: 3,
    stroke: 'steelblue',
  });

  sciChartSurface.renderableSeries.add(lineSeries);

  return { sciChartSurface };
};

function App() {
  return (
    <div className="App">
      <SciChartReact
        initChart={initChart}
        style={{ width: '800px', height: '600px' }}
      />
    </div>
  );
}

export default App;
```

#### 2. Using the JSON Builder API with `config` prop

```jsx
import React from 'react';
import { SciChartReact } from 'scichart-react';
import { ESeriesType, EAxisType, SciChartJsNavyTheme } from 'scichart';

function App() {
  const chartConfig = {
    surface: {
      theme: new SciChartJsNavyTheme(),
      title: 'Line Chart Example',
      titleStyle: { fontSize: 18 },
    },
    xAxes: [
      {
        type: EAxisType.NumericAxis,
        options: {
          axisTitle: 'X Axis',
          growBy: { min: 0.1, max: 0.1 },
        },
      },
    ],
    yAxes: [
      {
        type: EAxisType.NumericAxis,
        options: {
          axisTitle: 'Y Axis',
          growBy: { min: 0.1, max: 0.1 },
        },
      },
    ],
    series: [
      {
        type: ESeriesType.LineSeries,
        xyData: {
          xValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          yValues: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
        },
        options: {
          stroke: 'steelblue',
          strokeThickness: 3,
        },
      },
    ],
  };

  return (
    <div className="App">
      <SciChartReact
        config={chartConfig}
        style={{ width: '800px', height: '600px' }}
      />
    </div>
  );
}

export default App;
```

## Line Chart Implementation

### Available Line Chart Types

1. **FastLineRenderableSeries** - Basic line chart, most performant
2. **SplineLineRenderableSeries** - Smooth curves between data points
3. **DigitalLineRenderableSeries** - Step line chart (digital signal)

### Creating a Line Chart

#### Method 1: Using the JavaScript API

```jsx
// Inside initChart function
const lineSeries = new FastLineRenderableSeries(wasmContext, {
  dataSeries: new XyDataSeries(wasmContext, {
    xValues: [0, 1, 2, 3, 4, 5],
    yValues: [1, 4, 2, 6, 3, 8],
  }),
  stroke: '#ff6600', // Line color
  strokeThickness: 3, // Line thickness
  opacity: 0.8, // Transparency
  pointMarker: new EllipsePointMarker(wasmContext, {
    width: 7,
    height: 7,
    fill: 'white',
    stroke: '#ff6600',
  }),
});

sciChartSurface.renderableSeries.add(lineSeries);
```

#### Method 2: Using the JSON Builder API

```jsx
const chartConfig = {
  // ...other config
  series: [
    {
      type: ESeriesType.LineSeries, // Or SplineLineSeries for smooth curves
      xyData: {
        xValues: [0, 1, 2, 3, 4, 5],
        yValues: [1, 4, 2, 6, 3, 8],
      },
      options: {
        stroke: '#ff6600',
        strokeThickness: 3,
        opacity: 0.8,
        pointMarker: {
          type: EPointMarkerType.Ellipse,
          options: {
            width: 7,
            height: 7,
            fill: 'white',
            stroke: '#ff6600',
          },
        },
      },
    },
  ],
};
```

### Line Chart Styling Options

- **stroke**: Line color (CSS color, hex, rgba)
- **strokeThickness**: Line thickness in pixels
- **opacity**: Transparency (0-1)
- **strokeDashArray**: Array defining dash pattern [dash, gap]

### Adding Point Markers

```jsx
// Using JavaScript API
const pointMarker = new EllipsePointMarker(wasmContext, {
  width: 10,
  height: 10,
  fill: "white",
  stroke: "steelblue",
  strokeThickness: 2
});

// Using JSON Builder
pointMarker: {
  type: EPointMarkerType.Ellipse,  // Also: Triangle, Square, Cross, X
  options: {
    width: 10,
    height: 10,
    fill: "white",
    stroke: "steelblue",
    strokeThickness: 2
  }
}
```

### Adding Series Animation

```jsx
// Using JavaScript API
const lineSeries = new FastLineRenderableSeries(wasmContext, {
  // ...other options
  animation: new SweepAnimation({
    duration: 500,
    fadeEffect: true
  })
});

// Using JSON Builder
options: {
  // ...other options
  animation: {
    type: "Sweep",  // Also: "Wave", "Scale", "Fade"
    options: {
      duration: 500,
      fadeEffect: true
    }
  }
}
```
