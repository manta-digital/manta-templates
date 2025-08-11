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
- [x] Add cosine surface card from provided source
- [x] Refactor and reorganize parameters to improve usability

## cosine-card-terrain
- [ ] Analyze the provided source and see how we might integrate the parameteric behavior
- [ ] Determine if the new source provides any additional terrain calculation features
- [ ] Examine viability and best method of adding control panel (design task)
- [ ] Panel should be accessed by a small gear icon or similar.  Don't display it all the time.
- [ ] Consider how to respond to changes in controls (refresh, smoothly adapt to new parameters, etc).  Use feature.cosine-live-update as additional background in evaluating this task.

---

Notes:
- Technologies marquee: use `BaseCard` + `TechnologyScroller` directly; no dedicated wrapper.
- All tasks apply under monorepo mode—operate only inside `templates/nextjs/`.
