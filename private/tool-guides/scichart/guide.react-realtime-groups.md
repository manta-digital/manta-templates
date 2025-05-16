# SciChart React Realtime and Groups Guide

## Stacking/Combining Plots with Chart Groups

SciChart React provides a `<SciChartGroup>` component that allows you to stack multiple charts and synchronize their behavior.

### Basic Chart Group Implementation

```jsx
import React, { useState } from 'react';
import { SciChartGroup, SciChartReact } from 'scichart-react';
import { SciChartSurface, NumericAxis } from 'scichart';

// Simple chart initialization function
const initChart = async (divElement, chartId) => {
  const { sciChartSurface, wasmContext } = await SciChartSurface.create(
    divElement,
    {
      title: `Chart ${chartId}`,
      titleStyle: { fontSize: 16 },
    },
  );

  sciChartSurface.xAxes.add(new NumericAxis(wasmContext));
  sciChartSurface.yAxes.add(new NumericAxis(wasmContext));

  return { sciChartSurface };
};

function App() {
  return (
    <div style={{ height: '600px' }}>
      <SciChartGroup>
        <SciChartReact
          initChart={(div) => initChart(div, 1)}
          style={{ height: '50%' }}
        />
        <SciChartReact
          initChart={(div) => initChart(div, 2)}
          style={{ height: '50%' }}
        />
      </SciChartGroup>
    </div>
  );
}
```

### Dynamic Chart Groups with React

You can dynamically add or remove charts from a group:

```jsx
import React, { useState } from 'react';
import { SciChartGroup, SciChartReact } from 'scichart-react';

function App() {
  const [charts, setCharts] = useState([0, 1]); // Initial charts

  const addChart = () => {
    setCharts([...charts, charts.length]);
  };

  const removeChart = () => {
    if (charts.length > 0) {
      setCharts(charts.slice(0, -1));
    }
  };

  return (
    <div>
      <div>
        <button onClick={addChart}>Add Chart</button>
        <button onClick={removeChart}>Remove Chart</button>
      </div>

      <div style={{ height: '600px' }}>
        <SciChartGroup>
          {charts.map((chartId) => (
            <SciChartReact
              key={chartId}
              initChart={(div) => initChart(div, chartId)}
              style={{ height: `${100 / charts.length}%` }}
            />
          ))}
        </SciChartGroup>
      </div>
    </div>
  );
}
```

### Synchronizing Charts in a Group

To synchronize zooming, panning and tooltips across charts:

```jsx
// 1. First, import necessary classes
import { AxisSynchronizer } from './AxisSynchronizer'; // Create this class

// 2. Create an AxisSynchronizer class
// AxisSynchronizer.js
import { EventHandler } from 'scichart';

export class AxisSynchronizer {
  constructor(initialRange, axes) {
    this.visibleRange = initialRange;
    this.axes = [];
    this.visibleRangeChanged = new EventHandler();

    if (axes) {
      axes.forEach((a) => this.addAxis(a));
    }
  }

  publishChange(data) {
    this.visibleRange = data.visibleRange;
    this.axes.forEach((a) => (a.visibleRange = this.visibleRange));
    this.visibleRangeChanged.raiseEvent(data);
  }

  addAxis(axis) {
    if (!this.axes.includes(axis)) {
      this.axes.push(axis);
      axis.visibleRange = this.visibleRange;
      axis.visibleRangeChanged.subscribe(this.publishChange.bind(this));
    }
  }

  removeAxis(axis) {
    const index = this.axes.findIndex((a) => a === axis);
    if (index >= 0) {
      this.axes.splice(index, 1);
      axis.visibleRangeChanged.unsubscribe(this.publishChange.bind(this));
    }
  }
}

// 3. Use AxisSynchronizer in your Chart Group component
function App() {
  const [axisSynchronizer] = useState(new AxisSynchronizer());

  return (
    <SciChartGroup>
      {charts.map((chartId) => (
        <SciChartReact
          key={chartId}
          initChart={(div) => initChart(div, chartId, 'chartGroupId')}
          onInit={(initResult) => {
            // Sync X-Axes
            axisSynchronizer.addAxis(initResult.sciChartSurface.xAxes.get(0));
          }}
          onDelete={(initResult) => {
            // Clean up when chart is removed
            axisSynchronizer.removeAxis(
              initResult.sciChartSurface.xAxes.get(0),
            );
          }}
          style={{ height: `${100 / charts.length}%` }}
        />
      ))}
    </SciChartGroup>
  );
}

// 4. Add modifierGroup to share mouse events for tooltips and cursors
const initChart = async (divElement, chartId, chartGroupId) => {
  // Create surface and axes...

  // Add ZoomPan and tooltip modifiers
  sciChartSurface.chartModifiers.add(
    new ZoomPanModifier(),
    new ZoomExtentsModifier(),
    new RolloverModifier({
      modifierGroup: chartGroupId, // Share events between charts
      rolloverLineStroke: 'LightSteelBlue',
    }),
  );

  return { sciChartSurface };
};
```

## Implementing Real-Time Updates

SciChart excels at real-time data visualization with efficient data updates.

### Basic Data Updates

```jsx
// Inside initChart function
const xValues = [0, 1, 2, 3, 4, 5];
const yValues = [1, 4, 2, 6, 3, 8];

// Create the data series
const dataSeries = new XyDataSeries(wasmContext, { xValues, yValues });

// Create and add the series
const lineSeries = new FastLineRenderableSeries(wasmContext, {
  dataSeries: dataSeries,
  stroke: 'steelblue',
  strokeThickness: 3,
});

sciChartSurface.renderableSeries.add(lineSeries);

// Return a function to update data in onInit
return {
  sciChartSurface,
  updateData: () => {
    // Add a new data point
    const nextX = xValues.length;
    const nextY = Math.random() * 10;

    // Append to data series - chart updates automatically
    dataSeries.append(nextX, nextY);

    // Optional: auto-scroll chart to show latest data
    sciChartSurface.zoomExtents();
  },
};

// In your React component
function App() {
  const [chartState, setChartState] = useState(null);

  return (
    <div>
      <button onClick={() => chartState?.updateData()}>Add Data Point</button>

      <SciChartReact
        initChart={initChart}
        onInit={setChartState}
        style={{ width: '800px', height: '600px' }}
      />
    </div>
  );
}
```

### Continuous Real-Time Updates

For continuous real-time updates, use a timer or interval:

```jsx
function App() {
  const [chartState, setChartState] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const intervalRef = useRef(null);

  // Toggle real-time updates
  const toggleUpdates = () => {
    if (!isUpdating) {
      // Start updates
      intervalRef.current = setInterval(() => {
        if (chartState) {
          chartState.updateData();
        }
      }, 100); // Update every 100ms
      setIsUpdating(true);
    } else {
      // Stop updates
      clearInterval(intervalRef.current);
      setIsUpdating(false);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div>
      <button onClick={toggleUpdates}>
        {isUpdating ? 'Stop Updates' : 'Start Updates'}
      </button>

      <SciChartReact
        initChart={initChart}
        onInit={setChartState}
        style={{ width: '800px', height: '600px' }}
      />
    </div>
  );
}
```

### FIFO (Scrolling) Charts

For fixed-size sliding window charts:

```jsx
const initChart = async (rootElement) => {
  // Create surface and axes...

  // Initial data
  const initialPointCount = 100;
  const fifoCapacity = 500; // Maximum points in the series

  // Create a FIFO series that maintains a fixed number of points
  const dataSeries = new XyDataSeries(wasmContext, {
    fifoCapacity: fifoCapacity,
  });

  // Initialize with some data
  for (let i = 0; i < initialPointCount; i++) {
    dataSeries.append(i, Math.sin(i * 0.1) + Math.random() * 0.5);
  }

  // Create and add the series
  const lineSeries = new FastLineRenderableSeries(wasmContext, {
    dataSeries: dataSeries,
    stroke: 'steelblue',
    strokeThickness: 2,
  });

  sciChartSurface.renderableSeries.add(lineSeries);

  // Configure X axis to auto-scroll
  const xAxis = sciChartSurface.xAxes.get(0);
  xAxis.autoRange = EAutoRange.Never;
  xAxis.visibleRange = new NumberRange(0, initialPointCount);

  let currentIndex = initialPointCount;

  // Return update function
  return {
    sciChartSurface,
    updateData: () => {
      // Add a new point
      dataSeries.append(
        currentIndex,
        Math.sin(currentIndex * 0.1) + Math.random() * 0.5,
      );

      // Auto-scroll x-axis to show latest data points
      if (currentIndex >= fifoCapacity) {
        // Keep the same viewport width while scrolling
        const visibleRangeWidth =
          xAxis.visibleRange.max - xAxis.visibleRange.min;
        xAxis.visibleRange = new NumberRange(
          currentIndex - visibleRangeWidth,
          currentIndex,
        );
      }

      currentIndex++;
    },
  };
};
```

### High-Frequency Data Updates

For high-frequency data, use batching to reduce rendering overhead:

```jsx
const initChart = async (rootElement) => {
  // Create surface and axes...

  const dataSeries = new XyDataSeries(wasmContext);
  const lineSeries = new FastLineRenderableSeries(wasmContext, {
    dataSeries: dataSeries,
    stroke: 'steelblue',
  });

  sciChartSurface.renderableSeries.add(lineSeries);

  return {
    sciChartSurface,
    updateDataBatch: (newData) => {
      // Temporarily suspend updates for batch operations
      sciChartSurface.suspendUpdates();

      try {
        // Clear existing data if needed
        dataSeries.clear();

        // Add multiple points at once
        dataSeries.appendRange(newData.xValues, newData.yValues);

        // Optional: auto-scale
        sciChartSurface.zoomExtents();
      } finally {
        // Resume updates and render once
        sciChartSurface.resumeUpdates();
      }
    },
  };
};
```

## Displaying Multiple Chart Types Together

SciChart allows combining different chart types on the same surface.

### Combining Different Series Types

```jsx
const initChart = async (rootElement) => {
  const { sciChartSurface, wasmContext } =
    await SciChartSurface.create(rootElement);

  // Add axes
  sciChartSurface.xAxes.add(new NumericAxis(wasmContext));
  sciChartSurface.yAxes.add(new NumericAxis(wasmContext));

  // Sample data
  const xValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const lineValues = [5, 7, 3, 8, 6, 9, 2, 4, 7, 5];
  const columnValues = [2, 4, 1, 7, 5, 3, 9, 5, 2, 6];
  const mountainValues = [7, 3, 5, 2, 8, 1, 6, 4, 7, 3];

  // Add a line series
  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      dataSeries: new XyDataSeries(wasmContext, {
        xValues,
        yValues: lineValues,
        dataSeriesName: 'Line Series',
      }),
      stroke: '#4083B7',
      strokeThickness: 3,
      pointMarker: new EllipsePointMarker(wasmContext, {
        fill: 'white',
        stroke: '#4083B7',
        width: 7,
        height: 7,
      }),
    }),
  );

  // Add a column series
  sciChartSurface.renderableSeries.add(
    new FastColumnRenderableSeries(wasmContext, {
      dataSeries: new XyDataSeries(wasmContext, {
        xValues,
        yValues: columnValues,
        dataSeriesName: 'Column Series',
      }),
      fill: '#EC0F6C',
      dataPointWidth: 0.5,
    }),
  );

  // Add a mountain (area) series
  sciChartSurface.renderableSeries.add(
    new FastMountainRenderableSeries(wasmContext, {
      dataSeries: new XyDataSeries(wasmContext, {
        xValues,
        yValues: mountainValues,
        dataSeriesName: 'Mountain Series',
      }),
      fill: '#50C7E055', // Semi-transparent fill
      stroke: '#50C7E0',
      strokeThickness: 2,
    }),
  );

  // Add a legend
  sciChartSurface.chartModifiers.add(
    new LegendModifier({
      placement: ELegendPlacement.TopRight,
      showSeriesMarkers: true,
    }),
  );

  return { sciChartSurface };
};
```

### Using Multiple Y-Axes for Different Series

```jsx
const initChart = async (rootElement) => {
  const { sciChartSurface, wasmContext } =
    await SciChartSurface.create(rootElement);

  // Create a common X axis
  sciChartSurface.xAxes.add(
    new NumericAxis(wasmContext, { axisTitle: 'X Axis' }),
  );

  // Create two Y axes with different IDs
  sciChartSurface.yAxes.add(
    new NumericAxis(wasmContext, {
      id: 'leftAxis',
      axisTitle: 'Left Axis',
      axisAlignment: EAxisAlignment.Left,
      axisTitleStyle: { color: '#4083B7' },
      majorGridLineStyle: { stroke: '#4083B744' },
    }),
  );

  sciChartSurface.yAxes.add(
    new NumericAxis(wasmContext, {
      id: 'rightAxis',
      axisTitle: 'Right Axis',
      axisAlignment: EAxisAlignment.Right,
      axisTitleStyle: { color: '#EC0F6C' },
      majorGridLineStyle: { stroke: '#EC0F6C44' },
    }),
  );

  // Sample data
  const xValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const lineValues = [5, 7, 3, 8, 6, 9, 2, 4, 7, 5];
  const columnValues = [200, 400, 100, 700, 500, 300, 900, 500, 200, 600];

  // Add a line series using the left Y axis
  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      dataSeries: new XyDataSeries(wasmContext, {
        xValues,
        yValues: lineValues,
        dataSeriesName: 'Line Series',
      }),
      stroke: '#4083B7',
      strokeThickness: 3,
      yAxisId: 'leftAxis', // Bind to left axis
    }),
  );

  // Add a column series using the right Y axis
  sciChartSurface.renderableSeries.add(
    new FastColumnRenderableSeries(wasmContext, {
      dataSeries: new XyDataSeries(wasmContext, {
        xValues,
        yValues: columnValues,
        dataSeriesName: 'Column Series',
      }),
      fill: '#EC0F6C',
      dataPointWidth: 0.5,
      yAxisId: 'rightAxis', // Bind to right axis
    }),
  );

  return { sciChartSurface };
};
```

### Creating Composite Charts

For more complex combination charts:

```jsx
const initChart = async (rootElement) => {
  const { sciChartSurface, wasmContext } =
    await SciChartSurface.create(rootElement);

  // Create axes
  sciChartSurface.xAxes.add(
    new DateTimeNumericAxis(wasmContext, {
      axisTitle: 'Date',
    }),
  );

  sciChartSurface.yAxes.add(
    new NumericAxis(wasmContext, {
      id: 'priceAxis',
      axisTitle: 'Price',
      axisAlignment: EAxisAlignment.Left,
      growBy: new NumberRange(0.1, 0.1),
    }),
  );

  sciChartSurface.yAxes.add(
    new NumericAxis(wasmContext, {
      id: 'volumeAxis',
      axisTitle: 'Volume',
      axisAlignment: EAxisAlignment.Right,
      growBy: new NumberRange(0, 0.5),
    }),
  );

  // Sample stock data (Date, Open, High, Low, Close, Volume)
  const dates = [
    new Date(2023, 0, 1).getTime(),
    new Date(2023, 0, 2).getTime(),
    // ... more dates
  ];

  const opens = [150, 153];
  const highs = [155, 158];
  const lows = [148, 149];
  const closes = [153, 155];
  const volumes = [1000000, 1200000];

  // Add candlestick series for price data
  sciChartSurface.renderableSeries.add(
    new FastCandlestickRenderableSeries(wasmContext, {
      dataSeries: new OhlcDataSeries(wasmContext, {
        xValues: dates,
        openValues: opens,
        highValues: highs,
        lowValues: lows,
        closeValues: closes,
        dataSeriesName: 'Price',
      }),
      strokeThickness: 1,
      dataPointWidth: 0.7,
      brushUp: '#00AA00', // Green candle body for price up
      brushDown: '#FF0000', // Red candle body for price down
      strokeUp: '#00AA00',
      strokeDown: '#FF0000',
      yAxisId: 'priceAxis',
    }),
  );

  // Add column series for volume data
  sciChartSurface.renderableSeries.add(
    new FastColumnRenderableSeries(wasmContext, {
      dataSeries: new XyDataSeries(wasmContext, {
        xValues: dates,
        yValues: volumes,
        dataSeriesName: 'Volume',
      }),
      fill: '#8844AA77', // Semi-transparent purple
      yAxisId: 'volumeAxis',
    }),
  );

  // Add zoom/pan behavior
  sciChartSurface.chartModifiers.add(
    new ZoomPanModifier(),
    new ZoomExtentsModifier(),
    new MouseWheelZoomModifier(),
  );

  return { sciChartSurface };
};
```
