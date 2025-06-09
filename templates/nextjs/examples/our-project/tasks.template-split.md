# Tasks for Template Split

- [x] **Configure monorepo workspaces**
  - Add `templates/nextjs` and `landing` entries in root `pnpm-workspace.yaml`
  - Run `pnpm install` and verify no errors
  - Success: `pnpm --filter templates-nextjs dev` and `pnpm --filter landing dev` start respective servers

- [ ] **Set up `landing` project skeleton**
  - Create `landing/package.json` based on `templates/nextjs/package.json`, keeping all dependencies
  - Copy current `templates/nextjs/src/` directory into `landing/src/`
  - Configure `dev`, `build`, and `start` scripts in `landing/package.json`
  - Success: `pnpm --filter landing dev` launches the full landing page with demos

- [ ] **Clean up hardcoded content in template components**
  - Refactor `Footer` in `templates/nextjs/` to load branding from config/env
  - Remove manta-specific defaults in FeatureCard variants (ComingSoon, Guides)
  - Ensure all cards use `content` props with generic fallbacks
  - Success: Template shows generic defaults when no content provided

- [ ] **Create generic sample content for template**
  - Under `templates/nextjs/src/content`, replace current content with placeholder Markdown: blog, projects, quotes, features, videos
  - Use minimal frontmatter matching content schemas
  - Success: Template renders sample content cards with generic examples

- [ ] **Implement minimal template landing page**
  - Update `templates/nextjs/src/app/page.tsx` to show welcome message and sample content cards
  - Include links to documentation and theme toggle only
  - Success: Clean homepage with basic demo components, not overwhelming showcase

- [ ] **Configure environment-based branding**
  - Add `config.ts` or `.env` entries for site title, description, author
  - Update `templates/nextjs` Header, Footer, `<head>` metadata to use config
  - Success: Changing config updates site metadata and footer text

- [ ] **Update documentation and distribution**
  - Update `templates/nextjs/readme.md` with quick start for template starter
  - Create `landing/readme.md` describing landing page project and usage
  - Add `degit` command example in template README
  - Success: Clear docs guide users to use and customize both template and landing
