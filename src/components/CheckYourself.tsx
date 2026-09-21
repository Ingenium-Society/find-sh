'use client';

import React, { useState } from 'react';

interface CheckYourselfProps {
  question: string;
  children: React.ReactNode;
}

/**
 * A self-check: a question the reader answers in their head, then reveals.
 * Deliberately not scored — the point is recall, not assessment.
 */
export default function CheckYourself({ question, children }: CheckYourselfProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-start gap-3 bg-zinc-50 px-4 py-3 dark:bg-zinc-900">
        <span className="mt-0.5 shrink-0 rounded bg-zinc-200 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          Check
        </span>
        <p className="text-sm font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
          {question}
        </p>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
          aria-expanded={open}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-90' : ''}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
          </svg>
          {open ? 'Hide answer' : 'Show answer'}
        </button>

        {open && (
          <div className="border-t border-zinc-200 bg-white px-4 py-3 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
