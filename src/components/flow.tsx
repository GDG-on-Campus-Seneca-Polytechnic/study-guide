import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import type { TrackId } from '@/lib/tracks';

// A boxes-and-arrows diagram drawn as inline SVG. Each box is HTML inside a
// <foreignObject>, so its text wraps and follows the theme. The figure holds
// two drawings of the same data: a wide one (columns, left to right) and a
// narrow one (rows, top to bottom). CSS shows the one that fits the container,
// so text stays readable on a phone. Colours come from CSS variables, so the
// same SVG works in light and dark mode. See `.dg` in src/app/global.css.

export type FlowNode = {
  id?: string;
  icon: LucideIcon;
  label: string;
  /** One short line under the label. Text in `backticks` renders as code. */
  sub?: string;
  /** plain (default), accent (filled with the track colour) or ghost (dashed: optional or not live yet). */
  tone?: 'plain' | 'accent' | 'ghost';
  /** Colour this box with another track. Defaults to the figure's track. */
  track?: TrackId;
};

export type FlowSpec = {
  track: TrackId;
  /** What the diagram shows, in one or two sentences, for screen readers. */
  alt: string;
  caption?: ReactNode;
  /** Each column is one box or a stack of boxes. */
  columns: (FlowNode | FlowNode[])[];
  /** Arrows by node id. Default: every box in one column to every box in the next. */
  edges?: [string, string][];
  /** A dashed frame around columns `from` to `to` (inclusive), with a label. */
  frame?: { from: number; to: number; label: string };
  /** Width of the wide drawing in SVG units. Default 760. */
  width?: number;
  /** Height of a single box in the wide drawing. Default 112. */
  nodeHeight?: number;
};

type Placed = FlowNode & { id: string; col: number; x: number; y: number; w: number; h: number; layout: 'stack' | 'row' };

function columnsOf(spec: FlowSpec) {
  return spec.columns.map((c, ci) =>
    (Array.isArray(c) ? c : [c]).map((n, ni) => ({ ...n, id: n.id ?? `c${ci}n${ni}`, col: ci })),
  );
}

function edgesOf(spec: FlowSpec, cols: ReturnType<typeof columnsOf>): [string, string][] {
  if (spec.edges) return spec.edges;
  const out: [string, string][] = [];
  for (let i = 0; i < cols.length - 1; i++) for (const a of cols[i]) for (const b of cols[i + 1]) out.push([a.id, b.id]);
  return out;
}

function wide(spec: FlowSpec) {
  const W = spec.width ?? 760;
  const cols = columnsOf(spec);
  const n = cols.length;
  const pad = 14;
  const gap = n >= 6 ? 24 : n >= 5 ? 34 : 48;
  const nodeW = Math.min(196, (W - 2 * pad - (n - 1) * gap) / n);
  const single = spec.nodeHeight ?? 112;
  const stackH = 76;
  const stackGap = 10;
  const colH = cols.map((c) => (c.length === 1 ? single : c.length * stackH + (c.length - 1) * stackGap));
  const inner = Math.max(...colH);
  const frameTop = spec.frame ? 34 : 0;
  const top = 14 + frameTop;
  const total = n * nodeW + (n - 1) * gap;
  const x0 = (W - total) / 2;
  const nodes: Placed[] = [];
  cols.forEach((c, ci) => {
    const x = x0 + ci * (nodeW + gap);
    const h = c.length === 1 ? single : stackH;
    let y = top + (inner - colH[ci]) / 2;
    for (const node of c) {
      nodes.push({ ...node, x, y, w: nodeW, h, layout: c.length === 1 ? 'stack' : 'row' });
      y += h + stackGap;
    }
  });
  const H = top + inner + (spec.frame ? 26 : 14);
  const frame = spec.frame && {
    x: x0 + spec.frame.from * (nodeW + gap) - 12,
    y: 8,
    w: (spec.frame.to - spec.frame.from) * (nodeW + gap) + nodeW + 24,
    h: H - 14,
    label: spec.frame.label,
  };
  return { W, H, nodes, frame, dir: 'x' as const };
}

function narrow(spec: FlowSpec) {
  const W = 360;
  const cols = columnsOf(spec);
  const pad = 10;
  const rowGap = 36;
  const inset = 12;
  const nodes: Placed[] = [];
  let y = 10;
  let frameY = 0;
  let frameEnd = 0;
  cols.forEach((c, ci) => {
    const inFrame = spec.frame && ci >= spec.frame.from && ci <= spec.frame.to;
    if (spec.frame && ci === spec.frame.from) {
      frameY = y;
      y += 34;
    }
    const left = pad + (inFrame ? inset : 0);
    const avail = W - 2 * left;
    const k = c.length;
    const gap = 8;
    const w = (avail - (k - 1) * gap) / k;
    const h = k === 1 ? 66 : k === 2 ? 98 : k === 3 ? 116 : 140;
    c.forEach((node, ni) => {
      nodes.push({ ...node, x: left + ni * (w + gap), y, w, h, layout: k === 1 ? 'row' : 'stack' });
    });
    y += h;
    if (spec.frame && ci === spec.frame.to) {
      frameEnd = y + 12;
      y = frameEnd;
    }
    if (ci < cols.length - 1) y += rowGap;
  });
  const H = y + 10;
  const frame = spec.frame && { x: pad, y: frameY, w: W - 2 * pad, h: frameEnd - frameY, label: spec.frame.label };
  return { W, H, nodes, frame, dir: 'y' as const };
}

function renderSub(sub: string) {
  return sub.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith('`') ? <code key={i}>{part.slice(1, -1)}</code> : <span key={i}>{part}</span>,
  );
}

function Edge({ a, b, dir }: { a: Placed; b: Placed; dir: 'x' | 'y' }) {
  let x1: number, y1: number, x2: number, y2: number, d: string, head: string;
  if (dir === 'x') {
    const forward = b.col > a.col;
    x1 = forward ? a.x + a.w : a.x;
    x2 = forward ? b.x : b.x + b.w;
    y1 = a.y + a.h / 2;
    y2 = b.y + b.h / 2;
    const s = forward ? 1 : -1;
    const end = x2 - s * 7;
    const c = Math.max(14, Math.abs(end - x1) / 2);
    d = `M${x1} ${y1} C${x1 + s * c} ${y1} ${end - s * c} ${y2} ${end} ${y2}`;
    head = `M${x2 - s * 8} ${y2 - 4.5} L${x2} ${y2} L${x2 - s * 8} ${y2 + 4.5}Z`;
  } else {
    const forward = b.col > a.col;
    y1 = forward ? a.y + a.h : a.y;
    y2 = forward ? b.y : b.y + b.h;
    x1 = a.x + a.w / 2;
    x2 = b.x + b.w / 2;
    const s = forward ? 1 : -1;
    const end = y2 - s * 7;
    const c = Math.max(10, Math.abs(end - y1) / 2);
    d = `M${x1} ${y1} C${x1} ${y1 + s * c} ${x2} ${end - s * c} ${x2} ${end}`;
    head = `M${x2 - 4.5} ${y2 - s * 8} L${x2} ${y2} L${x2 + 4.5} ${y2 - s * 8}Z`;
  }
  return (
    <g className="dg-edge" data-track={a.track}>
      <path d={d} className="dg-line" />
      <path d={d} className="dg-pulse" />
      <path d={head} className="dg-head" />
    </g>
  );
}

function Drawing({
  spec,
  layout,
  maxWidth,
}: {
  spec: FlowSpec;
  layout: ReturnType<typeof wide> | ReturnType<typeof narrow>;
  maxWidth?: number;
}) {
  const byId = new Map(layout.nodes.map((n) => [n.id, n]));
  const edges = edgesOf(spec, columnsOf(spec));
  return (
    <svg
      viewBox={`0 0 ${layout.W} ${layout.H}`}
      className={layout.dir === 'x' ? 'dg-wide' : 'dg-narrow'}
      style={{ maxWidth: maxWidth ?? layout.W }}
      aria-hidden
      focusable="false"
    >
      {layout.frame && (
        <g className="dg-frame">
          <rect x={layout.frame.x} y={layout.frame.y} width={layout.frame.w} height={layout.frame.h} rx={14} />
        </g>
      )}
      {edges.map(([from, to]) => {
        const a = byId.get(from);
        const b = byId.get(to);
        return a && b ? <Edge key={`${from}-${to}`} a={a} b={b} dir={layout.dir} /> : null;
      })}
      {/* The frame label goes over the arrows, with a halo so lines pass behind it. */}
      {layout.frame && (
        <text x={layout.frame.x + 14} y={layout.frame.y + 21} className="dg-frame-label">
          {layout.frame.label}
        </text>
      )}
      {layout.nodes.map((n) => {
        const Icon = n.icon;
        return (
          <foreignObject key={n.id} x={n.x} y={n.y} width={n.w} height={n.h}>
            <div className="dg-node" data-tone={n.tone ?? 'plain'} data-layout={n.layout} data-track={n.track}>
              <span className="dg-badge">
                <Icon />
              </span>
              <span className="dg-text">
                <span className="dg-label">{n.label}</span>
                {n.sub && <span className="dg-sub">{renderSub(n.sub)}</span>}
              </span>
            </div>
          </foreignObject>
        );
      })}
    </svg>
  );
}

// `maxWidth` lets the wide drawing grow past its own width (the home page uses it).
export function Flow({ spec, className = '', maxWidth }: { spec: FlowSpec; className?: string; maxWidth?: number }) {
  return (
    <figure className={`dg not-prose ${className}`} data-track={spec.track}>
      <div className="dg-canvas" role="img" aria-label={spec.alt}>
        <Drawing spec={spec} layout={wide(spec)} maxWidth={maxWidth} />
        <Drawing spec={spec} layout={narrow(spec)} />
      </div>
      {spec.caption && <figcaption>{spec.caption}</figcaption>}
    </figure>
  );
}
