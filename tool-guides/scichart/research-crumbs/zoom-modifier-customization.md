## How to Anchor Y-Axis Zoom at Center in SciChart React

**Goal:**  
You want the y-axis zoom (e.g., mouse wheel or pinch zoom) to always anchor at the vertical center of the chart, _not_ at the mouse pointer, similar to TradingView.

---

**Background:**  
By default, SciChart’s `MouseWheelZoomModifier` and similar zoom behaviors anchor the zoom to the mouse pointer position. There is no direct property to change this to always use the center for the y-axis in the standard modifiers[1][6].

---

**Implementation Approach:**

### 1. Custom ChartModifier

- SciChart allows you to extend or create custom ChartModifiers[6].
- You can override the zoom logic so that when zooming on the y-axis, the anchor point is always the center of the axis, regardless of mouse position.

**Key Steps:**

- Extend the `MouseWheelZoomModifier` (or relevant modifier).
- Override the event handler (e.g., `onMouseWheel`).
- For y-axis zoom, set the anchor point to the center of the viewport (not the mouse Y).
- Apply the zoom factor centered at this point.

**Example Skeleton (TypeScript/JS):**

```typescript
import {
  MouseWheelZoomModifier,
  ModifierKeys,
  SciChartSurface,
} from 'scichart';

class CenteredYZoomModifier extends MouseWheelZoomModifier {
  onMouseWheel(args) {
    // Only handle y-axis zoom
    if (this.isYAxisZoom(args)) {
      // Calculate center Y in pixel coordinates
      const centerY =
        this.parentSurface.seriesViewRect.top +
        this.parentSurface.seriesViewRect.height / 2;
      // Convert to data coordinates
      const centerYData = this.parentSurface.yAxes
        .get(0)
        .getCurrentCoordinateCalculator()
        .getDataValue(centerY);
      // Apply zoom with anchor at centerYData
      this.zoomYAxisAt(centerYData, args.delta);
      args.handled = true;
    } else {
      super.onMouseWheel(args);
    }
  }
  // Implement isYAxisZoom and zoomYAxisAt as needed
}
```

_Note: This is a conceptual outline. Your senior dev will need to adapt it to your app’s structure and SciChart’s API._

---

### 2. Modifier Configuration

- Add your custom modifier instead of the default `MouseWheelZoomModifier`:

```typescript
sciChartSurface.chartModifiers.add(new CenteredYZoomModifier());
```

---

### 3. Reference

- SciChart’s documentation shows how to add and extend ChartModifiers[6].
- The demo code shows how to add standard modifiers, which you’ll replace or extend[1].

---

**Summary Table**

| Feature            | Default SciChart Behavior | Desired/Custom Behavior      |
| ------------------ | ------------------------- | ---------------------------- |
| Y-Axis Zoom Anchor | Mouse pointer position    | Always chart vertical center |
| How to Achieve     | Standard modifiers        | Custom ChartModifier         |

---

**Hand-off Notes for Senior Dev:**

- Review and extend the `MouseWheelZoomModifier` to override anchor logic for y-axis zoom.
- Ensure only y-axis zoom is affected; x-axis can retain pointer anchoring if needed.
- Test with various chart sizes and axis configurations.

---

For more on custom modifiers:  
See SciChart docs on [adding and extending ChartModifiers][6].  
For reference on default modifier setup:  
See SciChart React demo code[1].[1][6]

Sources
[1] Zoom and Pan with React Chart multiple Modifiers | SciChart.js Demo https://demo.scichart.com/react/zoom-pan-multiple-modifiers
[2] Tutorial 01 - Setting up a project with scichart-react and config object https://www.scichart.com/documentation/js/current/TutorialSetupProjectWithSciChartReact.html
[3] Zoom and Pan a Realtime React Chart | SciChart.js Demo https://demo.scichart.com/react/zoom-pan-realtime-javascript-chart
[4] React Chart with Central Axes - SciChart.js Demo http://stagingdemo2.scichart.com/react/central-axes
[5] React Charts: Zoom - AG Grid https://www.ag-grid.com/charts/react/zoom/
[6] Tutorial 03 - Adding Zooming, Panning Behavior | JavaScript Chart ... https://www.scichart.com/documentation/js/current/Tutorial%2003%20-%20Adding%20Zooming,%20Panning%20Behavior.html
[7] Disable y-axis scaling when zooming with react-chartjs-2 https://stackoverflow.com/questions/75579329/disable-y-axis-scaling-when-zooming-with-react-chartjs-2
[8] Text Annotations and the Zoom Extents Modifier | WPF Chart Forums https://www.scichart.com/questions/wpf/text-annotations-and-the-zoom-extents-modifier/answers?sort=votes
