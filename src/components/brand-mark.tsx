// The study guide's own mark: a page with four index tabs in the chapter palette.
// It is not Google's logo or the GDG lockup; keep it that way (see the brand kit).
export function BrandMark({ className = 'size-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={`shrink-0 ${className}`} aria-hidden>
      <rect x="9" y="3" width="6" height="6" rx="1.5" fill="#4285F4" />
      <rect x="16" y="3" width="6" height="6" rx="1.5" fill="#34A853" />
      <rect x="23" y="3" width="6" height="6" rx="1.5" fill="#F9AB00" />
      <rect x="23" y="10" width="6" height="6" rx="1.5" fill="#EA4335" />
      <rect x="3" y="7" width="22" height="22" rx="3.5" fill="currentColor" />
      <rect x="7.5" y="14" width="10" height="2.4" rx="1.2" fill="var(--mark-line, #fff)" />
      <rect x="7.5" y="19" width="13" height="2.4" rx="1.2" fill="var(--mark-line, #fff)" />
    </svg>
  );
}
