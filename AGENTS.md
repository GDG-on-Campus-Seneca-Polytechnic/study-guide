# Agent notes for the GDG Seneca Study Guide

- Fumadocs on Next.js 16, static export for GitHub Pages. Content is MDX in `content/docs`; each folder's `meta.json` sets sidebar order.
- Every internal URL must work under a base path. Use `next/link` or MDX links for pages. For plain `<img>` or `fetch()` URLs, prefix `basePath` from `src/lib/shared.ts`.
- Sign-up screenshots live at `public/images/signup/<guide>/<nn>.png`. `src/components/step.tsx` shows a placeholder when the file is missing. Do not change that path convention without updating README.md and the Contributing page.
- Brand: the GDG on Campus palette (`#4285F4`, `#34A853`, `#F9AB00`, `#EA4335`, `#1E1E1E`, `#F0F0F0`) and self-hosted Roboto. Use the study guide's own mark (`src/components/brand-mark.tsx`), never Google's logo or the GDG lockup. Keep the disclaimer "GDG on Campus @ Seneca Polytechnic is not affiliated with or endorsed by Google LLC." on the home page and every docs page.
- Write from official docs and cite them in `<Sources>`. Mark anything unverified with `<Check>`. Do not invent UI labels, prices or limits.
- Writing style: plain words, short sentences, active voice, sentence case, no em dashes.
- Before you finish: `BASE_PATH=/study-guide npm run build && BASE_PATH=/study-guide npm run check:links`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
