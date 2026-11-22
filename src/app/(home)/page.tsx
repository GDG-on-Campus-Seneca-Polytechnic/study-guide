import Link from 'next/link';
import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import { disclaimer, links } from '@/lib/shared';

// The home page is an index: each row is a tab in the guide, in its own colour.
const sections = [
  {
    href: '/docs/setup',
    color: 'bg-g-ink dark:bg-g-paper',
    title: 'Get set up',
    body: 'Claim the free student tools first: an AI Studio key, Google AI for students, Google Cloud credits and the GitHub Student Developer Pack.',
    meta: '4 sign-up guides',
  },
  {
    href: '/docs/web',
    color: 'bg-g-blue',
    title: 'Web',
    body: 'Put a website online in minutes with Firebase Hosting.',
    meta: 'Overview and 1 lesson',
  },
  {
    href: '/docs/cloud',
    color: 'bg-g-green',
    title: 'Cloud',
    body: 'Run your own server code on Google Cloud with Cloud Run.',
    meta: 'Overview and 1 lesson',
  },
  {
    href: '/docs/ai',
    color: 'bg-g-yellow',
    title: 'AI and ML',
    body: 'Call Gemini from your code, then shape its answers with system instructions.',
    meta: 'Overview and 2 lessons',
  },
  {
    href: '/docs/mobile',
    color: 'bg-g-red',
    title: 'Mobile',
    body: 'Build your first app with Flutter, and find the Android path.',
    meta: 'Overview and 1 lesson',
  },
];

function Stripe({ className = '' }: { className?: string }) {
  return (
    <div className={`flex ${className}`} aria-hidden>
      <span className="flex-1 bg-g-blue" />
      <span className="flex-1 bg-g-red" />
      <span className="flex-1 bg-g-yellow" />
      <span className="flex-1 bg-g-green" />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-5 pt-14 pb-12 sm:px-8 sm:pt-20 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-14">
        <div>
          <p className="text-sm font-medium text-fd-muted-foreground">GDG on Campus @ Seneca Polytechnic</p>
          <h1 className="display mt-4 text-[3.1rem] text-balance sm:text-7xl lg:text-[5.6rem]">
            Build with Google tools. Start here.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-fd-muted-foreground">
            The chapter&apos;s study guide. Claim the free student tools, pick a track, and ship something small in
            your first hour.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/docs/setup"
              className="inline-flex items-center rounded-full bg-g-ink px-5 py-3 text-sm font-medium text-white hover:bg-black dark:bg-g-paper dark:text-g-ink dark:hover:bg-white"
            >
              Get set up
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center rounded-full border border-fd-border px-5 py-3 text-sm font-medium hover:bg-fd-muted"
            >
              How this guide works
            </Link>
          </div>
        </div>

        <Link
          href="/docs/code-jam"
          className="group relative block overflow-hidden rounded-2xl bg-g-ink p-6 text-white sm:p-7 dark:ring-1 dark:ring-white/10"
        >
          <Stripe className="absolute inset-x-0 top-0 h-1.5" />
          <p className="text-sm text-white/70">Next event</p>
          <h2 className="display mt-2 text-4xl sm:text-5xl">Code Jam</h2>
          <p className="mt-3 max-w-sm leading-relaxed text-white/80">
            Two hours to build something with Gemini. Bring a laptop and an idea, or get one at the door.
          </p>
          <dl className="mt-6 grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 text-g-yellow" aria-hidden />
              <dt className="sr-only">When</dt>
              <dd>Friday, November 27, 1 to 4 PM</dd>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-g-red" aria-hidden />
              <dt className="sr-only">Where</dt>
              <dd>Seneca Helix</dd>
            </div>
          </dl>
          <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 group-hover:underline">
            Read the attendee guide
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </Link>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8" aria-labelledby="index-heading">
        <h2 id="index-heading" className="border-b border-fd-border pb-3 text-sm font-medium text-fd-muted-foreground">
          What&apos;s in the guide
        </h2>
        <ul className="divide-y divide-fd-border border-b border-fd-border">
          {sections.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="group grid grid-cols-[0.5rem_1fr] items-start gap-x-5 py-6 sm:grid-cols-[0.5rem_14rem_1fr_auto] sm:items-baseline sm:gap-x-8"
              >
                <span
                  className={`row-span-2 h-12 w-1.5 self-center rounded-full transition-[height] duration-200 group-hover:h-16 sm:row-span-1 sm:h-8 sm:w-2 sm:self-center ${s.color}`}
                  aria-hidden
                />
                <span className="text-2xl font-bold tracking-tight [font-stretch:88%] sm:text-3xl">{s.title}</span>
                <span className="mt-1 text-pretty text-fd-muted-foreground sm:mt-0 sm:max-w-xl">{s.body}</span>
                <span className="hidden text-sm whitespace-nowrap text-fd-muted-foreground sm:block">{s.meta}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-auto border-t border-fd-border bg-fd-muted/50">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-8">
          <div className="max-w-md">
            <p className="font-semibold">GDG on Campus @ Seneca Polytechnic</p>
            <p className="mt-1 text-sm text-fd-muted-foreground">
              A student-run Google Developer Group. Everyone is welcome, whatever your program or level.
            </p>
          </div>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a href={links.info} className="inline-flex items-center gap-1 hover:underline" target="_blank" rel="noreferrer">
                Chapter info on GitHub <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </li>
            <li>
              <a href={links.linktree} className="inline-flex items-center gap-1 hover:underline" target="_blank" rel="noreferrer">
                All our links: linktr.ee/senecagdg <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </li>
            <li>
              <Link href="/docs/contributing" className="hover:underline">
                Add a lesson or a screenshot
              </Link>
            </li>
          </ul>
        </div>
        <div className="mx-auto w-full max-w-6xl px-5 pb-8 text-xs text-fd-muted-foreground sm:px-8">{disclaimer}</div>
        <Stripe className="h-1" />
      </footer>
    </main>
  );
}
