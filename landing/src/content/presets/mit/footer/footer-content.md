---
title: "Footer Content (MIT Pack)"
description: "Footer navigation, social links, and legal information"
type: "footer"
updated: "2025-08-01"
quickLinks:
  - label: "About"
    href: "/about"
  - label: "Blog"
    href: "/blog"
  - label: "Contact"
    href: "mailto:info@example.com"
    external: true
resources:
  - label: "Tools and Guides"
    href: "/guides"
  - label: "Examples"
    href: "/examples"
  - label: "Documentation"
    href: "/docs"
legal:
  - label: "Legal"
    href: "/legal"
socialProfessional:
  - label: "GitHub"
    href: "https://github.com/"
    external: true
  - label: "LinkedIn"
    href: "https://www.linkedin.com/"
    external: true
  - label: "X"
    href: "https://x.com/"
    external: true
socialCommunity:
  - label: "Hugging Face"
    href: "https://huggingface.co/"
    external: true
  - label: "Medium"
    href: "https://medium.com/"
    external: true
primaryContact:
  email: "info@example.com"
professionalContact:
  business: "business@example.com"
  support: "support@example.com"
copyright:
  notice: "© 2025 Manta Templates. MIT Licensed."
  attribution: "Built with <a href=\"https://nextjs.org\" target=\"_blank\" rel=\"noopener noreferrer\">Next.js</a>, <a href=\"https://tailwindcss.com\" target=\"_blank\" rel=\"noopener noreferrer\">Tailwind CSS</a>, and <a href=\"https://templates.manta.digital\" target=\"_blank\" rel=\"noopener noreferrer\">Manta Templates</a>."
  lastUpdated: "August 2025"
---

# Footer Content Configuration (YAML Format)

> Note: This pack is provided as a convenience for MIT-licensed sites/apps. It is not legal advice. Edit to suit your needs.

This footer content is now structured as YAML frontmatter, eliminating the need for complex HTML parsing. The structure directly matches the FooterSections interface expected by ui-core components.

## Key Features

- **Direct YAML structure**: No regex parsing needed
- **External link detection**: Links with `external: true` open in new tabs
- **Contact information**: Structured email contacts for different purposes  
- **Copyright with HTML**: Supports rich attribution text with links
- **MIT preset compatibility**: Designed for MIT-licensed projects

## Template Variables

If you need dynamic values, update these in `src/content/site.config.ts`:
- Author name: `siteConfig.author.name`
- Contact emails: `siteConfig.contacts.primaryEmail`, etc.
- Site domain: `siteConfig.site.domain`