import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BrandMark } from '@/components/brand-mark';
import { appName, gitConfig, links } from './shared';

export function baseOptions(): BaseLayoutProps {
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
      { text: 'Code Jam', url: '/docs/code-jam' },
      { text: 'Chapter info', url: links.info, external: true },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
