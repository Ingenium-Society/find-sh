'use client';

import React, { useEffect, useState } from 'react';

interface CommandTabsProps {
  /** Label shown above the tabs, e.g. "Activate the environment" */
  label?: string;
  mac?: string;
  linux?: string;
  windows?: string;
  /** Shown when a platform has no equivalent command */
  windowsNote?: string;
}

const PLATFORM_LABEL: Record<string, string> = {
  mac: 'macOS',
  linux: 'Linux',
  windows: 'Windows',
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text).then(
          () => setCopied(true),
          () => setCopied(false)
        );
      }}
      className="absolute right-2 top-2 rounded border border-zinc-300/60 bg-white/80 px-2 py-1 text-xs font-medium text-zinc-600 transition-colors hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:bg-zinc-900"
      aria-label="Copy command"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

export default function CommandTabs({
  label,
  mac,
  linux,
  windows,
  windowsNote,
}: CommandTabsProps) {
  const available = (['mac', 'linux', 'windows'] as const).filter(
    (p) => p === 'windows' ? Boolean(windows || windowsNote) : Boolean({ mac, linux }[p])
  );

  const [active, setActive] = useState<string>(available[0] ?? 'mac');

  // Prefer the platform the reader is actually on, once we can tell.
  useEffect(() => {
    const ua = navigator.userAgent;
    const detected = /Windows/i.test(ua) ? 'windows' : /Mac OS X|Macintosh/i.test(ua) ? 'mac' : 'linux';
    if (available.includes(detected as (typeof available)[number])) setActive(detected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const commands: Record<string, string | undefined> = { mac, linux, windows };
  const current = commands[active];

  return (
    <div className="not-prose my-6">
      {label && (
        <div className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</div>
      )}

      {available.length > 1 && (
        <div className="mb-0 flex gap-1 border-b border-zinc-200 dark:border-zinc-800">
          {available.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setActive(p)}
              className={`-mb-px rounded-t border-b-2 px-3 py-1.5 text-xs font-medium transition-colors ${
                active === p
                  ? 'border-blue-500 text-blue-700 dark:text-blue-300'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              {PLATFORM_LABEL[p]}
            </button>
          ))}
        </div>
      )}

      {current ? (
        <div className="relative">
          <pre className="overflow-x-auto rounded-b-lg rounded-tr-lg border border-zinc-200 bg-zinc-50 p-4 pr-16 text-sm leading-relaxed dark:border-zinc-800 dark:bg-zinc-900">
            <code className="font-mono text-zinc-800 dark:text-zinc-200">{current}</code>
          </pre>
          <CopyButton text={current} />
        </div>
      ) : (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          {windowsNote ?? 'No equivalent command on this platform.'}
        </div>
      )}
    </div>
  );
}
