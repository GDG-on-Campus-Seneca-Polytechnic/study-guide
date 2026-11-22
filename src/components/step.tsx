import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { ReactNode } from 'react';
import { ImageOff } from 'lucide-react';
import { basePath } from '@/lib/shared';

// A numbered list of steps. Wrap <Step> elements in it.
export function Steps({ children }: { children: ReactNode }) {
  return <ol className="not-prose my-8 flex list-none flex-col gap-10 p-0">{children}</ol>;
}

// One step: a number, a short instruction, and an optional screenshot.
//
// Sign-up guides pass `guide` and `n`. The screenshot is then read from
//   public/images/signup/<guide>/<nn>.png   (nn = n with a leading zero: 01, 02, ... 10)
// and served at /images/signup/<guide>/<nn>.png. If that file does not exist
// at build time, the step shows a "screenshot coming" placeholder instead.
// `src` overrides the path for any other image.
export function Step({
  n,
  title,
  guide,
  src,
  alt,
  caption,
  children,
}: {
  n: number;
  title: string;
  guide?: string;
  src?: string;
  alt?: string;
  caption?: string;
  children?: ReactNode;
}) {
  const nn = String(n).padStart(2, '0');
  const imagePath = src ?? (guide ? `/images/signup/${guide}/${nn}.png` : undefined);
  const hasImage = imagePath ? existsSync(join(process.cwd(), 'public', imagePath)) : false;

  return (
    <li className="grid grid-cols-[2.25rem_1fr] items-center gap-x-3 sm:grid-cols-[2.75rem_1fr] sm:items-start sm:gap-x-4">
      <span
        aria-hidden
        className="flex size-9 items-center justify-center rounded-full bg-g-ink font-mono text-sm font-semibold text-white sm:size-11 sm:text-base dark:bg-g-paper dark:text-g-ink"
      >
        {n}
      </span>
      <h3 className="text-lg leading-snug font-semibold tracking-tight sm:pt-2">
        <span className="sr-only">Step {n}: </span>
        {title}
      </h3>
      <div className="col-span-2 mt-2 min-w-0 sm:col-span-1 sm:col-start-2 sm:mt-0">
        <div className="prose max-w-none text-[0.95rem] leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {children}
        </div>
        {imagePath && (
          <figure className="mt-4">
            {hasImage ? (
              <a href={`${basePath}${imagePath}`} target="_blank" rel="noreferrer" title="Open full size">
                <img
                  src={`${basePath}${imagePath}`}
                  alt={alt ?? title}
                  loading="lazy"
                  className="w-full rounded-lg border border-fd-border"
                />
              </a>
            ) : (
              <div className="flex h-44 sm:h-56 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-fd-border bg-fd-muted/60 px-6 text-center">
                <ImageOff className="size-5 text-fd-muted-foreground" aria-hidden />
                <p className="text-sm font-medium">Screenshot coming</p>
                <p className="max-w-sm text-xs text-fd-muted-foreground">{alt ?? title}</p>
                <code className="mt-1 rounded bg-fd-background px-1.5 py-0.5 font-mono text-[0.7rem] text-fd-muted-foreground">
                  public{imagePath}
                </code>
              </div>
            )}
            {caption && <figcaption className="mt-2 text-sm text-fd-muted-foreground">{caption}</figcaption>}
          </figure>
        )}
      </div>
    </li>
  );
}
