## SciChart Candlestick Series: Settings and Configuration Options

SciChart provides a range of settings and configuration options for candlestick series across its platforms (JavaScript, Android, iOS). The following summarizes the key configurable options and features:

**Core Configuration Options**

- **Data Series**: Candlestick charts require an OHLC data series, typically provided as arrays of open, high, low, and close values, often with an X value (e.g., date or index)[1][2][3].
- **Stroke and Fill Colors**:
  - _Up Candles_: Configure with `strokeUp` and `brushUp` (JS), `StrokeUp` and `FillUp` (Android/iOS).
  - _Down Candles_: Configure with `strokeDown` and `brushDown` (JS), `StrokeDown` and `FillDown` (Android/iOS).
  - These settings control the color of the candlestick body and outline depending on whether the close is above or below the open[1][2][3].
- **Data Point Width**: The `dataPointWidth` property determines how much horizontal space each candlestick occupies (from 0 to 1, where 1 means adjacent candles touch)[1][2][3].
- **Stroke Thickness**: Controls the thickness of the candlestick outlines[1].
- **Axes Assignment**: In multi-axis scenarios, you can assign the candlestick series to specific X and Y axes using axis IDs[2][3].

**Advanced Features**

- **Palette Providers**: SciChart supports per-candle coloring through palette providers, allowing you to dynamically set colors for individual candlesticks based on custom logic[2][3].
- **Gaps in Data**: You can render gaps in the candlestick series by inserting data points with `NaN` values for open, high, low, or close[2][3].
- **Category Axis**: For financial data with gaps (e.g., weekends), using a `CategoryAxis` ensures gaps are not rendered, as it indexes by position rather than value[1].

**Platform-Specific Properties**

| Platform   | Up Color Options                    | Down Color Options                      | Data Point Width | Axis Assignment      | Palette Provider Support | Gaps |
| ---------- | ----------------------------------- | --------------------------------------- | ---------------- | -------------------- | ------------------------ | ---- |
| JavaScript | `strokeUp`, `brushUp`               | `strokeDown`, `brushDown`               | `dataPointWidth` | `xAxisId`, `yAxisId` | Yes                      | Yes  |
| Android    | `StrokeUp`, `FillUp`                | `StrokeDown`, `FillDown`                | `dataPointWidth` | `xAxisId`, `yAxisId` | Yes                      | Yes  |
| iOS        | `strokeUpStyle`, `fillUpBrushStyle` | `strokeDownStyle`, `fillDownBrushStyle` | `dataPointWidth` | `xAxisId`, `yAxisId` | Yes                      | Yes  |

**Example (JavaScript)**

```javascript
const candlestickSeries = new FastCandlestickRenderableSeries(wasmContext, {
  strokeThickness: 1,
  dataSeries,
  dataPointWidth: 0.7,
  brushUp: '#33ff3377',
  brushDown: '#ff333377',
  strokeUp: '#77ff77',
  strokeDown: '#ff7777',
});
```

**Example (Android)**

```java
candlestickSeries.setFillDownBrushStyle(new SolidBrushStyle(Color.RED));
candlestickSeries.setFillUpBrushStyle(new SolidBrushStyle(Color.GREEN));
candlestickSeries.setStrokeDownStyle(new SolidPenStyle(Color.RED, true, 1f, null));
candlestickSeries.setStrokeUpStyle(new SolidPenStyle(Color.GREEN, true, 1f, null));
candlestickSeries.setDataPointWidth(0.7f);
```

**Example (iOS)**

```swift
candlestickSeries.fillUpBrushStyle = SCISolidBrushStyle(color: .green)
candlestickSeries.fillDownBrushStyle = SCISolidBrushStyle(color: .red)
candlestickSeries.strokeUpStyle = SCISolidPenStyle(color: .green, thickness: 1.0)
candlestickSeries.strokeDownStyle = SCISolidPenStyle(color: .red, thickness: 1.0)
candlestickSeries.dataPointWidth = 0.7
```

## Summary Table: Key Candlestick Series Options

| Option                | Description                            | Platforms |
| --------------------- | -------------------------------------- | --------- |
| Data Series           | OHLC data source                       | All       |
| Up/Down Fill & Stroke | Colors for up/down candles             | All       |
| Data Point Width      | Fraction of space each candle occupies | All       |
| Stroke Thickness      | Outline thickness                      | All       |
| Axes Assignment       | Assign to specific X/Y axes            | All       |
| Palette Provider      | Per-candle dynamic coloring            | All       |
| Gaps                  | Render gaps with NaN values            | All       |
| Category Axis         | Remove gaps in time series data        | JS        |

SciChart’s candlestick series are highly configurable, supporting both basic appearance options and advanced features like palette providers and gap rendering[1][2][3].

Sources
[1] The Candlestick Series type | JavaScript Chart Documentation https://www.scichart.com/documentation/js/current/The%20Candlestick%20Series%20type.html
[2] The Candlestick Series type | SciChart Android Documentation https://www.scichart.com/documentation/android/current/articles/chart2d/2dChartTypes/Candlestick%20Series.html
[3] 2D Chart Types - Candlestick Series Reference - SciChart https://www.scichart.com/documentation/ios/current/2d-chart-types---candlestick-series.html
[4] FastCandlestickRenderableSeries | API Documentation for SciChart.js https://www.scichart.com/documentation/js/current/typedoc/classes/fastcandlestickrenderableseries.html
[5] SciChart.js Documentation | JavaScript Chart Documentation https://www.scichart.com/documentation/js/current/webframe.html
[6] Tutorial 02 - Adding Series and Data | JavaScript Chart Documentation https://www.scichart.com/documentation/js/current/Tutorial%2002%20-%20Adding%20Series%20and%20Data.html
[7] Here - RenderableSeries Overview | JavaScript Chart Documentation https://www.scichart.com/documentation/js/current/What%20is%20a%20RenderableSeries.html
[8] Untitled https://www.scichart.com/documentation/js/current/webnav.html
[9] OhlcDataSeries | API Documentation for SciChart.js - v3.5.727 https://www.scichart.com/documentation/js/current/typedoc/classes/ohlcdataseries.html
