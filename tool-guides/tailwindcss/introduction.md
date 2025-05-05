## Tailwind CSS v4 Install & Setup Guide

Tailwind CSS v4 introduces a simplified, zero-config installation process. Below are concise, framework-specific setup instructions for the most common modern JavaScript frameworks.

---

## **General Installation Principles**

- No need for `tailwind.config.js` or `init` commands by default.
- Use the new `@import "tailwindcss";` directive in your CSS.
- For Vite-based projects, prefer the official `@tailwindcss/vite` plugin for optimal performance[1][5].

---

## **Next.js**
NextJS uses postcss for Tailwind.

1. **Install Dependencies**
   ```
   npm install -D tailwindcss @tailwindcss/postcss postcss
   ```
2. **Configure PostCSS**
   - Create `postcss.config.mjs` in your project root:
     ```js
     export default {
       plugins: {
         '@tailwindcss/postcss': {},
       },
     };
     ```
3. **Import Tailwind in Global CSS**
   - In your global stylesheet (e.g., `app/globals.css`):
     ```
     @import 'tailwindcss';
     ```
   - Import this stylesheet in your root layout (e.g., `app/layout.tsx`):
     ```js
     import './globals.css';
     ```
4. **Use Tailwind Classes**
   - Tailwind utility classes are now available throughout your app[2].

---

## **Vite (Vanilla, React, Vue, etc.)**

1. **Install Dependencies**
   ```
   npm install tailwindcss @tailwindcss/vite
   ```
2. **Configure Vite**
   - Edit `vite.config.js` or `vite.config.ts`:
     ```js
     import { defineConfig } from 'vite';
     import tailwindcss from '@tailwindcss/vite';

     export default defineConfig({
       plugins: [tailwindcss()],
     });
     ```
3. **Import Tailwind in CSS**
   - In your main CSS file (e.g., `src/style.css`):
     ```
     @import 'tailwindcss';
     ```
   - Ensure this CSS file is included in your project entry point[5][6].

---

## **Astro**

1. **Install Dependencies**
   ```
   npm install tailwindcss @tailwindcss/vite
   ```
2. **Configure Astro with Vite Plugin**
   - In `astro.config.mjs`:
     ```js
     import { defineConfig } from "astro/config";
     import tailwindcss from "@tailwindcss/vite";

     export default defineConfig({
       vite: {
         plugins: [tailwindcss()],
       },
     });
     ```
3. **Import Tailwind in CSS**
   - Create `src/tailwind.css`:
     ```
     @import "tailwindcss";
     ```
   - Import this CSS in your layout, e.g., in `src/layouts/BaseLayout.astro`:
     ```js
     import "../tailwind.css";
     ```
   - Reference this layout in your pages[3].

---

## **SvelteKit**

1. **Install Dependencies**
   ```
   npm install tailwindcss @tailwindcss/vite
   ```
2. **Configure Vite**
   - In `vite.config.js` or `vite.config.ts`:
     ```js
     import { sveltekit } from '@sveltejs/kit/vite';
     import { defineConfig } from 'vite';
     import tailwindcss from '@tailwindcss/vite';

     export default defineConfig({
       plugins: [tailwindcss(), sveltekit()],
     });
     ```
3. **Import Tailwind in CSS**
   - Create `src/app.css`:
     ```
     @import "tailwindcss";
     ```
   - Import `app.css` in your root layout (`src/routes/+layout.svelte`):
     ```svelte
     <script>
       import "../app.css";
     </script>
     <slot />
     ```
   - Tailwind classes are now available in your Svelte components[4].

---

## **Summary Table**

| Framework  | Install Command                                      | Config File(s)             | Import CSS Directive      | Plugin/Loader Config                 |
|------------|------------------------------------------------------|----------------------------|--------------------------|--------------------------------------|
| Next.js    | `npm install -D tailwindcss @tailwindcss/postcss postcss` | `postcss.config.mjs`       | `@import 'tailwindcss';` | `@tailwindcss/postcss` in PostCSS    |
| Vite       | `npm install tailwindcss @tailwindcss/vite`          | `vite.config.js/ts`        | `@import 'tailwindcss';` | `@tailwindcss/vite` plugin           |
| Astro      | `npm install tailwindcss @tailwindcss/vite`          | `astro.config.mjs`         | `@import 'tailwindcss';` | `@tailwindcss/vite` in Vite config   |
| SvelteKit  | `npm install tailwindcss @tailwindcss/vite`          | `vite.config.js/ts`        | `@import 'tailwindcss';` | `@tailwindcss/vite` in Vite config   |

---

You can now use Tailwind utility classes directly in your components. No `init` or manual config files are required for most use cases. For advanced configuration, refer to Tailwind's official documentation.

## Tailwind CSS Config
The file `tailwind.config.js` is no longer strictly required but is still supported for non-default situations.  You can continue using a `tailwind.config.js` file with Tailwind CSS v4 in Next.js if you need custom theme settings or other advanced configuration. While v4 encourages a "CSS-first" approach (using only the `@import "tailwindcss";` directive in your CSS and skipping config files for simple setups), the legacy JavaScript configuration is still fully supported for cases like yours[2][4][6].

**How to Use `tailwind.config.js` with Next.js and Tailwind v4:**

- **Keep your `tailwind.config.js`** as usual for custom theme, plugins, or variants.
- **Ensure your `postcss.config.mjs`** includes the Tailwind PostCSS plugin:
  ```js
  export default {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  };
  ```
- **Import Tailwind in your global CSS** (e.g., `app/globals.css`):
  ```
  @import "tailwindcss";
  ```
- **No need to run `tailwindcss init`** or generate a config file if you already have one.

**Important Note:**  
If you want Tailwind to pick up your custom config, you should explicitly reference it in your CSS using the `@config` directive at the very top of your main CSS file:
```
@config "./tailwind.config.js";
@import "tailwindcss";
```
This ensures Tailwind uses your configuration instead of the zero-config defaults[2].

**Summary:**  
- You can use both `postcss.config.mjs` and `tailwind.config.js` in Tailwind v4 with Next.js.
- For custom themes and advanced settings, keep your `tailwind.config.js` and reference it in your CSS using `@config`.
- For basic setups, you can omit the config file, but it’s optional-not required for your use case[2][4][6].

This approach is fully supported and recommended for projects that need customization beyond the default Tailwind setup.




Sources
[1] Tailwind CSS v4.0 https://tailwindcss.com/blog/tailwindcss-v4
[2] Styling: Tailwind CSS - Next.js https://nextjs.org/docs/app/building-your-application/styling/tailwind-css
[3] How to Use Tailwind CSS v4 in Astro - Dipankar Maikap https://dipankarmaikap.com/how-to-use-tailwind-css-v4-in-astro/
[4] Install Tailwind CSS with SvelteKit https://tailwindcss.com/docs/guides/sveltekit
[5] Installing Tailwind CSS with Vite https://tailwindcss.com/docs
[6] Install Tailwind CSS v4 in a Vue 3 + Vite Project - DEV Community https://dev.to/osalumense/install-tailwind-css-v4-in-a-vue-3-vite-project-319g
[7] Upgrade guide - Getting started - Tailwind CSS https://tailwindcss.com/docs/upgrade-guide
[8] How to setting Tailwind CSS v4 global class? - Stack Overflow https://stackoverflow.com/questions/79383758/how-to-setting-tailwind-css-v4-global-class
[9] Beginner tutorial for setting up tailwind v 4 using the standalone CLI ... https://github.com/tailwindlabs/tailwindcss/discussions/15855
[10] Tailwind CSS v4 Full Course 2025 | Master Tailwind in One Hour https://www.youtube.com/watch?v=6biMWgD6_JY
[11] How to install Tailwind CSS v4 to your React project - Tailkit https://tailkit.com/blog/how-to-install-tailwind-css-v4-to-your-react-project
[12] How can I setup tailwind.config.js with Angular & TailwindCSS v4 ... https://stackoverflow.com/questions/79450336/how-can-i-setup-tailwind-config-js-with-angular-tailwindcss-v4-application
[13] How to Upgrade Your Astro Site to Tailwind v4 - Brian Douglass https://bhdouglass.com/blog/how-to-upgrade-your-astro-site-to-tailwind-v4/
[14] Upgrading TailwindCSS to v4 in a Svelte + Vite Environment and ... https://blog.okaryo.studio/en/20250129-upgrade-tailwind-v4-svelte-vite/
[15] Tailwind V4 migration : r/nextjs - Reddit https://www.reddit.com/r/nextjs/comments/1ilo0o7/tailwind_v4_migration/
[16] Setting up Astro project with TailwindCSS V4 and daisyUI V5 https://dav.one/setting-up-astro-project-with-tailwindcss-and-daisyui/
[17] How to add tailwind 4 alpha to sveltekit 5? #13417 - GitHub https://github.com/tailwindlabs/tailwindcss/discussions/13417
[18] Support Tailwind CSS v4 in `npx create-next-app@latest - GitHub https://github.com/vercel/next.js/discussions/75320
[19] Install Tailwind CSS with Astro https://tailwindcss.com/docs/guides/astro
[20] How to install Tailwind CSS v4 to your Svelte project - Tailkit https://tailkit.com/blog/how-to-install-tailwind-css-v4-to-your-svelte-project
[21] Tailwind v4 - Shadcn UI https://ui.shadcn.com/docs/tailwind-v4
[22] astrojs/tailwind - Astro Docs https://docs.astro.build/en/guides/integrations-guide/tailwind/
[23] Tailwind CSS v4.0 released : r/sveltejs - Reddit https://www.reddit.com/r/sveltejs/comments/1i7qk52/tailwind_css_v40_released/
[24] How tf do I install tailwind. I'm a beginner and nothing is working https://www.reddit.com/r/astrojs/comments/1j4fe67/how_tf_do_i_install_tailwind_im_a_beginner_and/
[25] Tailwind CSS 4.0 is finally here - The NEW way to install with Vite + ... https://www.youtube.com/watch?v=sHnG8tIYMB4
[26] Getting started with Tailwind v4 - DEV Community https://dev.to/plainsailing/getting-started-with-tailwind-v4-3cip
[27] A Complete Guide to Installing Tailwind CSS 4 in Backend ... - Reddit https://www.reddit.com/r/tailwindcss/comments/1ittpy3/a_complete_guide_to_installing_tailwind_css_4_in/
[28] How to Set up Tailwind CSS V4 Project for Beginners from Scratch ... https://www.youtube.com/watch?v=Kh3xj-5nMqw
[29] A First Look at Setting Up Tailwind CSS v4.0 https://bryananthonio.com/blog/configuring-tailwind-css-v4/
[30] Tailwind CSS v4: Implement in Next.js & Upgrade from v3 - YouTube https://www.youtube.com/watch?v=obAB6nSVj1E
[31] Tailwind CSS v4.0 https://tailwindcss.com/blog/tailwindcss-v4
[32] How to set up Next.js 15 project with Tailwind CSS v4 - YouTube https://www.youtube.com/watch?v=Jol0vCitur4
[33] Setting Up (2025) Next.js 15 with ShadCN & Tailwind CSS v4 (No ... https://dev.to/darshan_bajgain/setting-up-2025-nextjs-15-with-shadcn-tailwind-css-v4-no-config-needed-dark-mode-5kl
[34] Next.js + Tailwind CSS v4 Ultimate Guide - YouTube https://www.youtube.com/watch?v=1jCLlNU2fAk
