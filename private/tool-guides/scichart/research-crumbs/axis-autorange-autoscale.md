## AutoRange vs. AutoScale in SciChart

### Overview:

**AutoRange** and **AutoScale** are related but distinct concepts in SciChart and many other charting libraries.

### **AutoRange**

- **Definition:** AutoRange is a property of axes that, when enabled, automatically adjusts the axis's `VisibleRange` to fit the data as it changes.
- **Usage:** In SciChart, you set `axis.AutoRange = AutoRange.Always` to enable this behavior. When data is appended or replaced, the axis will automatically rescale to fit all data points[2][3].
- **Modes:** Common modes include:
  - `AutoRange.Always`: Always fit the data.
  - `AutoRange.Once`: Fit data only on first render.
  - `AutoRange.Never`: Never auto-fit; manual control only.

### **AutoScale**

- **Definition:** AutoScale is a broader term that refers to any logic that automatically scales the chart to fit the data, whether it's via `AutoRange`, manual calls to `zoomExtents()`, or custom logic (such as only scaling when new data exceeds current bounds)[1].
- **Usage:** You might implement AutoScale by calling `zoomExtents()` or by writing custom logic in a `ViewportManager` to programmatically set the `VisibleRange` based on your own criteria[1][3].

### **Comparison Table**

| Feature      | AutoRange                     | AutoScale (General)                                   |
| ------------ | ----------------------------- | ----------------------------------------------------- |
| Scope        | Axis property                 | Chart-wide or axis-specific                           |
| How it works | Axis auto-adjusts to data     | Can be manual or automatic                            |
| Typical use  | Real-time data, simple charts | Custom behaviors, thresholds                          |
| Control      | Set via `axis.AutoRange`      | Use `zoomExtents()`, custom logic, or ViewportManager |

---

## Performance Advice for AutoRange

**AutoRange** can impact performance, especially with real-time or high-frequency data updates. Here’s how to use it efficiently:

### **Best Practices**

- **Disable AutoRange during User Interaction:**  
  AutoRange conflicts with zoom/pan modifiers. Temporarily disable `AutoRange` when the user is zooming or panning, and re-enable it when done[3].

  - _Example:_ On mouse down, set `axis.AutoRange = AutoRange.Never`; on double-click, restore `AutoRange.Always` and call `zoomExtents()`[3].

- **Use Custom ViewportManager for Fine Control:**  
  For advanced scenarios (e.g., only autoscale when data exceeds current bounds or to avoid "noisy" zooming), override the `ViewportManager` methods like `OnCalculateNewXRange` and `OnCalculateNewYRange`[1][3].

  - This lets you define when and how the axis should rescale, reducing unnecessary redraws.

- **Limit Data Points Rendered:**  
  Rendering large datasets can degrade performance. Use data decimation, downsampling, or only render the visible window of data.

- **Batch Updates:**  
  When updating data, batch changes and call `InvalidateParentSurface` or similar methods once, rather than on every minor change.

- **Avoid Frequent Full-Axis AutoRange:**  
  If possible, only trigger AutoRange when new data is outside the current `VisibleRange`, not on every update. This reduces unnecessary recalculations and redraws.

---

## Example: Efficient AutoRange Implementation

```csharp
// Pseudocode for WPF, similar logic applies for JS/React
void OnDataUpdated() {
    if (newDataExceedsVisibleRange()) {
        axis.AutoRange = AutoRange.Always;
        // Optionally, call zoomExtents or set VisibleRange directly
    } else {
        axis.AutoRange = AutoRange.Never;
    }
}
```

Or, for user interaction:

```csharp
// On user zoom/pan start:
axis.AutoRange = AutoRange.Never;

// On user double-click or reset:
axis.AutoRange = AutoRange.Always;
sciChartSurface.ZoomExtents();
```

---

## Key Takeaways

- **AutoRange** is axis-level automatic fitting; **AutoScale** can be any logic to fit data, including manual or custom solutions.
- For best performance, use `AutoRange.Always` only when needed, disable it during user interaction, and consider custom ViewportManager logic for advanced scenarios[1][3].
- Always monitor performance and profile with your actual data and update rates.

If you describe your real-time data scenario in more detail, I can provide even more targeted advice.

Sources
[1] AutoScale and Zoom | WPF Chart Forums - SciChart https://www.scichart.com/questions/wpf/autoscale-and-zoom
[2] AutoRange not working as expected | WPF Chart Forums - SciChart https://www.scichart.com/questions/wpf/autorange-not-working-as-expected
[3] Ask Questions About Our Charting Libraries | SciChart Forums https://www.scichart.com/questions/answers
[4] Multiple Line Chart Performance | WPF Chart Forums - SciChart https://www.scichart.com/questions/wpf/multiple-line-chart-performance
[5] Axis Ranging - AutoRange and VisibleRange - SciChart https://www.scichart.com/documentation/win/current/Axis%20Ranging%20-%20AutoRange%20and%20VisibleRange.html
[6] Here - Axis Overview in SciChart.js | JavaScript Chart Documentation https://www.scichart.com/documentation/js/current/StartHere-AxisOverview.html
[7] Performance Tips & Tricks | JavaScript Chart Documentation https://www.scichart.com/documentation/js/current/Performance%20Tips.html
[8] How to mix AutoRange.Always and Zooming via Modifiers - SciChart https://www.scichart.com/questions/wpf/how-to-mix-autorange-always-and-zooming-via-modifiers
[9] VisibleRange when AutoRange is set to Always | WPF Chart Forums https://www.scichart.com/questions/wpf/visiblerange-when-autorange-is-set-to-always/answers?sort=votes
[10] Data Performance Tips | WPF Chart Documentation - SciChart https://www.scichart.com/documentation/win/current/Data%20Performance%20Tips.html
[11] Axis Ranging - Set Range and Zoom to Fit - SciChart https://www.scichart.com/documentation/js/current/Axis%20Ranging%20-%20Setting%20and%20Getting%20VisibleRange.html
[12] SciChart AutoRange not working properly for small values https://stackoverflow.com/questions/54685861/scichart-autorange-not-working-properly-for-small-values
[13] Preventing points from being cut-off on SciChart surface when using ... https://stackoverflow.com/questions/69046317/preventing-points-from-being-cut-off-on-scichart-surface-when-using-auto-range
[14] Ask Questions About Our Charting Libraries | SciChart Forums https://www.scichart.com/questions?p=7&sort=oldest
[15] Axis Ranging - Get or Set VisibleRange | SciChart Android ... https://www.scichart.com/documentation/android/current/articles/chart2d/axisAPIs/Axis%20Ranging%20-%20Get%20or%20Set%20VisibleRange.html
[16] Zooming in real time charts when AutoRange is enabled? - SciChart https://www.scichart.com/questions/wpf/zomming-in-real-time-charts
[17] How to improve Chart initialization speed | WPF Chart Forums https://www.scichart.com/questions/wpf/how-to-improve-chart-initialization-speed
