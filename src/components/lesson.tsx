import type { ReactNode } from 'react';
import { ArrowUpRight, Clock, Gamepad2, FolderGit2, Gauge, Hammer, Info, Sprout, Target, TicketCheck, Users } from 'lucide-react';
import { tracks, TrackIcon, type TrackId } from '@/lib/tracks';

// The header at the top of every docs page. Lessons get time, level and
// prerequisite chips from frontmatter (time, level, needs).
export function PageHeader({
  track,
  slugs,
  title,
  description,
  time,
  level,
  needs,
}: {
  track: TrackId;
  slugs: string[];
  title: string;
  description?: string;
  time?: string;
  level?: string;
  needs?: string[];
}) {
  const info = tracks[track];
  const last = slugs[slugs.length - 1] ?? '';
  const lessonNo = /^(\d+)-/.exec(last)?.[1];
  const isOverview = slugs.length === 1 && info.kind === 'track';
  const eyebrow = lessonNo
    ? `${info.label} track · Lesson ${lessonNo}`
    : isOverview
      ? `${info.label} track · Overview`
      : track === 'setup' && slugs.length > 1
        ? 'Get set up · Sign-up guide'
        : info.label;
  // Lesson pages show the topic as the big title ("Deploy a web service to
  // Cloud Run"); the "Lesson 1" part moves into the eyebrow above it.
  const shownTitle = lessonNo ? title.replace(/^Lesson \d+:\s*/, '') : title;
  const hasChips = Boolean(time || level || needs?.length);

  return (
    <header className="page-head not-prose">
      <div className="page-head-tab" aria-hidden />
      <p className="page-head-eyebrow">
        <TrackIcon track={track} className="size-6" />
        <span>{eyebrow}</span>
      </p>
      <h1 className="page-head-title">{shownTitle}</h1>
      {description && <p className="page-head-desc">{description}</p>}
      {hasChips && (
        <dl className="page-head-chips">
          {time && (
            <div className="chip chip-strong">
              <dt>
                <Clock aria-hidden />
                <span className="sr-only">Time</span>
              </dt>
              <dd>{time}</dd>
            </div>
          )}
          {level && (
            <div className="chip chip-strong">
              <dt>
                <Gauge aria-hidden />
                <span className="sr-only">Level</span>
              </dt>
              <dd>{level}</dd>
            </div>
          )}
          {needs && needs.length > 0 && (
            <div className="chip-group">
              <dt>You need</dt>
              {needs.map((n) => (
                <dd key={n} className="chip">
                  {n}
                </dd>
              ))}
            </div>
          )}
        </dl>
      )}
    </header>
  );
}

// "Goal" and "What you'll build" at the top of a lesson, as one card.
//   <BuildCard goal="Put a page online.">A one-page site at `x.web.app`.</BuildCard>
export function BuildCard({ goal, children }: { goal: string; children: ReactNode }) {
  return (
    <section className="build-card not-prose" aria-label="What you'll build">
      <div className="build-card-main">
        <p className="build-card-kicker">
          <Hammer aria-hidden /> What you&apos;ll build
        </p>
        <div className="build-card-body">{children}</div>
      </div>
      <div className="build-card-goal">
        <p className="build-card-kicker">
          <Target aria-hidden /> Goal
        </p>
        <p>{goal}</p>
      </div>
    </section>
  );
}

const toolIcons = { vote: TicketCheck, game: Gamepad2, seed: Sprout, chapter: Users, info: Info };
// Same colours as the club system diagram.
const toolTracks: Record<keyof typeof toolIcons, TrackId> = { vote: 'cloud', game: 'ai', seed: 'guide', chapter: 'web', info: 'mobile' };

// One club system on the Club tools page.
export function ToolCard({
  name,
  icon,
  status = 'live',
  live,
  repo,
  demo,
  children,
}: {
  name: string;
  icon: keyof typeof toolIcons;
  status?: 'live' | 'soon';
  /** Links to open the tool: [label, url] pairs. */
  live?: [string, string][];
  repo?: string;
  demo?: string;
  children: ReactNode;
}) {
  const Icon = toolIcons[icon];
  return (
    <article id={name.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="tool-card not-prose" data-status={status} data-track={toolTracks[icon]}>
      <header className="tool-card-head">
        <span className="tool-card-icon" aria-hidden>
          <Icon />
        </span>
        <h3>{name}</h3>
        <span className="tool-card-status">{status === 'live' ? 'Live' : 'Coming soon'}</span>
      </header>
      <div className="tool-card-body">{children}</div>
      <ul className="tool-card-links">
        {live?.map(([label, url]) => (
          <li key={url}>
            <a href={url} target="_blank" rel="noreferrer">
              {label} <ArrowUpRight aria-hidden />
            </a>
          </li>
        ))}
        {repo && (
          <li>
            <a href={repo} target="_blank" rel="noreferrer">
              <FolderGit2 aria-hidden /> Source on GitHub
            </a>
          </li>
        )}
        {demo && (
          <li>
            <a href={demo} target="_blank" rel="noreferrer">
              Watch the demo <ArrowUpRight aria-hidden />
            </a>
          </li>
        )}
      </ul>
    </article>
  );
}

export function ToolGrid({ children }: { children: ReactNode }) {
  return <div className="tool-grid not-prose">{children}</div>;
}
