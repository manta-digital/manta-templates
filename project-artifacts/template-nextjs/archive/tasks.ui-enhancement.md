# UI Enhancement Tasks

## Blog Post Page (`src/app/blog/[slug]/page.tsx`)

- [x] **Implement Image Zoom on Hover**
    - **Description**: Enhance the blog post image to subtly zoom in (scale up) on hover, contained within its rounded bounds.
    - **Implementation**: Use CSS transitions (`transition-transform`, `duration-300`) and Tailwind (`hover:scale-105`, `overflow-hidden` on parent).
    - **Acceptance**: Smooth zoom on hover; image stays within rounded borders; no layout impact; works light/dark mode.

- [x] **Implement Subtle Content Border with Hover Effect**
    - **Description**: Add a subtle, rounded border to the main `<article>` content area. On hover, the border color should change subtly.
    - **Implementation**: Use Tailwind (`border`, `border-slate-200 dark:border-slate-700`, `hover:border-slate-300 dark:hover:border-slate-600`, `rounded-lg`, `transition-colors`).
    - **Acceptance**: Subtle rounded border visible; border color changes smoothly on hover; enhances content definition; works light/dark mode; no negative layout impact.

- [x] **Implement Fade-In Animation for Blog Article Content**
    - **Description**: Add a subtle fade-in animation to the main blog article content (image and text) on load/visibility.
    - **Implementation**: Use Framer Motion (`motion.div`, `initial={{ opacity: 0 }}`, `animate={{ opacity: 1 }}`, `transition={{ duration: 0.5 }}`). Wrap `<article>` or main content children.
    - **Acceptance**: Content fades in smoothly on load; animation is quick and unobtrusive; no layout shifts post-animation; good performance.
