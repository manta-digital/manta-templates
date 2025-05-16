## Overview

Provides information on how to use the `visibleRangeLimit` and other related properties to restrict the axis visible range in SciChart JS/React.

## Summary

**VisibleRangeLimit** is available and works in **SciChart JS** and **SciChart React** for restricting the axis visible range, but with an important limitation:

- It **clips the visible range when zooming or programmatically setting the range** (such as with `zoomExtents()`), but **it does not prevent the user from panning or scrolling outside of the data range** using interactive modifiers[1][4][5].

This is confirmed in the SciChart documentation for other platforms and is consistent across SciChart products:

> "VisibleRangeLimit is a useful API to ensure the axis clips the visibleRange when zooming to extents. However, it will not stop a user from scrolling outside of that range. To achieve that, you will need to clip the visibleRange in code."[1][4]

### **What Works in SciChart JS/React**

- **Setting `visibleRangeLimit`:**

  ```js
  xAxis.visibleRangeLimit = new NumberRange(dataMin, dataMax);
  ```

  This will restrict the visible range during zooming and when calling `zoomExtents()` or setting the range directly.

- **Limitation:**  
  Users **can still pan outside** the `visibleRangeLimit` unless you implement additional logic to clip the visible range in response to user interaction[1][4].

### **How to Fully Restrict Panning**

- **You must listen for visible range changes** (e.g., via an event or in your update/render loop) and programmatically reset the visible range if it exceeds your desired bounds. There is no built-in property in SciChart JS/React that fully locks panning to the data range[1][4].

### **Summary Table**

| Feature               | SciChart JS/React Support | Notes                                              |
| --------------------- | ------------------------- | -------------------------------------------------- |
| `visibleRangeLimit`   | Yes                       | Clips on zoom/zoomExtents, not on pan              |
| Block panning outside | No (not built-in)         | Must implement custom logic to enforce restriction |

### Additional Notes

- to prevent candlestick series from clipping the min/max candle, set axis growBy to a small value (ex: 0.5)

```
xAxis.growBy = new NumberRange(0.5, 0.5);
```

---

**In summary:**

- `visibleRangeLimit` in SciChart JS/React restricts zooming but **does not fully prevent panning outside the data range**[1][4][5].
- To completely restrict panning, you need to add custom logic to monitor and reset the axis's visible range if it exceeds your desired limits.

Sources
[1] Axis Ranging - Restricting VisibleRange - SciChart https://www.scichart.com/documentation/android/current/articles/chart2d/axisAPIs/Axis%20Ranging%20-%20Restricting%20VisibleRange.html
[2] Disable auto zoom when dragging graph horizontally - SciChart https://www.scichart.com/questions/wpf/disable-auto-zoom-when-dragging-graph-horizontally
[3] Axis Ranging - Set Range and Zoom to Fit - SciChart https://www.scichart.com/documentation/js/current/Axis%20Ranging%20-%20Setting%20and%20Getting%20VisibleRange.html
[4] Axis Ranging - Restricting VisibleRange Reference - SciChart https://www.scichart.com/documentation/ios/current/axis-ranging---restricting-visiblerange.html
[5] Limit for zooming out in SciChart - Stack Overflow https://stackoverflow.com/questions/40089587/limit-for-zooming-out-in-scichart
[6] Axis Ranging - How to Listen to VisibleRange Changes - SciChart https://www.scichart.com/documentation/js/current/Axis%20Ranging%20-%20How%20to%20Listen%20to%20VisibleRange%20Changes.html
[7] INumericAxisOptions | API Documentation for SciChart.js - v3.5.727 https://www.scichart.com/documentation/js/current/typedoc/interfaces/inumericaxisoptions.html
[8] How to disable xAxis re-scaling when panning a chart beyond the ... https://www.scichart.com/questions/wpf/how-to-disable-xaxis-re-scaling-when-panning-a-chart-beyond-the-available-data-range
[9] Synchronizing Multiple Charts | JavaScript Chart Documentation https://www.scichart.com/documentation/js/current/Synchronizing%20Multiple%20Charts.html
[10] Customize Grids and Grid lines and Grid Bands - SciChart https://www.scichart.com/questions/question/customize-grids-and-grid-lines-and-grid-bands
[11] Tutorial 03 - Modifying Chart Data and Behavior in React - SciChart https://www.scichart.com/documentation/js/current/Tutorial03ModifyingChartDataBehaviourInReact.html
[12] How to ZoomExtents a SciChartSurface to a specific range, e.g. ... https://www.scichart.com/questions/wpf/how-to-zoomextents-a-scichartsurface-to-a-specific-range-e-g-visiblerangelimit-when-double-clicking-on-the-chart
[13] ZoomPanModifier | JavaScript Chart Documentation - SciChart https://www.scichart.com/documentation/js/current/ZoomPanModifier.html
[14] SciChart - zooming and panning from code in MVVM - Stack Overflow https://stackoverflow.com/questions/36692995/scichart-zooming-and-panning-from-code-in-mvvm
[15] Tutorial 03 - Adding Zooming, Panning Behavior | JavaScript Chart ... https://www.scichart.com/documentation/js/current/Tutorial%2003%20-%20Adding%20Zooming,%20Panning%20Behavior.html
[16] Generic Animations | JavaScript Chart Documentation - SciChart https://www.scichart.com/documentation/js/current/Generic%20Animations.html
[17] CursorModifier and ZoomPanModifier not work together - SciChart https://www.scichart.com/questions/wpf/cursormodifier-and-zoompanmodifier-not-work-together
[18] WPF Chart Pan Y or X Direction - SciChart https://www.scichart.com/example/wpf-chart/wpf-chart-example-pan-y-or-x-direction/
[19] How to lock Y Axis Visible Range | WPF Chart Forums - SciChart https://www.scichart.com/questions/wpf/y-axis-visible-range-lock
[20] ZoomPanModifier | WPF Chart Documentation - SciChart https://www.scichart.com/documentation/win/current/ZoomPanModifier.html
