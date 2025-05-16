## What is a SciChart CategoryAxis?

A **CategoryAxis** in SciChart is a special type of axis that uses the _index_ of data points (the X-Index), rather than their actual X-Value, to determine their position on the axis. This means that every data point is treated as equidistant, regardless of the underlying X-Value. The CategoryAxis is especially useful in scenarios where data is _discontinuous_ or contains gaps, such as financial or stock market charts where weekends and holidays result in missing dates[1][6][7][9][10].

### How Does CategoryAxis Work?

- **Index-Based Positioning**: Instead of mapping data points by their X-Value (e.g., date or number), CategoryAxis maps them by their order in the data series. The first point is at index 0, the second at index 1, and so on[1][4][7][9][10].
- **Gap Collapsing**: Any gaps in the X-Values (such as missing days in stock data) are ignored. Each data point is spaced evenly, so the chart appears continuous without breaks for missing values[1][6][9].
- **Usage**: Commonly used in financial charts, such as candlestick or OHLC charts, where regular time intervals are expected but not always present in the data[1][4][7][9][10].

**Example**:  
If you have stock data for Monday, Tuesday, Thursday, and Friday (missing Wednesday), a NumericAxis would show a gap for Wednesday, but a CategoryAxis would display the four days as evenly spaced, consecutive points.

### Configuration

- **SciChart.js**:
  ```js
  const xAxis = new CategoryAxis(wasmContext, { ...options });
  ```
- **SciChart WPF/Android/iOS**:  
  Use `CategoryDateTimeAxis`, `CategoryNumericAxis`, or `CategoryDateAxis` for similar behavior, depending on your platform and data type[3][4][9][10].

## Performance Considerations

**Advantages**:

- **Efficient for Discontinuous Data**: CategoryAxis simplifies rendering of charts with missing or irregular X-Values, avoiding unnecessary gaps and improving readability[1][6][9].

**Potential Disadvantages**:

- **Index Mapping Overhead**: For very large datasets, mapping values to indices can introduce a small overhead, but this is generally negligible compared to the overhead of rendering and other chart operations.
- **Axis Label Rendering**: As with all axes, rendering many ticks and labels can impact performance. For charts with a very high number of data points, axis tick and label drawing can become a bottleneck, particularly if minor grid lines are enabled or if the chart is not optimized[2][5].
- **Not Suitable for All Data Types**: CategoryAxis is not appropriate when true value-based spacing is required (e.g., scientific data with meaningful X-Value distances)[4][7][10].

> "Axis ticks and labels are drawn using WPF canvases which are far slower than bitmap rendered series, so we want to minimize these if at all possible. If you can handle it, setting AxisBase.DrawMinorGridLines = false will further improve performance..."[2]

**Best Practices**:

- For best performance with CategoryAxis and large datasets, consider:
  - Disabling minor grid lines and unnecessary labels[2].
  - Using block updates to append data[5].
  - Profiling and optimizing axis rendering if you notice slowdowns.

## Summary Table

| Feature      | CategoryAxis                                                                                  | Numeric/Value Axis                                            |
| ------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Positioning  | By data index (X-Index)                                                                       | By X-Value                                                    |
| Gaps in Data | Collapsed (no visible gaps)                                                                   | Shown as gaps                                                 |
| Use Case     | Financial charts, discontinuous data                                                          | Scientific charts, continuous data                            |
| Performance  | Generally efficient, but axis label rendering can impact performance with very large datasets | Efficient, but can show unwanted gaps with discontinuous data |

**In summary:**  
SciChart's CategoryAxis is ideal for financial and other discontinuous datasets, ensuring evenly spaced data points regardless of gaps in X-Values. While generally performant, rendering many axis labels or gridlines can impact performance, so optimization may be needed for extremely large datasets[1][2][6][9][10].

Sources
[1] The Category Axis | JavaScript Chart Documentation - SciChart https://www.scichart.com/documentation/js/current/CategoryAxis.html
[2] Overview Performance Problems | WPF Chart Forums - SciChart https://www.scichart.com/questions/wpf/grinding-to-a-halt
[3] Axis Types in SciChart | WPF Chart Documentation https://www.scichart.com/documentation/win/current/Axis%20Types%20in%20SciChart.html
[4] Axis APIs - Value Axis vs. Category Axis Reference - SciChart https://www.scichart.com/documentation/ios/current/axis-apis---value-axis-vs-category-axis.html
[5] Debugging Performance Problems | WPF Chart Documentation https://www.scichart.com/documentation/win/current/Debugging%20Performance%20Problems.html
[6] JavaScript Chart Axis Types - SciChart https://www.scichart.com/example/javascript-chart/javascript-axis-types/
[7] Value Axis vs. Category Axis | WPF Chart Documentation - SciChart https://www.scichart.com/documentation/win/current/Value%20Axis%20vs.%20Category%20Axis.html
[8] Ask Questions About Our Charting Libraries | SciChart Forums https://www.scichart.com/questions?p=13&sort=oldest
[9] Axis APIs | SciChart Android Documentation https://www.scichart.com/documentation/android/current/articles/chart2d/axisAPIs/Axis%20APIs.html
[10] Value Axis vs. Category Axis | SciChart Android Documentation https://www.scichart.com/documentation/android/current/articles/chart2d/axisAPIs/Axis%20APIs%20-%20Value%20Axis%20vs.%20Category%20Axis.html
[11] WPF Category Axis vs Value Axis - SciChart https://www.scichart.com/example/wpf-chart/wpf-category-vs-value-axis/
[12] Bar chart with linear axis instead of category axis - Telerik.com https://www.telerik.com/forums/bar-chart-with-linear-axis-instead-of-category-axis
[13] CategoryNumericAxis Class - SciChart https://www.scichart.com/documentation/win/current/SciChart.Charting~SciChart.Charting.Visuals.Axes.CategoryNumericAxis.html
[14] Set annotation X1 and X2 on BoxAnnotationViewModel to be ... https://stackoverflow.com/questions/61326559/set-annotation-x1-and-x2-on-boxannotationviewmodel-to-be-between-major-grid-unit
[15] JavaScript Chart Axis Types - SciChart https://www.scichart.com/example/javascript-chart/javascript-axis-types/
[16] SciChart.js JavaScript Charts User Manual https://www.scichart.com/documentation/js/current/SciChart_JS_User_Manual.html
[17] AxisBase Class Properties - SciChart https://www.scichart.com/documentation/win/current/SciChart.Charting~SciChart.Charting.Visuals.Axes.AxisBase_properties.html
[18] JavaScript Chart with Multiple X Axes | SciChart.js Demo - LinkedIn https://www.linkedin.com/posts/scichart_javascript-chart-with-multiple-x-axes-scichartjs-activity-7196044777660833794-48JR
[19] DateAxis vs CategoryDateAxis | Android Chart Forums - SciChart https://www.scichart.com/questions/question/dateaxis-vs-categorydateaxis
[20] Memory Best Practices | JavaScript Chart Documentation - SciChart https://www.scichart.com/documentation/js/current/MemoryBestPractices.html
[21] SciChart.js v3.3 Released! Cumulative Update and Important Issue ... https://www.scichart.com/scichart-js-v3-3-released/
[22] Datetime in X axis | JavaScript Chart Forums - SciChart https://www.scichart.com/questions/js/datetime-in-x-axis
[23] Error from chart in div scichart-root TypeError: Cannot read ... https://www.scichart.com/questions/js/error-from-chart-in-div-scichart-root-typeerror-cannot-read-properties-of-undefined-reading-getcoordinate
[24] Ask Questions About Our Charting Libraries | SciChart Forums https://www.scichart.com/questions
[25] Support YAxis Auto scale | WPF Chart Forums - SciChart https://www.scichart.com/questions/wpf/support-yaxis-auto-scale/answers?sort=oldest&filter=1
[26] SciChart.js Performance Demo: 1 Million Datapoints in under 15ms https://www.scichart.com/blog/scichart-js-performance-demo-1-million-datapoints-70ms/
[27] Capacity of DataSeries | WPF Chart Forums - SciChart https://www.scichart.com/questions/wpf/capacity-of-dataseries
[28] Modify Axis Behavior - SciChart https://www.scichart.com/examples/modify-axis-behavior-2d-charts-wpf-chart/
[29] Multiple Line Chart Performance | WPF Chart Forums - SciChart https://www.scichart.com/questions/wpf/multiple-line-chart-performance
[30] FastLineRenderableSeries for multiple series chart - SciChart https://www.scichart.com/questions/wpf/fastlinerenderableseries-for-multiple-series-chart
[31] Axis APIs Reference - SciChart https://www.scichart.com/documentation/ios/current/Axis%20APIs.html
[32] Axis Ranging - Set Range and Zoom to Fit - SciChart https://www.scichart.com/documentation/js/current/Axis%20Ranging%20-%20Setting%20and%20Getting%20VisibleRange.html
[33] SciChart.Charting.Visuals.Axes Namespace https://www.scichart.com/documentation/win/current/SciChart.Charting~SciChart.Charting.Visuals.Axes_namespace.html
[34] Ask Questions About Our Charting Libraries | SciChart Forums https://www.scichart.com/questions?p=4
[35] SciChart.JS Changelog https://www.scichart.com/changelog/scichart-js/
[36] NumericAxis | API Documentation for SciChart.js - v3.5.723 https://www.scichart.com/documentation/js/current/typedoc/classes/numericaxis.html
