To prevent candlestick overlap in SciChart, you should adjust the **dataPointWidth** and potentially the **dataPointWidthMode** properties of your candlestick series. Here’s how you can address overlap:

## 1. Adjust `dataPointWidth`

- The `dataPointWidth` property sets the width of each candlestick as a fraction of the available space per data point, with valid values between 0.0 and 1.0.
- If your candlesticks are overlapping, reduce the `dataPointWidth` value (for example, set it to 0.6 or 0.7 instead of 1.0). This will create space between adjacent candles and prevent overlap[5].

```javascript
const candlestickSeries = new FastCandlestickRenderableSeries(wasmContext, {
  dataSeries,
  dataPointWidth: 0.7, // Try values like 0.5, 0.6, 0.7, etc.
  // ... other options
});
```

## 2. Use `dataPointWidthMode` (SciChart.js v3.4+)

- SciChart introduced the `dataPointWidthMode` property to give you more control over how widths are calculated, especially when data is sparse or X values are unevenly spaced[3].
- Modes:
  - **Absolute**: Width is a fixed pixel value.
  - **Range**: Width is a fixed X-axis data range per candle.
  - **Relative**: Width is a fraction of available space (the default).

If your X-axis values are not evenly spaced, try using `Range` mode to prevent overlap:

```javascript
candlestickSeries.dataPointWidthMode = EDataPointWidthMode.Range;
candlestickSeries.dataPointWidth = 8; // width in X-axis units
```

## 3. Use a `CategoryAxis` for Even Spacing

- If your data has gaps (e.g., weekends in stock data), using a `CategoryAxis` ensures each candle is evenly spaced by index, not by value, which helps prevent overlap and inconsistent spacing[5].

## Summary Table

| Setting            | How it helps prevent overlap         |
| ------------------ | ------------------------------------ |
| dataPointWidth     | Reduces candle width, adds spacing   |
| dataPointWidthMode | Controls width calculation method    |
| CategoryAxis       | Ensures even spacing for each candle |

**Recommendation:**  
Start by lowering `dataPointWidth`. If you still see overlap due to uneven X values, set `dataPointWidthMode` to `Range` and specify a width that fits your data. For financial data with gaps, switch to a `CategoryAxis` for consistent spacing[3][5].

These adjustments will ensure your candlesticks do not overlap, resulting in a clearer and more readable chart.

Sources
[1] image.jpg https://pplx-res.cloudinary.com/image/upload/v1745217299/user_uploads/izlxHnoxhxVBMHw/image.jpg
[2] Annotation auto placement to prevent overlapping support? - SciChart https://www.scichart.com/questions/wpf/annotation-auto-placement-to-prevent-overlapping-support
[3] Column Series Data Point Width Mode | JavaScript Chart ... - SciChart https://www.scichart.com/documentation/js/current/ColumnSeriesDataPointWidthMode.html
[4] Data Label Positioning | JavaScript Chart Documentation - SciChart https://www.scichart.com/documentation/js/current/DataLabelPositioning.html
[5] The Candlestick Series type | JavaScript Chart Documentation https://www.scichart.com/documentation/js/current/The%20Candlestick%20Series%20type.html
[6] Place Candles on Chart Without Overlapping - Stack Overflow https://stackoverflow.com/questions/25447641/place-candles-on-chart-without-overlapping
[7] Is there a way to have the candle bars not overlap over the volume ... https://www.reddit.com/r/TradingView/comments/1athyvw/is_there_a_way_to_have_the_candle_bars_not/
[8] Why have candlestick charts overlaps? https://money.stackexchange.com/questions/43769/why-have-candlestick-charts-overlaps
[9] JavaScript Candlestick Chart | Chart Examples | SciChart.js https://www.scichart.com/example/javascript-chart/javascript-candlestick-chart/
[10] 2D Chart Types - Candlestick Series Reference - SciChart https://www.scichart.com/documentation/ios/current/2d-chart-types---candlestick-series.html
[11] WPF Candlestick Chart and Moving Averages - SciChart https://www.scichart.com/example/wpf-chart/wpf-chart-example-candlestick-and-lines/
[12] How to prevent candle bars from overlapping? · Issue #467 - GitHub https://github.com/rrag/react-stockcharts/issues/467
[13] The Candlestick Series type | SciChart Android Documentation https://www.scichart.com/documentation/android/current/articles/chart2d/2dChartTypes/Candlestick%20Series.html
[14] Secondary and Multiple Axis | JavaScript Chart Documentation https://www.scichart.com/documentation/js/current/Axis%20Alignment%20-%20Setting%20Axis%20Alignment.html
[15] WPF Chart Vertically Stacked YAxis - SciChart https://www.scichart.com/example/wpf-chart/wpf-chart-example-vertically-stacked-yaxis/
[16] The Candlestick charts type | WPF Chart Documentation - SciChart https://www.scichart.com/documentation/win/current/The%20Candlestick%20charts%20type.html
[17] WPF Candlestick Charts | Fast WPF Chart Examples - SciChart https://www.scichart.com/example/wpf-chart/wpf-chart-example-candlestick-chart/
[18] Candlestick overlap - NinjaTrader Support Forum https://forum.ninjatrader.com/forum/historical-beta-archive/historical-version-7-beta-threads/version-7-beta-general-questions-bug-reports/31914-candlestick-overlap
[19] Gridline and Label Spacing (Interval) | JavaScript Chart ... - SciChart https://www.scichart.com/documentation/js/current/Axis%20Ticks%20-%20Gridline%20and%20Label%20Spacing%20(Interval).html
[20] Candle Price Volume Bars overlapping - Support Board - Sierra Chart https://www.sierrachart.com/SupportBoard.php?ThreadID=75810
[21] Ask Questions About Our Charting Libraries | SciChart Forums https://www.scichart.com/questions?p=3
