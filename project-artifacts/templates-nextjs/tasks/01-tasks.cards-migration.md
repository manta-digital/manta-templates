# Tasks — cards-migration

### Guardrails / Pre-flight
- [x] Confirm work is performed only under `templates/nextjs/`; do not modify `landing/`
  - [x] Success: `git status` shows changes only under `templates/nextjs/`
- [x] Ensure root/template build scripts are present and run
  - [x] Run: `pnpm -C templates/nextjs ai-typecheck && pnpm -C templates/nextjs lint && pnpm -C templates/nextjs build`
  - [x] Success: no type or build errors; lints pass (warnings allowed)

### Types and content definitions
- [x] Add `ArticleContent` type
  - [x] Fields: `title`, `subtitle?`, `description`, `image`, `href`, `variant?`
  - [x] Success: `src/types/content.ts` exports `ArticleContent`; typecheck passes
- [x] Extend `ProjectContent`
  - [x] Add optional `image?` and `displayVariant?: 'showcase'`
  - [x] Success: `ProjectContent` extended; no breaking changes
- [x] Add `AboutContent` and `SocialLink` types
  - [x] `AboutContent`: `title`, `description?`, `avatar?`, `socials?: SocialLink[]`; body via `contentHtml`
  - [x] `SocialLink`: { platform: 'github' | 'linkedin' | 'x' | 'twitter' | 'mail'; url: string }
  - [x] Success: types exported; typecheck passes
- [x] Ensure `TechnologiesContent` type exists (no changes unless missing)
  - [x] Success: available for `TechnologyScroller` usage

### Content (markdown) – samples and tokens
- [x] Create `src/content/main-grid/featured-article-sample.md` with `ArticleContent` frontmatter
  - [x] Use tokens where reasonable; include absolute/fallback image path
  - [x] Success: file loads via content loader without errors
- [x] Create/ensure `src/content/main-grid/technologies.md` exists with `TechnologiesContent`
  - [x] Ensure icons referenced exist under `public/assets/icons/tech/`
  - [x] Success: `TechnologyScroller` renders items from file
- [x] Create `src/content/intro/about.md` with `AboutContent` frontmatter and body
  - [x] Include `socials` sample entries; use tokens for emails/site
  - [x] Success: About content loads and renders
- [x] Create `src/content/projects/sample-project.md` with extended `ProjectContent`
  - [x] Include `displayVariant` and optional `image` for showcase
  - [x] Success: Loads; renders both variants via loader

### Components – presentational (pure UI)
- [x] Create `src/components/cards/articles/ArticleCard.tsx`
  - [x] Map props to `ArticleContent`; full-bleed image, gradient overlay, subtitle, title, description, link
  - [x] Success: visually correct with sample content
- [x] Create `src/components/cards/articles/BlogIndexCard.tsx`
  - [x] Props: `postLimit=3`, `excludeSlugs?`, `className?`
  - [x] Success: lists recent posts; links to `/blog`
- [x] Create `src/components/cards/projects/ProjectCard.tsx`
  - [x] Props: `title`, `description?`, `techStack?`, `features?`, `image?`, `repoUrl?`, `demoUrl?`, `ctaPrimary?`, `ctaSecondary?`, `mode?`, `variant?`, `overlayClassName?`, `className?`
  - [x] Default layout (no variant) = panel; `variant='showcase'` = image-top
  - [x] Success: parity with both existing layouts
- [x] Create `src/components/cards/people/AboutCard.tsx`
  - [x] Props: title/desc/avatar/socials + `contentHtml` body (strip h1/h2)
  - [x] Success: renders avatar, text, body, and social icons

### Components – ContentLoaders (markdown-driven)
- [x] `src/components/cards/articles/ArticleCardContentLoader.tsx`
  - [x] Props: `slug` (contentType=`'main-grid'`), `className?`
  - [x] Success: renders sample file without errors
- [x] `src/components/cards/projects/ProjectCardContentLoader.tsx`
  - [x] Props: `slug` (contentType=`'projects'`), `className?`
  - [x] Success: renders both panel and showcase using sample project file
- [x] `src/components/cards/people/AboutCardContentLoader.tsx`
  - [x] Props: `slug='about'` (contentType=`'intro'`), `className?`
  - [x] Success: renders about page card correctly

### Migrations & cleanup (names/structure)
- [x] Replace internal usages of `ProjectFeatureCard` with `projects/ProjectCard` (default panel)
  - [x] Success: build succeeds; visuals unchanged where used
- [x] Replace usages of `ProjectSpotlightCard` with `projects/ProjectCard` variant='showcase'
  - [x] Success: visuals match original Spotlight layout
- [x] Remove `src/components/cards/ProjectFeatureCard.tsx` and update exports/imports
  - [x] Success: no references remain; build passes
- [x] Do not add a `TechnologiesCard`; document `BaseCard + TechnologyScroller` composition
  - [x] Success: README updated

### Documentation & examples
- [x] Update `templates/nextjs/readme.md`
  - [x] Add “Portfolio Cards” section with quick usage
  - [x] Success: clear, concise, copy-pasteable snippets
- [x] (Optional) Add `/examples/portfolio/` page to showcase cards
  - [x] Success: page renders with sample content

### QA & verification
- [x] Lint, typecheck, and build at template root
  - [x] Run: `pnpm -C templates/nextjs ai-typecheck && pnpm -C templates/nextjs lint && pnpm -C templates/nextjs build`
  - [x] Success: green
- [x] Visual parity check
  - [x] Compare new `ProjectCard` panel vs old `ProjectFeatureCard`
  - [x] Compare new `ProjectCard` showcase vs Spotlight layout
  - [x] Success: parity achieved
- [x] Accessibility
  - [x] Verify alt text, focus states, keyboard nav on links/CTAs
  - [x] Success: no a11y regressions in cards
