# Section: examples-update

## Goal: Replicate Blog Layout from Image using Existing Layout Components

Recreate the blog page layout found in `app/examples/blog/page.tsx` to match the provided reference images. This involves leveraging and modifying the existing `BentoLayout` and `GridItem` components to support the required flexibility, then using them to implement a responsive bento-style layout with Tailwind CSS v4. Specific attention should be paid to responsive behaviors, such as the "About Me" card influencing sibling card heights.

---

### Phase 1: Prerequisite Layout Component Modifications

- [x] **Modify `BentoLayout` for Dynamic Row Heights**
    - Open `src/components/layouts/bento-layout.tsx`.
    - Change the default value of the `rowHeight` prop from `'6rem'` to `'minmax(6rem, auto)'`.
    - This will allow rows in the `GridContainer` (used by `BentoLayout`) to have a minimum height but also grow with content or explicit `rowSpan` values from `GridItem`s.
    - Verify that `GridContainer`'s `rowHeight` prop correctly sets `grid-auto-rows`.
    - Success: `BentoLayout` now defaults to a flexible row height with a minimum of `6rem`.

- [x] **Refactor `GridItem` for Enhanced Span Flexibility**
    - Open `src/components/layouts/grid-layout/grid-item.tsx`.
    - Keep the existing `size?: GridItemSize` prop and its associated logic for predefined responsive spans.
    - Add new optional props:
        - `colSpan?: string | Record<string, string>` (e.g., `colSpan="col-span-2"` or `colSpan={{ base: "col-span-full", md: "col-span-2" }}`)
        - `rowSpan?: string | Record<string, string>` (e.g., `rowSpan="row-span-3"` or `rowSpan={{ md: "row-span-4" }}`)
    - Update the component's logic: When generating Tailwind classes for column or row spans, if the corresponding `colSpan` or `rowSpan` prop is provided, use its value(s). Otherwise, fall back to the spans derived from the `size` prop.
    - The `colSpan` and `rowSpan` props should accept a single string (Tailwind class) or an object where keys are breakpoint prefixes (e.g., 'base', 'sm', 'md', 'lg') and values are the Tailwind span classes for that breakpoint.
    - Ensure the component correctly merges these explicit span classes with other classes (like base styling and `className` prop).
    - Success: `GridItem` now supports both predefined `size`s and custom, responsive `colSpan` and `rowSpan` props, with the latter taking precedence.

---

### Phase 2: Implement Blog Example Page (`app/examples/blog/page.tsx`)

- [x] **Analyze Reference Images and Define Layout Structure with New Component Props**
    - Re-evaluate the reference images, identifying all distinct visual components and their content.
    - Determine the `colSpan` and `rowSpan` values (as responsive objects or strings) needed for each `GridItem` to replicate the layout at different breakpoints.
    - Map out how the `BentoLayout` (with its default `columns='grid-cols-6'`) will be used. Consider if `BentoLayout`'s `columns` prop needs to be adjusted for this specific page (e.g., to achieve an effective 3 or 4 column appearance within the 6-column base grid by using appropriate `GridItem` spans).
    - Document the responsive behavior, especially how the "About Me" card's `rowSpan` will influence the height of items in the same row.
    - Success: A clear mapping of page elements to `GridItem` components with their intended `size`, `colSpan`, and `rowSpan` props is documented.

- [x] **Setup Basic Page Structure for `app/examples/blog/page.tsx`**
    - Clear any existing layout content in `app/examples/blog/page.tsx` if it's not a suitable base.
    - Import `BentoLayout` and `GridItem`.
    - Ensure `globals.css` (with Tailwind v4 `@import "tailwindcss";`) is correctly imported in the root layout.
    - Success: `app/examples/blog/page.tsx` is ready for the `BentoLayout` implementation.

- [x] **Implement Main Blog Layout using `BentoLayout` and `GridItem`**
    - Add a `<BentoLayout>` component to `app/examples/blog/page.tsx`.
    - If the default 6-column grid of `BentoLayout` is not ideal for the visual target (e.g., if you want an effective 3-column layout), you might need to use `GridItem`s that span 2 base columns each, or adjust the `columns` prop of `BentoLayout` if that's deemed simpler.
    - Success: `BentoLayout` is instantiated on the page.

- [ ] **Create and Place the "Erik Corkran — Blog" Header Card**
    - Inside `BentoLayout`, add a `GridItem` for the header.
    - Apply the necessary `colSpan` and `rowSpan` props to this `GridItem` (e.g., `colSpan={{ base: 'col-span-full', md: 'col-span-2' }}` if `BentoLayout` is `md:grid-cols-3` effective, or `colSpan='col-span-X'` based on `BentoLayout`'s actual columns prop).
    - Style the content within the `GridItem` (blueish-purple background, text) using Tailwind utility classes.
    - Success: The header card is correctly sized, positioned, and styled within the `BentoLayout`.

- [ ] **Create and Place the "About Me" Card**
    - Add a `GridItem` for the "About Me" section.
    - Apply appropriate `colSpan` and `rowSpan` props to achieve the tall, sidebar-like appearance (e.g., `rowSpan='md:row-span-3'`).
    - Style the content (dark background, text, social media icons using `lucide-react`).
    - Success: The "About Me" card is correctly sized (especially its height via `rowSpan`), positioned, and styled.

- [ ] **Create a Reusable "Blog Post" Card Structure (Inside `GridItem`)**
    - For each blog post preview, add a `GridItem`.
    - Apply necessary `colSpan` and `rowSpan` props to each `GridItem` to match the layout.
    - Inside each `GridItem`, structure the content for a blog post card (background image, overlay, title, description).
    - This structure can be a simple div structure with Tailwind classes, or a separate functional component if preferred for cleanliness, but the `GridItem` is the direct child of `BentoLayout`.
    - Use placeholder content for now.
    - Success: Blog post previews are structured within `GridItem`s and placed in the layout.

- [ ] **Populate Layout with All Blog Post Cards**
    - Instantiate all required blog post `GridItem`s with their respective `colSpan`, `rowSpan`, and placeholder content to match the reference images.
    - Ensure the order and placement match the visual target.
    - Success: The blog example page is populated with all styled blog post cards.

- [ ] **Implement and Verify Responsive Behavior**
    - Test the layout at various screen widths.
    - Confirm that `colSpan` and `rowSpan` props on `GridItem`s produce the correct responsive changes.
    - Specifically verify that the "About Me" card's height (due to its content and `rowSpan`) correctly influences the overall height of its visual row, and other items adjust as seen in the narrower screenshot, thanks to `BentoLayout`'s `rowHeight='minmax(6rem, auto)'`.
    - Success: The layout is fully responsive and matches the behavior shown in the reference images.

- [ ] **Review and Refine Styling**
    - Compare the implemented page with the reference images closely.
    - Adjust paddings, margins, font sizes, colors, rounded corners, and shadows on the content *within* `GridItem`s.
    - Ensure `GridItem`'s default border and padding are acceptable or overridden via its `className` prop if necessary.
    - Validate that only Tailwind CSS v4 classes and patterns are used.
    - Success: The final implementation is visually a very close match to the provided images.

- [ ] **Verify No Tailwind v3 Specific Code**
    - Manually review all Tailwind classes used.
    - Refer to Tailwind v4 documentation to confirm v4 compatibility.
    - Success: The codebase for this example page uses only Tailwind v4 compatible classes.
