import { createElement } from 'react';
import { loader, type LoaderPlugin } from 'fumadocs-core/source';
import { docsRoute } from './shared';
import { defineDocs } from 'fumadocs-mdx/macro';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';
import { isTrackId, TrackIcon } from './tracks';

// Extra frontmatter. All optional, so a plain page needs only a title.
//   sidebarTitle: short label for the sidebar ("1. Cloud Run"); the page keeps its full title.
//   time, level:  shown as chips in the lesson header.
//   needs:        short prerequisite chips. Keep the full "Before you start" section too.
const lessonSchema = pageSchema.extend({
  sidebarTitle: z.string().optional(),
  time: z.string().optional(),
  level: z.string().optional(),
  needs: z.array(z.string()).optional(),
});

const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: lessonSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

// Short sidebar labels and coloured track icons. `icon` in frontmatter or
// meta.json names a track id from src/lib/tracks.tsx (web, cloud, ai, ...).
const sidebarPlugin: LoaderPlugin = {
  name: 'gdg:sidebar',
  transformPageTree: {
    file(node, filePath) {
      const file = filePath ? this.storage.read(filePath) : undefined;
      const data = file?.format === 'page' ? (file.data as { sidebarTitle?: string; icon?: string }) : undefined;
      if (data?.sidebarTitle) node.name = data.sidebarTitle;
      if (isTrackId(node.icon)) node.icon = createElement(TrackIcon, { track: node.icon });
      return node;
    },
    folder(node) {
      if (isTrackId(node.icon)) node.icon = createElement(TrackIcon, { track: node.icon });
      if (node.index && isTrackId(node.index.icon)) node.index.icon = undefined;
      return node;
    },
  },
};

export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [sidebarPlugin],
});
