# 03 – Tasks (manta-templates)
Sections are in L2 headings (ex: cards-migration).

## cards-migration
Design source: `templates/nextjs/examples/our-project/feature.cards-migration.md`
Scope: Integrate reusable, markdown-driven cards into `templates/nextjs/src/components/cards/` with clear functional subfolders and ContentLoader wrappers. Do not modify `landing/`.

### Overview (completed)
- [x] Types added/extended: `ArticleContent`, `ProjectContent (displayVariant, image)`, `AboutContent`, `SocialLink`, `TechnologiesContent`
- [x] Sample content added: featured article, technologies, about, sample project
- [x] Presentational components: `ArticleCard`, `BlogIndexCard`, `ProjectCard` (panel/showcase), `AboutCard`
- [x] ContentLoaders: `ArticleCardContentLoader`, `ProjectCardContentLoader`, `AboutCardContentLoader`
- [x] Migrations/cleanup: replaced legacy card usages; removed `ProjectFeatureCard`
- [x] Docs: README updated (cards section, header/footer variants, `/examples/cards`)
- [x] QA: build/lint/typecheck green; visual parity and a11y verified (note: one img warning intentionally ignored)

## cosine-card
- [ ] Receive new migration source for cosine-surface card.  It will consist of a React component and potentially several supporting files.
- [ ] Design method to integrate into our templates/nexjs/ template.  Confirm with Project Manager.  Consider this a mini-design.
- [ ] integrate the cosine surface face from the migration source.  no/minimal updates, just get this thing over here and working, with minimal disruptions.  we are going to do interesting stuff with it after that 

---

Notes:
- Technologies marquee: use `BaseCard` + `TechnologyScroller` directly; no dedicated wrapper.
- All tasks apply under monorepo mode—operate only inside `templates/nextjs/`.
