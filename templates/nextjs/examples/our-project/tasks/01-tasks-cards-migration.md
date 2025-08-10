# Tasks — cards-migration

### Guardrails / Pre-flight
- [.] Confirm work is performed only under `templates/nextjs/`; do not modify `landing/`
  - [.] Success: `git status` shows changes only under `templates/nextjs/`
- [.] Ensure root/template build scripts are present and run
  - [.] Run: `pnpm -C templates/nextjs ai-typecheck && pnpm -C templates/nextjs lint && pnpm -C templates/nextjs build`
  - [.] Success: no type or build errors; lints pass (warnings allowed)

### Types and content definitions
- [.] Add `ArticleContent` type
  - [.] Fields: `title`, `subtitle?`, `description`, `image`, `href`, `variant?`
  - [.] Success: `src/types/content.ts` exports `ArticleContent`; typecheck passes
- [.] Extend `ProjectContent`
  - [.] Add optional `image?` and `displayVariant?: 'showcase'`
  - [.] Success: `ProjectContent` extended; no breaking changes
- [.] Add `AboutContent` and `SocialLink` types
  - [.] `AboutContent`: `title`, `description?`, `avatar?`, `socials?: SocialLink[]`; body via `contentHtml`
  - [.] `SocialLink`: { platform: 'github' | 'linkedin' | 'x' | 'twitter' | 'mail'; url: string }
  - [.] Success: types exported; typecheck passes
- [.] Ensure `TechnologiesContent` type exists (no changes unless missing)
  - [.] Success: available for `TechnologyScroller` usage

### Content (markdown) – samples and tokens
- [.] Create `src/content/main-grid/featured-article-sample.md` with `ArticleContent` frontmatter
  - [.] Use tokens where reasonable; include absolute/fallback image path
  - [.] Success: file loads via content loader without errors
- [.] Create/ensure `src/content/main-grid/technologies.md` exists with `TechnologiesContent`
  - [.] Ensure icons referenced exist under `public/assets/icons/tech/`
  - [.] Success: `TechnologyScroller` renders items from file
- [.] Create `src/content/intro/about.md` with `AboutContent` frontmatter and body
  - [.] Include `socials` sample entries; use tokens for emails/site
  - [.] Success: About content loads and renders
- [.] Create `src/content/projects/sample-project.md` with extended `ProjectContent`
  - [.] Include `displayVariant` and optional `image` for showcase
  - [.] Success: Loads; renders both variants via loader

### Components – presentational (pure UI)
- [.] Create `src/components/cards/articles/ArticleCard.tsx`
  - [.] Map props to `ArticleContent`; full-bleed image, gradient overlay, subtitle, title, description, link
  - [.] Success: visually correct with sample content
- [.] Create `src/components/cards/articles/BlogIndexCard.tsx`
  - [.] Props: `postLimit=3`, `excludeSlugs?`, `className?`
  - [.] Success: lists recent posts; links to `/blog`
- [.] Create `src/components/cards/projects/ProjectCard.tsx`
  - [.] Props: `title`, `description?`, `techStack?`, `features?`, `image?`, `repoUrl?`, `demoUrl?`, `ctaPrimary?`, `ctaSecondary?`, `mode?`, `variant?`, `overlayClassName?`, `className?`
  - [.] Default layout (no variant) = panel; `variant='showcase'` = image-top
  - [.] Success: parity with both existing layouts
- [.] Create `src/components/cards/people/AboutCard.tsx`
  - [.] Props: title/desc/avatar/socials + `contentHtml` body (strip h1/h2)
  - [.] Success: renders avatar, text, body, and social icons

### Components – ContentLoaders (markdown-driven)
- [.] `src/components/cards/articles/ArticleCardContentLoader.tsx`
  - [.] Props: `slug` (contentType=`'main-grid'`), `className?`
  - [.] Success: renders sample file without errors
- [.] `src/components/cards/projects/ProjectCardContentLoader.tsx`
  - [.] Props: `slug` (contentType=`'projects'`), `className?`
  - [.] Success: renders both panel and showcase using sample project file
- [.] `src/components/cards/people/AboutCardContentLoader.tsx`
  - [.] Props: `slug='about'` (contentType=`'intro'`), `className?`
  - [.] Success: renders about page card correctly

### Migrations & cleanup (names/structure)
- [ ] Replace internal usages of `ProjectFeatureCard` with `projects/ProjectCard` (default panel)
  - [ ] Success: build succeeds; visuals unchanged where used
- [ ] Replace usages of `ProjectSpotlightCard` with `projects/ProjectCard` variant='showcase'
  - [ ] Success: visuals match original Spotlight layout
- [ ] Remove `src/components/cards/ProjectFeatureCard.tsx` and update exports/imports
  - [ ] Success: no references remain; build passes
- [ ] Do not add a `TechnologiesCard`; document `BaseCard + TechnologyScroller` composition
  - [ ] Success: README updated

### Documentation & examples
- [ ] Update `templates/nextjs/readme.md`
  - [ ] Add “Portfolio Cards” section with quick usage
  - [ ] Success: clear, concise, copy-pasteable snippets
- [ ] (Optional) Add `/examples/portfolio/` page to showcase cards
  - [ ] Success: page renders with sample content

### QA & verification
- [ ] Lint, typecheck, and build at template root
  - [ ] Run: `pnpm -C templates/nextjs ai-typecheck && pnpm -C templates/nextjs lint && pnpm -C templates/nextjs build`
  - [ ] Success: green
- [ ] Visual parity check
  - [ ] Compare new `ProjectCard` panel vs old `ProjectFeatureCard`
  - [ ] Compare new `ProjectCard` showcase vs Spotlight layout
  - [ ] Success: parity achieved
- [ ] Accessibility
  - [ ] Verify alt text, focus states, keyboard nav on links/CTAs
  - [ ] Success: no a11y regressions in cards
