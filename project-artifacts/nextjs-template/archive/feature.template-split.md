# Template Split

## Goal
Split the landing page from the NextJS template starter. Currently the template starter includes considerable content from the landing page, which is not ideal for a template starter. We want to keep anything general purpose, and provide the user with a clean starting point for their project. Additionally we want to keep the landing page as is, and keep it in the monorepo.

## Technical Considerations and Procedure
1. Our page.tsx needs to display server-side markdown-driven content in our cards.  It also needs to be themed, which is generally a 'use client' thing.  We are using app router, so we need to straighten this out and make it work.  Ideally we will not have to use build-time processing of the markdown into json, but we can do that if necessary.

Right now the templates are unusable for content generation as we are relying on json files in src/data that we have no way to dynamically build.  If we have to build-time process this is where they should go.  It seems like this must be a solved problem and we don't need to build-time process this.

I don't want to add a bunch of unnecessary containers or other clutter to the template starter.  I want to keep it as simple as possible.

2. We should also update pnpm scripts to be able to pnpm install and pnpm build at manta-templates level, so we can take advantage of any shared loading or hoisting.

### Summary:
1. Display server-side markdown-driven content in a page.tsx component that also supports themes.  This should be a solved problem.
2. Ensure that you are using tailwindcss4.  I don't want to see any tailwind.config.ts (or .js) suggested.
3. Landing will be split from template by deploying the template into a temporary 'landing' area, then copying that into the project at manta-templates/landing/.  There should be no 'shared' components or third directory.  Landing is created from template.  I will do this part and drop it in.  I need you to make any workspace updates needed to enable it to function.

Present the entire design first before changing any code.


