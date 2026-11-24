import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BrandMark } from '@/components/brand-mark';
import { appName, gitConfig, links } from './shared';

// `docs`: the docs layout already lists Code Jam in the sidebar, so it only
// keeps the external link here. The home page shows both in its top bar.
export function baseOptions({ docs = false }: { docs?: boolean } = {}): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2.5 font-semibold tracking-tight">
          <BrandMark className="size-6" />
          {appName}
        </span>
      ),
    },
    links: [
      ...(docs ? [] : [{ text: 'Code Jam', url: '/docs/code-jam' }, { text: 'Club tools', url: '/docs/club-tools' }]),
      { text: 'Chapter info', url: links.info, external: true },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
