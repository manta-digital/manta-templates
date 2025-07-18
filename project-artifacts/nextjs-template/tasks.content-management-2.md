# Tasks: Content Management System Phase 2

## Phase 1: Foundation
- [x] Create content API
  - [x] Define `ContentType` enum in `src/lib/content-api.ts`
  - [x] Implement Zod schemas for Quote, Project, Video
  - [x] Write `getContentByType` generic function
  - [x] Export `getQuotes`, `getProjects`, `getVideos`
  - [x] Add content selection utilities: `getContentBySlug`, `getContentByTag`, `getFeaturedContent`
- [x] Setup content directories
  - [x] Create `src/content/quotes`, `src/content/projects`, `src/content/videos`, `src/content/features`, `src/content/demos`
- [x] Implement QuoteCard markdown support
  - [x] Update `QuoteCard.tsx` to accept `QuoteContent` prop and fallback to existing props
  - [x] Create `QuoteCardContainer.tsx` to fetch and render `QuoteCard`
  - Success criteria: ⚙️ `QuoteCard` renders markdown-driven content in storybook or browser
- [ ] Create content validation CLI
  - [ ] Add `scripts/validate-content.ts` per design
  - [ ] Ensure CLI logs validation status for each content type
- [ ] Write initial documentation
  - [ ] Update `feature.content-management-2.md` with phase summary and schemas
  - [ ] Document directory structure and usage examples

## Phase 2: Expansion
- [x] Migrate ProjectCard to markdown
  - [x] Update `ProjectCard.tsx` to accept `ProjectContent` prop
  - [x] Create `ProjectCardContainer.tsx`
  - [x] Add sample markdown `src/content/projects/sample-project.md`
  - Success criteria: 📦 `ProjectCard` displays data from markdown file
- [x] Implement VideoCard integration
  - [x] Modify `VideoCard.tsx` to support `displayMode` logic with `BackgroundVideo` & `VideoPlayer`
  - [x] Create `VideoCardContainer.tsx` for markdown-driven video content
  - [x] Add markdown samples: `src/content/videos/player-example.md`, `background-example.md`
  - [x] Update content API with `VideoContent` interface and functions
  - Success criteria: 🎥 `VideoCard` shows player and background modes correctly ✅
- [ ] Add development workflow enhancements
  - [ ] Update `next.config.js` to watch content directories for hot reload
  - Success criteria: 🔄 Editing markdown triggers UI update without full restart
- [ ] Extend testing coverage
  - [ ] Write unit tests for `getContentByType` in `__tests__/content-api.test.ts`
  - [ ] Add integration tests for `QuoteCard` and `VideoCard` in `__tests__/components`
- [ ] Implement homepage content management
  - [ ] Create `PageContent` interface for homepage sections
  - [ ] Add `src/content/pages/homepage.md` with hero and showcase sections
  - [ ] Update `page.tsx` to fetch and render content from markdown
  - [ ] Create `PageContentContainer` for page-level content management
  - Success criteria: 🏠 Homepage content is markdown-driven and editable

## Phase 3: Completion
- [x] Integrate FeatureCard variants
  - [x] Update `GuidesFeatureCard.tsx`, `ProjectFeatureCard.tsx`, `ComingSoonFeatureCard.tsx`, `FeatureCardWrapper.tsx` to use `FeatureContent`
  - [x] Add sample markdown in `src/content/features/guides`, `projects`, `coming-soon`
- [ ] Implement ThreeJSCard configuration
  - [ ] Extend `ThreeJSCard.tsx` to parse frontmatter for R3F scene parameters
  - [ ] Create example markdown `src/content/demos/threejs-example.md`
  - Success criteria: 🧩 `ThreeJSCard` renders R3F scene from markdown
- [ ] Develop content preview system
  - [ ] Build Next.js dev page `/dev/preview/[type]/[slug]` to render raw `contentHtml`
  - [ ] Enable live preview with hot-reload
- [ ] Finalize migration documentation
  - [ ] Write developer migration guide in `project-documents`
  - [ ] Publish content author guide with examples