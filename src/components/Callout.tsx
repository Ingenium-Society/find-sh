import React from 'react';

type Variant = 'note' | 'tip' | 'warning' | 'danger';

const VARIANTS: Record<
  Variant,
  { wrap: string; label: string; text: string; icon: React.ReactNode }
> = {
  note: {
    wrap: 'border-blue-500/40 bg-blue-500/[0.06]',
    label: 'text-blue-700 dark:text-blue-300',
    text: 'Note',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M12 11v5M12 8h.01" />
      </svg>
    ),
  },
  tip: {
    wrap: 'border-emerald-500/40 bg-emerald-500/[0.06]',
    label: 'text-emerald-700 dark:text-emerald-300',
    text: 'Tip',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18h6M10 21h4M12 3a6 6 0 00-3 11v2h6v-2a6 6 0 00-3-11z" />
      </svg>
    ),
  },
  warning: {
    wrap: 'border-amber-500/40 bg-amber-500/[0.07]',
    label: 'text-amber-700 dark:text-amber-300',
    text: 'Careful',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.3 3.9L2.4 17a2 2 0 001.7 3h15.8a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
        <path strokeLinecap="round" d="M12 9v4M12 17h.01" />
      </svg>
    ),
  },
  danger: {
    wrap: 'border-red-500/40 bg-red-500/[0.07]',
    label: 'text-red-700 dark:text-red-300',
    text: 'This destroys data',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M15 9l-6 6M9 9l6 6" />
      </svg>
    ),
  },
};

interface CalloutProps {
  variant?: Variant;
  title?: string;
  children: React.ReactNode;
}

export default function Callout({ variant = 'note', title, children }: CalloutProps) {
  const v = VARIANTS[variant] ?? VARIANTS.note;

  return (
    <div className={`not-prose my-6 rounded-lg border px-4 py-3 ${v.wrap}`}>
      <div className={`mb-1 flex items-center gap-2 text-sm font-semibold ${v.label}`}>
        {v.icon}
        <span>{title ?? v.text}</span>
      </div>
      <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 [&>p]:my-1 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
