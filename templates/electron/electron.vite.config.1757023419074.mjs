// electron.vite.config.ts
import { defineConfig, externalizeDepsPlugin, defineViteConfig } from "electron-vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

// lib/vite/vite-plugin-content.ts
import path from "node:path";
import fs from "node:fs/promises";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
function viteContentPlugin({
  sanitize = true,
  contentAlias = "@manta-templates/content"
} = {}) {
  let aliasRootAbs = null;
  return {
    name: "vite-plugin-content",
    configResolved(c) {
      const alias = c.resolve.alias.find(
        (a) => typeof a.find === "string" && a.find === contentAlias
      );
      aliasRootAbs = alias ? alias.replacement : null;
    },
    async transform(code, id) {
      if (!id.endsWith(".md")) return null;
      try {
        const { data: frontmatter, content, excerpt } = matter(code, { excerpt: true });
        const headings = [];
        const processor = remark().use(remarkGfm).use(remarkRehype, { allowDangerousHtml: true }).use(rehypeRaw).use(sanitize ? rehypeSanitize : () => {
        }).use(rehypeSlug).use(rehypeAutolinkHeadings).use(rehypeExternalLinks, {
          target: "_blank",
          rel: ["noopener", "noreferrer"]
        }).use(() => (tree) => {
          visit(tree, "element", (node) => {
            if (/^h[1-6]$/.test(node.tagName)) {
              const depth = Number(node.tagName[1]);
              const id2 = node.properties?.id ?? "";
              const text = (node.children ?? []).filter((c) => c.type === "text").map((c) => c.value).join("");
              headings.push({ depth, text, id: id2 });
            }
          });
        }).use(rehypeStringify);
        const html = String(await processor.process(content));
        const wordCount = (content.trim().match(/\S+/g) ?? []).length;
        const readingTime = Math.ceil(wordCount / 200);
        const stats = await fs.stat(id);
        const rel = aliasRootAbs ? path.relative(aliasRootAbs, id) : path.basename(id);
        const slug = rel.split(path.sep).join("/").replace(/\.md$/, "");
        const iso = stats.mtime.toISOString();
        const js = `
const compiled = {
  frontmatter: ${JSON.stringify(frontmatter)},
  contentHtml: ${JSON.stringify(html)},
  excerpt: ${excerpt ? JSON.stringify(excerpt) : "undefined"},
  slug: ${JSON.stringify(slug)},
  lastModified: new Date(${JSON.stringify(iso)}),
  meta: {
    readingTime: ${readingTime},
    wordCount: ${wordCount},
    headings: ${JSON.stringify(headings)}
  }
};
export default compiled;`;
        return { code: js, map: null };
      } catch (error) {
        console.error(`Error processing markdown file ${id}:`, error);
        throw error;
      }
    },
    handleHotUpdate(ctx) {
      if (ctx.file.endsWith(".md")) {
        return ctx.modules;
      }
    }
  };
}

// electron.vite.config.ts
var __electron_vite_injected_dirname = "/Users/manta/source/repos/manta/manta-templates/templates/electron";
var __electron_vite_injected_import_meta_url = "file:///Users/manta/source/repos/manta/manta-templates/templates/electron/electron.vite.config.ts";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: "out/main",
      rollupOptions: {
        output: { format: "es" }
      }
    },
    resolve: {
      alias: {
        "@main": resolve(__electron_vite_injected_dirname, "src/main")
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: "out/preload",
      rollupOptions: {
        output: { format: "es" }
      }
    },
    resolve: {
      alias: {
        "@preload": resolve(__electron_vite_injected_dirname, "src/preload")
      }
    }
  },
  renderer: defineViteConfig(() => ({
    root: ".",
    build: {
      outDir: "out/renderer",
      rollupOptions: {
        input: { index: resolve(__electron_vite_injected_dirname, "index.html") },
        output: {
          manualChunks: {
            "ui-core": ["./src/lib/ui-core"]
          }
        }
      }
    },
    resolve: {
      alias: {
        "@renderer": resolve(__electron_vite_injected_dirname, "src/renderer"),
        "@manta-templates/content": fileURLToPath(
          new URL("./content", __electron_vite_injected_import_meta_url)
        ),
        "@/lib": resolve(__electron_vite_injected_dirname, "lib")
      }
    },
    plugins: [
      react(),
      tailwindcss(),
      viteContentPlugin({
        sanitize: true,
        contentAlias: "@manta-templates/content"
      })
    ]
  }))
});
export {
  electron_vite_config_default as default
};
