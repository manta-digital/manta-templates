# Project: erikcorkran
# Section: Content Management System
# Goal: Support markdown-driven content with frontmatter metadata and ensure proper styling with Tailwind v4 and NextJS 15
- [x] Create `src/content/blog` directory
# Project: erikcorkran
# Section: Content Management System
# Goal: Support markdown-driven content with frontmatter metadata and ensure proper styling with Tailwind v4 and NextJS 15

### 1. Project Setup and Configuration
- [x] **Ensure Tailwind CSS v4 Configuration**
  - [x] Verify `postcss.config.mjs` exists and is correctly configured for Tailwind CSS v4.
    - Ref: [project-documents/tool-guides/tailwindcss/introduction.md](cci:7://file:///Users/manta/source/repos/manta/erikcorkran/project-documents/tool-guides/tailwindcss/introduction.md:0:0-0:0) (Next.js setup)
    - Ref: `project-documents/tool-guides/tailwindcss/guide.tailwindcss.v4.md`
    - Code:
      ```javascript
      // postcss.config.mjs
      export default {
        plugins: {
          '@tailwindcss/postcss': {},
        },
      };
      ```
  - [x] Confirm `src/app/globals.css` uses `@import "tailwindcss";` and any necessary `@plugin` directives. Remove old `@tailwind base/components/utilities`.
    - Ref: `project-documents/tool-guides/tailwindcss/guide.tailwindcss.v4.md` (CSS-First Configuration)
    - Code:
      ```css
      @import "tailwindcss";
      /* @plugin "@tailwindcss/typography"; */ /* Add if typography plugin is used */
      /* Add custom theme variables if not already present, per guide.themes.v4.md */
      ```
  - [x] Delete `tailwind.config.js` if all configurations have been moved to CSS (as per Tailwind v4 best practices). If custom themes or extensive customizations are needed, ensure `@config "./tailwind.config.js";` is at the top of `globals.css`.
    - Ref: `project-documents/tool-guides/tailwindcss/guide.tailwindcss.v4.md`
  - [x] Success: Tailwind CSS v4 is correctly configured and basic styles are applying.

- [x] **Install Markdown Processing Dependencies**
  - [x] Install `gray-matter`, `remark`, `remark-html`, and `remark-gfm` using npm.
    - Ref: `project-documents/framework-guides/nextjs/guide.markdown.md` (Minimal Setup Steps)
    - Command:
      ```bash
      npm install gray-matter remark remark-html remark-gfm
      ```
  - [x] Verify packages are added to `package.json`.
  - [x] Success: All necessary markdown processing packages are installed and listed in `package.json`.

### 2. Content Structure and Sample
- [x] **Create Content Directory and Sample Post**
  - [x] Ensure `src/content/blog` directory exists.
  - [x] Create a sample markdown file: `src/content/blog/sample-post.md`.
  - [x] Add frontmatter to `sample-post.md` including `title`, `description`, `image`, `pubDate`, `contentType`, and `cardSize`.
    - Example Frontmatter:
      ```yaml
      ---
      title: My Sample Blog Post
      description: A brief description of this sample post.
      image: /images/sample-image.jpg # Placeholder, ensure image exists or is added
      pubDate: 2025-05-10
      contentType: blog
      cardSize: medium 
      tags: # Optional, as per guide.markdown.md
        - nextjs
        - markdown
      ---
      This is the main content of the sample blog post.
      It can include various markdown elements like headings, lists, and links.
      ```
  - [x] Success: `sample-post.md` is created with valid frontmatter and basic content.

- [x] **Review `src/content/config.ts`**
  - [x] Evaluate if `src/content/config.ts` (if it exists from previous attempts) is still necessary with the simplified `gray-matter` and `remark` approach.
  - [x] If not needed, remove or comment out its contents to avoid conflicts.
  - [x] Success: `src/content/config.ts` is handled appropriately for the new approach.

### 3. Markdown Processing Logic
- [x] **Develop Markdown Utility Functions in `src/lib/content.ts`**
  - [x] Uncomment and complete the implementation of functions to:
    - List all blog post slugs/IDs.
    - Get sorted post data (slugs + frontmatter) for listing/index pages.
    - Get individual post data (frontmatter + HTML content) by slug.
  - [x] Use `fs` and `path` to read markdown files from `src/content/blog`.
  - [x] Use `gray-matter` to parse frontmatter.
  - [x] Use `remark().use(html).use(gfm).process(matterResult.content)` to convert markdown to HTML, including GFM features.
    - Ref: `project-documents/framework-guides/nextjs/guide.markdown.md` (Read and parse markdown)
    - Ensure proper `async/await` usage for `process`.
  - [x] Define a clear TypeScript interface for Post data (e.g., `PostData` with `slug`, `contentHtml`, and all frontmatter fields).
  - [x] Success: `src/lib/content.ts` can successfully read, parse, and convert markdown files, providing structured data and HTML content.

### 4. Dynamic Page Rendering
- [x] **Implement Dynamic Blog Post Page `src/app/blog/[slug]/page.tsx`**
  - [x] Uncomment and complete the `Page` component.
  - [x] Implement `generateStaticParams` to pre-render all blog posts based on slugs from `src/lib/content.ts`.
  - [x] In the `Page` component, fetch individual post data (including `contentHtml` and frontmatter) using the utility from `src/lib/content.ts`.
  - [x] Render the post title, frontmatter (e.g., date, description), and the HTML content using `dangerouslySetInnerHTML={{ __html: postData.contentHtml }}`.
    - Ref: `project-documents/framework-guides/nextjs/guide.markdown.md` (Render your post)
  - [x] Ensure the component is a Server Component (default in App Router unless "use client" is specified).
  - [x] Add basic error handling if a post is not found.
  - [x] Success: Individual blog posts render correctly at `/blog/[slug]` URLs.

### 5. Styling Markdown Content
- [x] **Apply Tailwind CSS v4 Styles for Markdown Elements**
  - [x] In `src/app/globals.css` (or a dedicated imported CSS file), add styles for common markdown elements.
  - [x] If using `@tailwindcss/typography`, ensure it's configured and applied correctly (e.g., by adding a `prose` class to the markdown container).
    - Note: Check Tailwind v4 compatibility for the typography plugin if used. The guide `project-documents/tool-guides/tailwindcss/guide.tailwindcss.v4.md` mentions `@plugin "@tailwindcss/typography";` in `globals.css`.
  - [x] Success: Rendered markdown content is well-styled and readable, matching the project's aesthetic.

### 6. Validation and Testing
- [x] **Validate Sample Post Rendering**
  - [x] Navigate to `/blog/sample-post`.
  - [x] Verify that the title, description, image (if one was added and linked), publication date, content type, and card size from the frontmatter are displayed correctly (this might require specific JSX in `page.tsx` to render these fields).
  - [x] Confirm all markdown elements in `sample-post.md` (headings, lists, links, etc.) are styled as expected.
  - [x] Cross-reference with the visual quality of the previous Astro site, aiming for a similar or improved presentation.
  - [x] Test responsiveness of the styled markdown content.
  - [x] Success: The sample post at `/blog/sample-post` renders correctly with all data and styles.

### 7. Project Maintenance and Documentation
- [x] **Run Build and Lint Checks**
  - [x] Execute `pnpm lint` to check for any code style issues. Address any errors.
  - [x] Execute `pnpm build` to ensure the project builds without errors.
  - [x] Run `pnpm tsc --noEmit` to check for TypeScript errors.
  - [x] Log any warnings encountered during the build to `/project-documents/maintenance/maintenance-tasks.md`.
  - [x] Success: Project lints, type-checks, and builds successfully.

- [x] **Update Project Documentation**
  - [x] Document the process for adding new markdown content in a relevant README or project document.
    - Include details on frontmatter structure (required and optional fields).
    - Provide guidelines or examples for styling custom elements if any.
  - [x] Success: Documentation for content creation is clear and up-to-date.

### 8. Final Steps (as per user_rules)
- [x] **Create Memory**
  - [x] Create a memory summarizing the key changes and decisions made during this markdown implementation.
- [x] **Update `.windsurf-updates`**
  - [x] Add a one-sentence summary of the changes to the `.windsurf-updates` file in markdown format after task completion and verification.
- [x] **Commit Changes to Git**
  - [x] Stage all changes: `git add .`
  - [x] Commit with a semantic message: `git commit -m "feat: implement markdown content processing and rendering"`
  - [x] Success: All changes are committed to the local repository.