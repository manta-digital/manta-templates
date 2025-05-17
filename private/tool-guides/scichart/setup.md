
### Overview
If you have not consulted the introduction.md` for this tool (scichart), start there first.  If indicated and you are installing or configuring scichart in an application, this guide applies.   

#### Reference
Generate reference urls for SciChart-React.
https://demo.scichart.com/react
https://www.scichart.com/blog/how-to-make-charts-in-react/

One of the hurdles is getting the required .wasm files deployed correctly. General reference here but specific samples are provided later in this document.
https://www.scichart.com/documentation/js/current/webframe.html#Deploying%20Wasm%20or%20WebAssembly%20and%20Data%20Files%20with%20your%20app.html

##### Install Packages

The following core packages are required.

```shell
npm install scichart scichart-react
npm install copy-files-from-to --save-dev
```

After install, ensure that the following are present (package.json excerpt).

```json
"dependencies": {
	"scichart": "^3.5.744",
	"scichart-react": "^0.1.9"
},
"devDependencies": {
	"@eslint/config-array": "^0.20.0",
	"@eslint/object-schema": "^2.1.6",
	"@types/node": "^20",
	"@types/react": "^18",
	"@types/react-dom": "^18",
	"autoprefixer": "^10.0.1",
	"copy-files-from-to": "^3.12.1",
	"copy-webpack-plugin": "^13.0.0",
},
```

Additionally, add the following scripts to package.json if not present.

```json
  "scripts": {
    "copyWasm": "copy-files-from-to --config copy-files-from-to.json",
    "dev": "npm run copyWasm && next dev",
    "build": "npm run copyWasm && next build",
    "start": "next start"
  },
```

The following should be created as {project-root}/copy-files-from-to.json:

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

##### NextJS Config

This is a sample `next.config.js` for copying the SciChart files to the correct location. You'll find these files in the 'pack' folder that should be available to you, but you can also use the code blocks here.  Note that if TypeScript is in use (which it normally will be) the file will be present as `next.config.ts` instead of `next.config.js`.  If one is present, modify the existing file do not include both a `.ts` and a `.js` NextJS config in the same project.

NextJS config example 1:

```js
// next.config.js
webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
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

  // Important: return the modified config
  return config;
};
```

NextJS config example 2:

```js
// next.config.js
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
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

    // Important: return the modified config
    return config;
  },
};
```

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

You can use code similar to the following to create a basic chart.

```tsx
'use client';

import Head from 'next/head';
import { useEffect, useRef } from 'react';
import {
  SciChart3DSurface,
  SciChartSurface,
  ESeriesType,
  chartBuilder,
} from 'scichart';

// Tell scichart where to find the wasm files.  Even if you don't use the rest
// of thi example, you still need this part.
SciChartSurface.configure({
  wasmUrl: 'scichart2d.wasm',
  dataUrl: 'scichart2d.data',
});

// An example of WASM dependencies URLs configuration to fetch from origin server:
async function initSciChart(rootElement: string | HTMLDivElement) {
  const { sciChartSurface, wasmContext } = await chartBuilder.build2DChart(
    rootElement,
    {
      series: {
        type: ESeriesType.LineSeries,
        xyData: {
          xValues: [1, 2, 3, 4],
          yValues: [1, 4, 2, 6],
        },
      },
      // That's it! You just created your first SciChartSurface!
    },
  );

  return { sciChartSurface };
}

export default function Home() {
  const rootElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initPromise = initSciChart(rootElementRef.current as HTMLDivElement);

    return () => {
      initPromise.then(({ sciChartSurface }) => sciChartSurface.delete());
    };
  }, []);

  return (
    <div className="container">
      <Head>
        <title> SciChart NextJS Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">SciChart NextJS Example</h1>

        {/* root element for the chart */}
        <div ref={rootElementRef} style={{ width: 600, height: 400 }}></div>
      </main>
    </div>
  );
}
```

### Additional Information

### Additional Sample Code

#### JSON Builder API

###### ZoomPanModifier - JSON

```json
// Demonstrates how to configure the ZoomPanModifier in SciChart.js using the Builder API
const {
  chartBuilder,
  EThemeProviderType,
  EAxisType,
  EChart2DModifierType,
  EXyDirection
} = SciChart;

// or, for npm, import { chartBuilder, ... } from "scichart"
const { wasmContext, sciChartSurface } = await chartBuilder.build2DChart(divElementId, {
  surface: { theme: { type: EThemeProviderType.Dark } },
  xAxes: { type: EAxisType.NumericAxis },
  yAxes: { type: EAxisType.NumericAxis },
  modifiers: [{
    type: EChart2DModifierType.ZoomPan,
    options: {
      // Specifies Panning in X,Y direction or both
      xyDirection: EXyDirection.XyDirection,
      // Enables Pinch Zoom functionality
      enableZoom: true,
      // Optional parameters specify the amount of pinch zooming in X/Y  Default is 0.005
      horizontalGrowFactor: 0.005,
      verticalGrowFactor: 0.005
    }
  }]
});
```
