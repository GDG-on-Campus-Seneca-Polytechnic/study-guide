import { BrainCircuit, Cloud, Code2, Globe, Smartphone } from 'lucide-react';

// The home page illustration: the study guide as a notebook with one index
// tab per track, open on a lesson with a small flow diagram. It echoes the
// guide's own mark (a page with four tabs). Our own shapes, no product logos.
export function HeroArt({ className = '' }: { className?: string }) {
  const tabs = [
    { x: 92, label: 'Web', fill: '#4285F4', text: '#fff' },
    { x: 178, label: 'Cloud', fill: '#34A853', text: '#fff' },
    { x: 264, label: 'AI', fill: '#F9AB00', text: '#1e1e1e' },
    { x: 350, label: 'Mobile', fill: '#EA4335', text: '#fff' },
  ];
  return (
    <svg
      viewBox="0 0 520 440"
      className={`hero-art ${className}`}
      role="img"
      aria-label="Illustration: the study guide as a notebook with four coloured index tabs for the Web, Cloud, AI and Mobile tracks, open on a lesson that shows code flowing to the cloud and out to a phone."
    >
      {/* paper stack */}
      <rect x="64" y="86" width="400" height="320" rx="22" transform="rotate(-5 264 246)" className="ha-paper-2" />
      <rect x="58" y="80" width="400" height="320" rx="22" transform="rotate(3 258 240)" className="ha-paper-1" />
      {/* tabs */}
      {tabs.map((t) => (
        <g key={t.label}>
          <rect x={t.x} y="40" width="78" height="56" rx="12" fill={t.fill} />
          <text x={t.x + 39} y="66" textAnchor="middle" fill={t.text} className="ha-tab-label">
            {t.label}
          </text>
        </g>
      ))}
      {/* page */}
      <rect x="50" y="76" width="420" height="330" rx="22" className="ha-page" />
      {/* lesson header */}
      <rect x="82" y="108" width="44" height="6" rx="3" fill="#34A853" />
      <rect x="82" y="128" width="210" height="14" rx="7" className="ha-ink" />
      <rect x="82" y="152" width="150" height="9" rx="4.5" className="ha-faint" />
      <rect x="82" y="174" width="58" height="20" rx="10" className="ha-chip" />
      <rect x="148" y="174" width="70" height="20" rx="10" className="ha-chip" />
      <rect x="226" y="174" width="52" height="20" rx="10" className="ha-chip" />
      {/* code card */}
      <rect x="306" y="110" width="132" height="84" rx="12" className="ha-code" />
      <rect x="320" y="126" width="40" height="7" rx="3.5" fill="#EA4335" />
      <rect x="366" y="126" width="56" height="7" rx="3.5" className="ha-code-line" />
      <rect x="332" y="142" width="64" height="7" rx="3.5" fill="#4285F4" />
      <rect x="332" y="158" width="88" height="7" rx="3.5" className="ha-code-line" />
      <rect x="320" y="174" width="30" height="7" rx="3.5" fill="#F9AB00" />
      {/* flow: code -> cloud -> phone and web */}
      <rect x="74" y="222" width="372" height="156" rx="16" className="ha-flow-bg" />
      <g className="ha-edge">
        <path d="M168 300 C190 300 196 300 216 300" />
        <path d="M304 300 C326 300 324 266 346 266" />
        <path d="M304 300 C326 300 324 334 346 334" />
      </g>
      <g className="ha-pulse">
        <path d="M168 300 C190 300 196 300 216 300" />
        <path d="M304 300 C326 300 324 266 346 266" />
        <path d="M304 300 C326 300 324 334 346 334" />
      </g>
      <rect x="92" y="262" width="76" height="76" rx="16" className="ha-node" />
      <Code2 x={114} y={284} width={32} height={32} className="ha-icon" />
      <rect x="216" y="258" width="88" height="84" rx="18" fill="#34A853" />
      <Cloud x={242} y={282} width={36} height={36} color="#fff" />
      <rect x="346" y="238" width="78" height="56" rx="14" className="ha-node" />
      <Smartphone x={373} y={254} width={24} height={24} color="#EA4335" />
      <rect x="346" y="306" width="78" height="56" rx="14" className="ha-node" />
      <Globe x={373} y={322} width={24} height={24} color="#4285F4" />
      {/* floating sticker */}
      <g transform="rotate(-8 444 92)">
        <rect x="404" y="70" width="84" height="44" rx="22" fill="#F9AB00" />
        <BrainCircuit x={418} y={80} width={24} height={24} color="#1e1e1e" />
        <text x="448" y="97" className="ha-sticker">AI</text>
      </g>
    </svg>
  );
}
