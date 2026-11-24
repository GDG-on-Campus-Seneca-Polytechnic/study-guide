import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Box,
  CalendarDays,
  Code2,
  FileCode2,
  FolderOpen,
  Gamepad2,
  Globe,
  Layers,
  Link2,
  MapPin,
  Monitor,
  Presentation,
  QrCode,
  ScrollText,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import { disclaimer, links } from '@/lib/shared';
import { TrackIcon, type TrackId } from '@/lib/tracks';
import { HeroArt } from '@/components/hero-art';
import { Diagram } from '@/components/diagrams';

type Tile = {
  href: string;
  track: TrackId;
  title: string;
  body: string;
  meta: string;
  flow?: LucideIcon[];
  chips?: string[];
  wide?: boolean;
};

// The bento grid: one tile per part of the guide. Each track tile carries a
// tiny version of its lesson diagram.
const tiles: Tile[] = [
  {
    href: '/docs/setup',
    track: 'setup',
    title: 'Get set up',
    body: 'Claim the free student tools first. Each guide is a short list of steps with screenshots.',
    meta: '4 sign-up guides',
    chips: ['Gemini API key', 'Google AI for students', 'Google Cloud credits', 'GitHub Student Pack'],
    wide: true,
  },
  {
    href: '/docs/web',
    track: 'web',
    title: 'Web',
    body: 'Put a website online in minutes with Firebase Hosting.',
    meta: 'Overview and 1 lesson',
    flow: [FolderOpen, Globe, Monitor],
  },
  {
    href: '/docs/cloud',
    track: 'cloud',
    title: 'Cloud',
    body: 'Run your own server code on Google Cloud with Cloud Run.',
    meta: 'Overview and 1 lesson',
    flow: [FileCode2, Box, Link2],
  },
  {
    href: '/docs/ai',
    track: 'ai',
    title: 'AI and ML',
    body: 'Call Gemini from your code, then shape its answers with system instructions. The best warm-up for the Code Jam.',
    meta: 'Overview and 2 lessons',
    flow: [Code2, BrainCircuit, ScrollText],
    wide: true,
  },
  {
    href: '/docs/mobile',
    track: 'mobile',
    title: 'Mobile',
    body: 'Build your first app with Flutter, and find the Android path.',
    meta: 'Overview and 1 lesson',
    flow: [FileCode2, Layers, Smartphone],
  },
  {
    href: '/docs/club-tools',
    track: 'club-tools',
    title: 'Club tools',
    body: 'The apps we run at events: the Code Jam vote, Bean Bash trivia and Jam Seed.',
    meta: '3 apps, all open source',
    flow: [QrCode, Gamepad2, Presentation],
  },
];

function MiniFlow({ icons }: { icons: LucideIcon[] }) {
  return (
    <div className="mini-flow" aria-hidden>
      {icons.map((Icon, i) => (
        <span key={i} className="contents">
          {i > 0 && <span className="mini-flow-edge" />}
          <span className={`mini-flow-node ${i === 1 ? 'is-accent' : ''}`}>
            <Icon />
          </span>
        </span>
      ))}
    </div>
  );
}

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
    <main className="home flex w-full flex-1 flex-col">
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pt-12 pb-10 sm:px-8 sm:pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-3 py-1 text-sm font-medium text-fd-muted-foreground">
            <span className="flex gap-0.5" aria-hidden>
              <span className="size-1.5 rounded-full bg-g-blue" />
              <span className="size-1.5 rounded-full bg-g-red" />
              <span className="size-1.5 rounded-full bg-g-yellow" />
              <span className="size-1.5 rounded-full bg-g-green" />
            </span>
            GDG on Campus @ Seneca Polytechnic
          </p>
          <h1 className="display mt-5 text-[2.9rem] text-balance sm:text-7xl lg:text-[5.2rem]">
            Build with Google tools. Start here.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-fd-muted-foreground">
            The chapter&apos;s study guide. Claim the free student tools, pick a track, and ship something small in
            your first hour. Every lesson comes with a diagram of how the pieces connect.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/docs/setup"
              className="inline-flex items-center gap-2 rounded-full bg-g-ink px-5 py-3 text-sm font-medium text-white hover:bg-black dark:bg-g-paper dark:text-g-ink dark:hover:bg-white"
            >
              Get set up <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center rounded-full border border-fd-border px-5 py-3 text-sm font-medium hover:bg-fd-muted"
            >
              How this guide works
            </Link>
          </div>
        </div>
        <HeroArt className="mx-auto w-full max-w-[520px]" />
      </section>

      {/* Code Jam banner */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <Link
          href="/docs/code-jam"
          className="group relative grid gap-5 overflow-hidden rounded-2xl bg-g-ink p-6 text-white sm:p-7 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8 dark:ring-1 dark:ring-white/10"
        >
          <Stripe className="absolute inset-x-0 top-0 h-1.5" />
          <div>
            <p className="text-sm text-white/70">Next event</p>
            <h2 className="display mt-1 text-4xl sm:text-5xl">Code Jam</h2>
          </div>
          <div>
            <p className="max-w-md leading-relaxed text-white/85">
              Two hours to build something with Gemini. Bring a laptop and an idea, or get one at the door.
            </p>
            <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
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
          </div>
          <span className="inline-flex items-center gap-1 justify-self-start rounded-full bg-white px-4 py-2 text-sm font-medium text-g-ink transition-transform group-hover:translate-x-0.5">
            Attendee guide <ArrowRight className="size-4" aria-hidden />
          </span>
        </Link>
      </section>

      {/* Bento grid */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 sm:px-8" aria-labelledby="tracks-heading">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 id="tracks-heading" className="display text-3xl sm:text-4xl">
            Pick a track
          </h2>
          <p className="text-sm text-fd-muted-foreground">Short lessons. Each one builds one small thing.</p>
        </div>
        <ul className="bento mt-6">
          {tiles.map((t) => (
            <li key={t.href} className={t.wide ? 'is-wide' : ''}>
              <Link href={t.href} className="bento-tile group" data-track={t.track}>
                <div className="flex items-center gap-3">
                  <TrackIcon track={t.track} className="size-9" />
                  <span className="text-xl font-bold tracking-tight [font-stretch:88%] sm:text-2xl">{t.title}</span>
                  <ArrowUpRight className="ms-auto size-5 text-fd-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </div>
                <p className="mt-3 text-pretty text-fd-muted-foreground">{t.body}</p>
                <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-5">
                  {t.flow && <MiniFlow icons={t.flow} />}
                  {t.chips && (
                    <ul className="flex flex-wrap gap-1.5">
                      {t.chips.map((c) => (
                        <li key={c} className="chip">
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="text-sm text-fd-muted-foreground">{t.meta}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* How it all connects */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 sm:px-8" aria-labelledby="connects-heading">
        <h2 id="connects-heading" className="display text-3xl sm:text-4xl">
          How it all connects
        </h2>
        <p className="mt-3 max-w-2xl text-fd-muted-foreground">
          Claim the tools once. Any track then gets you to something you can show at the Code Jam.
        </p>
        <Diagram name="guide-path" large />
      </section>

      {/* Club tools */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-8 pb-16 sm:px-8" aria-labelledby="club-heading">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 id="club-heading" className="display text-3xl sm:text-4xl">
            Club tools on event day
          </h2>
          <Link href="/docs/club-tools" className="inline-flex items-center gap-1 text-sm font-medium hover:underline">
            All club tools <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <p className="mt-3 max-w-2xl text-fd-muted-foreground">
          The apps behind the vote and the trivia game, built by club members and open source.
        </p>
        <Diagram name="club-system" large />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Code Jam voting', note: 'Vote with your check-in code', href: links.vote, repo: 'code-jam-vote' },
            { name: 'Bean Bash', note: 'Trivia on your phone', href: 'https://gdg-bean-bash.tatandat110105.workers.dev', repo: 'bean-bash' },
            { name: 'Jam Seed', note: 'Coming soon', repo: 'jam-seed' },
            { name: 'Chapter info', note: 'Who we are and how we run', repo: 'gdgSen-info' },
          ].map((tool) => (
            <li key={tool.name} className="rounded-xl border border-fd-border bg-fd-card p-4">
              <p className="font-semibold">{tool.name}</p>
              <p className="mt-0.5 text-sm text-fd-muted-foreground">{tool.note}</p>
              <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
                {tool.href && (
                  <a href={tool.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
                    Open <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                )}
                <a
                  href={`https://github.com/GDG-on-Campus-Seneca-Polytechnic/${tool.repo}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  Source <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-auto border-t border-fd-border bg-fd-muted/50">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-8">
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
        <div className="mx-auto w-full max-w-6xl px-4 pb-8 text-xs text-fd-muted-foreground sm:px-8">{disclaimer}</div>
        <Stripe className="h-1" />
      </footer>
    </main>
  );
}
