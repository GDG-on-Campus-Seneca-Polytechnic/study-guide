import type { ReactNode } from 'react';

// "Check:" marks a fact we could not confirm on an official page. Readers
// should confirm it on the linked source before relying on it.
export function Check({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-g-yellow/15 px-1 py-0.5 text-[0.92em] dark:bg-g-yellow/20">
      <strong>Check:</strong> {children}
    </span>
  );
}

// The official pages a guide was written from. Goes at the bottom of each guide.
export function Sources({ checked, children }: { checked: string; children: ReactNode }) {
  return (
    <aside className="mt-12 rounded-lg border border-fd-border p-5 text-sm">
      <p className="m-0 font-semibold">Official sources</p>
      <p className="mt-1 mb-3 text-fd-muted-foreground">Checked on {checked}. These pages change; if a step looks different, trust the official page.</p>
      <div className="[&_ul]:m-0 [&_ul]:pl-5">{children}</div>
    </aside>
  );
}
