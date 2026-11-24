import type { ReactNode } from 'react';
import { BookCheck } from 'lucide-react';

// "Check:" marks a fact we could not confirm on an official page. Readers
// should confirm it on the linked source before relying on it.
export function Check({ children }: { children: ReactNode }) {
  return (
    <span className="check-note">
      <strong>Check:</strong> {children}
    </span>
  );
}

// The official pages a guide was written from. Goes at the bottom of each guide.
export function Sources({ checked, children }: { checked: string; children: ReactNode }) {
  return (
    <aside className="sources not-prose" aria-labelledby="sources-heading">
      <div className="sources-head">
        <BookCheck aria-hidden />
        <p id="sources-heading">Official sources</p>
        <span className="sources-date">Checked {checked}</span>
      </div>
      <div className="sources-list">{children}</div>
      <p className="sources-note">These pages change. If a step looks different, trust the official page.</p>
    </aside>
  );
}
