# 03 – Tasks (manta-templates)

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

---

Notes:
- Technologies marquee: use `BaseCard` + `TechnologyScroller` directly; no dedicated wrapper.
- All tasks apply under monorepo mode—operate only inside `templates/nextjs/`.
