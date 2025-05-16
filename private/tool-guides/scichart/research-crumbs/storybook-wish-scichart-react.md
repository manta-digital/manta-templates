## Overview

Provides information on how to test SciChart React customizations using Storybook.

## Introduction

Yes, it is both possible and practical to use Storybook to test SciChart React customizations, but there are important considerations and some limitations due to the nature of SciChart and how it interacts with the DOM and browser environment.

## How Storybook Fits with SciChart React

- **Component Isolation:** Storybook excels at rendering components in isolation, allowing you to develop, document, and visually test custom chart components or wrappers around SciChartReact[3][4][5].
- **Testing Customizations:** You can create stories for your customized SciChart components, passing different props, themes, or configuration objects to showcase and validate various states (e.g., different axis types, modifiers, or data sets)[1][4].
- **Interaction Testing:** Using Storybook’s `play` function and the `@storybook/addon-interactions`, you can simulate user interactions (like zooming or panning) and assert expected behaviors, similar to how you’d test other UI components[2][5].

## Practical Considerations

- **Browser Environment Required:** SciChartReact relies on WebAssembly and direct DOM access. Storybook runs in a real browser, so SciChart will work as intended, unlike some headless or JSDOM-based test environments.
- **Mocking Data:** For stories, you can mock or provide sample data to illustrate different chart scenarios without needing backend dependencies[1][4].
- **Manual and Automated Testing:** You can manually spot-check stories or automate tests using Storybook’s test runner, which can run interaction tests in CI environments using Playwright or Jest[3][4][5].

## Recommended Practices

- **Create Stories for Each Customization:** Write stories for each variant of your SciChart component (e.g., different axis configs, themes, modifiers). This makes it easy to visually check and share customizations[3][4][5].
- **Use the `play` Function for Interaction Tests:** Simulate user actions (like clicking zoom buttons or toggling chart features) and assert on the resulting chart state using Storybook’s `play` function and testing utilities[2][5].
- **Automate with Test Runner:** Use the Storybook test runner to automatically verify that your stories render without errors and that all interaction tests pass, both locally and in CI pipelines[4][5].
- **Leverage Decorators:** If your SciChart components depend on context providers (like themes or settings), use Storybook decorators to wrap stories with the necessary providers[2].

## Limitations and Challenges

- **Performance:** SciChart charts are heavier than most UI components, so rendering many complex charts in Storybook may impact performance.
- **Imperative API:** Some SciChart customizations require imperative setup (e.g., configuring axes synchronously). Ensure your stories initialize the chart correctly, possibly using the `initChart` pattern described in SciChart docs[1].
- **Visual Regression:** Storybook supports visual regression testing, but dynamic chart rendering (e.g., animations) may cause false positives unless you control or disable animations for test snapshots.

## Summary Table

| Feature                       | Supported with SciChart React in Storybook? | Notes                                          |
| ----------------------------- | :-----------------------------------------: | ---------------------------------------------- |
| Visual spot-checking          |                     Yes                     | Manual and automated via test runner           |
| Simulating user interactions  |                     Yes                     | Use `play` function and interaction addon      |
| Rendering with real data/mock |                     Yes                     | Mock data or use static samples                |
| Automated CI testing          |                     Yes                     | Use Storybook test runner with Playwright/Jest |
| Visual regression testing     |             Yes (with caveats)              | Control animations for reliable snapshots      |
| Headless/JSDOM testing        |                     No                      | SciChart requires real browser environment     |

## Conclusion

Storybook is well-suited for testing, documenting, and visually verifying SciChart React customizations when you follow best practices for synchronous chart initialization and leverage Storybook’s interaction testing features. It provides a practical workflow for both manual and automated testing of your custom chart components[2][3][4][5].

Sources
[1] Tutorial 01 - Setting up a project with scichart-react and config object https://www.scichart.com/documentation/js/current/TutorialSetupProjectWithSciChartReact.html
[2] Storybook Testing Overview https://sordyl.dev/blog/storybook-testing-overview/
[3] How to test UIs with Storybook | Storybook docs https://storybook.js.org/docs/writing-tests
[4] Storybook Testing: A Comprehensive Guide - LambdaTest https://www.lambdatest.com/blog/storybook-testing/
[5] Component tests | Storybook docs - JS.ORG https://storybook.js.org/docs/writing-tests/component-testing
[6] GitHub - ABTSoftware/scichart-react https://github.com/ABTSoftware/scichart-react
[7] React Charts with SciChart.js: Introducing “SciChart React” https://www.scichart.com/blog/react-charts-with-scichart-js/
[8] Aleksandr Smyshliaev - Senior Frontend Developer - LinkedIn https://ge.linkedin.com/in/asmyshlyaev177
[9] Julia Panfilova - Frontend Developer - iDWELL - LinkedIn https://rs.linkedin.com/in/julia-panfilova
[10] How to Make Charts in React from Scratch? - SciChart https://www.scichart.com/blog/how-to-make-charts-in-react/
[11] Create-react-app + SciChart unexpected behavior with effects #56 https://github.com/ABTSoftware/SciChart.JS.Examples/issues/56
[12] Why should I use storybook with React? - Stack Overflow https://stackoverflow.com/questions/59609407/why-should-i-use-storybook-with-react
[13] The role of storybook when testing of React application is conducted https://stackoverflow.com/questions/58587786/the-role-of-storybook-when-testing-of-react-application-is-conducted
[14] JavaScript Market Depth Chart | Chart Examples | SciChart.js https://www.scichart.com/example/javascript-chart/javascript-depth-chart/
[15] Zoom and Pan a Realtime React Chart | SciChart.js Demo https://demo.scichart.com/react/zoom-pan-realtime-javascript-chart
[16] Tutorial 01 - Setting up a project with scichart-react and config object https://www.scichart.com/documentation/js/current/TutorialSetupProjectWithSciChartReact.html
[17] ashusharmatech/scichart-react-demo - GitHub https://github.com/ashusharmatech/scichart-react-demo
[18] Test, manage & document components with Storybook JS https://hybridheroes.de/blog/2022-04-26-test-manage-document-components-with-storybook-js/
[19] Accessibility tests | Storybook docs - JS.ORG https://storybook.js.org/docs/9/writing-tests/accessibility-testing
[20] Creating a SciChart React Component from the Ground Up https://www.scichart.com/documentation/js/current/TutorialReusableReactComponent.html
[21] Using Storybook stories with Testing Library - YouTube https://www.youtube.com/watch?v=k6NG96awIJ0
[22] React Storybook Crash Course - YouTube https://www.youtube.com/watch?v=FUKpWgRyPlU
[23] 10 Storybook Best Practices - DEV Community https://dev.to/rafaelrozon/10-storybook-best-practices-5a97
