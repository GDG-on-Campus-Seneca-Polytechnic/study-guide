import { source } from '@/lib/source';
import { DocsBody, DocsPage } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { PencilLine } from 'lucide-react';
import { disclaimer, gitConfig } from '@/lib/shared';
import { trackOf } from '@/lib/tracks';
import { PageHeader } from '@/components/lesson';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const editUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`;
  const track = trackOf(page.slugs);
  // Edit link and disclaimer, shown under the previous and next cards.
  const pageMeta = (
    <div className="page-meta">
      <a href={editUrl} target="_blank" rel="noreferrer">
        <PencilLine aria-hidden className="size-4" />
        Edit this page on GitHub
      </a>
      <p>{disclaimer}</p>
    </div>
  );

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      data-track={track}
      className="docs-page"
      breadcrumb={{ enabled: false }}
      footer={{ className: 'page-nav', children: pageMeta }}
    >
      <PageHeader
        track={track}
        slugs={page.slugs}
        title={page.data.title}
        description={page.data.description}
        time={page.data.time}
        level={page.data.level}
        needs={page.data.needs}
      />
      <DocsBody>
        <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}
