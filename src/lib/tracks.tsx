import {
  BookOpen,
  BrainCircuit,
  CalendarClock,
  Cloud,
  GitPullRequest,
  Globe,
  KeyRound,
  Smartphone,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

// One entry per section of the guide. The colour drives the sidebar icon, the
// lesson header, the diagrams and the home page tiles. The hex values are the
// GDG on Campus palette; `global.css` maps `data-track` to text-safe shades.
export type TrackId = 'web' | 'cloud' | 'ai' | 'mobile' | 'setup' | 'code-jam' | 'club-tools' | 'guide' | 'contributing';

export const tracks: Record<TrackId, { label: string; icon: LucideIcon; kind: 'track' | 'section' }> = {
  web: { label: 'Web', icon: Globe, kind: 'track' },
  cloud: { label: 'Cloud', icon: Cloud, kind: 'track' },
  ai: { label: 'AI and ML', icon: BrainCircuit, kind: 'track' },
  mobile: { label: 'Mobile', icon: Smartphone, kind: 'track' },
  setup: { label: 'Get set up', icon: KeyRound, kind: 'section' },
  'code-jam': { label: 'Code Jam', icon: CalendarClock, kind: 'section' },
  'club-tools': { label: 'Club tools', icon: Wrench, kind: 'section' },
  guide: { label: 'Guide', icon: BookOpen, kind: 'section' },
  contributing: { label: 'Contributing', icon: GitPullRequest, kind: 'section' },
};

export function isTrackId(value: unknown): value is TrackId {
  return typeof value === 'string' && value in tracks;
}

// The track a docs page belongs to, from its first slug ("cloud/1-cloud-run" -> cloud).
export function trackOf(slugs: string[]): TrackId {
  const first = slugs[0];
  if (first === undefined) return 'guide';
  return isTrackId(first) ? first : 'guide';
}

// A small square in the track colour with the track's icon. Used in the
// sidebar (through the page tree) and in page headers.
export function TrackIcon({ track, className = '' }: { track: TrackId; className?: string }) {
  const Icon = tracks[track].icon;
  return (
    <span data-track={track} className={`track-icon ${className}`} aria-hidden>
      <Icon />
    </span>
  );
}
