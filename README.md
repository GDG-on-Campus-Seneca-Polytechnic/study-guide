# GDG Seneca Study Guide

The study guide for GDG on Campus @ Seneca Polytechnic. It will be published at https://gdg-on-campus-seneca-polytechnic.github.io/study-guide/.

- **Get set up**: sign-up guides for a Gemini API key, Google AI for students, Google Cloud credits and the GitHub Student Developer Pack.
- **Tracks**: Web (Firebase Hosting), Cloud (Cloud Run), AI and ML (Gemini API) and Mobile (Flutter). Each has an overview and starter lessons.
- **Code Jam**: the attendee guide for the jam on Friday, November 27, at Seneca Helix.
- **Club tools**: the chapter's event apps (Code Jam voting, Bean Bash, Jam Seed) with live and source links.

Built with [Fumadocs](https://fumadocs.dev) on Next.js, as a static export. The structure follows the [AWS 101 Study Guide](https://github.com/aws-seneca/aws-101-official-tutorial).

GDG on Campus @ Seneca Polytechnic is not affiliated with or endorsed by Google LLC.

## Run it

You need Node.js 22.

```bash
npm install
npm run dev        # http://localhost:3000
```

If your npm points at a private registry, add `--registry=https://registry.npmjs.org` to `npm install`.

## Add a lesson

1. Add an `.mdx` file to a track folder in [`content/docs`](content/docs), for example `content/docs/web/2-custom-domain.mdx`.
2. Add its file name (without `.mdx`) to that folder's `meta.json`. The sidebar follows that order.
3. Start from an existing lesson, for example [`cloud/1-cloud-run.mdx`](content/docs/cloud/1-cloud-run.mdx). Every lesson has the same parts: a `<BuildCard>`, a "How it fits together" diagram, before you start, steps, concepts, troubleshooting, and a `<Sources>` block with the official pages.

Lesson frontmatter:

```yaml
---
title: "Lesson 2: Add a custom domain"   # full title; "Lesson 2:" moves into the header's eyebrow
description: One sentence under the title.
sidebarTitle: 2. Custom domain           # short sidebar label, so it fits on one line
time: 20 min                             # header chip
level: Starter                           # header chip
needs: ["Lesson 1 done", "A domain"]     # "You need" chips; keep the full "Before you start" section too
---
```

All four extra fields are optional. A folder's `meta.json` takes `icon` with a track id (`web`, `cloud`, `ai`, `mobile`, `setup`) for the coloured sidebar icon. A single page takes the same `icon` in frontmatter.

Components you can use in MDX:

| Component | Use |
|---|---|
| `<BuildCard goal="...">What you'll build</BuildCard>` | The goal and the thing you build, as one card at the top of a lesson |
| `<Diagram name="cloud-run" />` | A flow diagram. Add new ones to [`src/components/diagrams.tsx`](src/components/diagrams.tsx) |
| `<Steps>` and `<Step n={1} title="...">` | Numbered steps |
| `<Step n={1} guide="ai-studio-key" title="..." alt="..." caption="...">` | A sign-up step with a screenshot slot |
| `<Check>...</Check>` | A fact you could not confirm on an official page |
| `<Sources checked="...">` | The official pages, at the bottom of a guide |
| `<ToolGrid>` and `<ToolCard name="..." icon="vote" live={[["Open", "https://..."]]} repo="...">` | Cards on the Club tools page |
| `<Callout>`, `<Tabs>`, `<Accordions>` | From Fumadocs |

## Add a diagram

Diagrams are data, drawn as inline SVG by [`src/components/flow.tsx`](src/components/flow.tsx). Each one is an entry in [`src/components/diagrams.tsx`](src/components/diagrams.tsx):

```tsx
'my-diagram': {
  track: 'web',                       // colours the accents
  alt: 'What the diagram shows, in a sentence or two, for screen readers.',
  caption: 'One line under the diagram.',
  columns: [
    { icon: FolderOpen, label: 'Your files', sub: '`public/`' },
    { icon: Globe, label: 'Firebase CDN', tone: 'accent' },
    [ /* a stack of boxes in one column */ ],
  ],
  frame: { from: 1, to: 1, label: 'Google Cloud' },   // optional dashed frame
},
```

- Arrows go from every box in one column to every box in the next. Pass `edges: [['id-a', 'id-b']]` with node `id`s to draw specific arrows instead.
- `tone`: `accent` fills the box with the track colour, `ghost` draws it dashed (optional, or not live yet).
- Keep labels short and draw only what the page already says. Use generic icons from `lucide-react`, never product logos.
- Each diagram has a wide drawing and a narrow one for phones. Check both in light and dark mode.

## Add screenshots

Each step in a sign-up guide has a slot. Save the screenshot as a PNG at:

```text
public/images/signup/<guide>/<nn>.png
```

- `<guide>` is the guide's file name: `ai-studio-key`, `google-ai-students`, `google-cloud-credits` or `github-student-pack`.
- `<nn>` is the step number with two digits: `01`, `02`, ... `10`.

Until the file exists, the page shows a "Screenshot coming" box with that exact path. The check runs at build time, so rebuild (or restart `npm run dev`) after adding files. Paint over emails, names, keys, card details and project numbers before you commit.

## Build and check

```bash
BASE_PATH=/study-guide npm run build        # static site in out/
BASE_PATH=/study-guide npm run check:links  # fails on any broken internal link
```

## Deploy

Pushing to `main` deploys to GitHub Pages with [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The workflow builds with `BASE_PATH=/<repo name>`, so the repo must be named `study-guide` for the address above.

One-time setup: in the repo's **Settings**, **Pages**, set **Source** to **GitHub Actions**.

## Writing style

Plain words, short sentences, active voice, sentence case. No em dashes. Link to official docs rather than copying details that change.
