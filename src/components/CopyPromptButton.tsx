'use client';

import React, { useEffect, useRef, useState } from 'react';
import { buildPrompt, extractArticleText } from '@/lib/ai-prompt';

interface CopyPromptButtonProps {
  title: string;
  category?: string;
  difficulty?: string;
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the legacy path — insecure contexts and some browsers
    // reject the async clipboard API.
  }

  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

const AI_LINKS = [
  { label: 'ChatGPT', href: 'https://chatgpt.com/' },
  { label: 'Claude', href: 'https://claude.ai/new' },
  { label: 'Gemini', href: 'https://gemini.google.com/app' },
];

/**
 * Copies a ready-made prompt (page metadata + full page text) so a reader can
 * paste it into any AI chat and get the page explained conversationally.
 *
 * The prompt is built at click time from the live DOM: one button covers every
 * page without any per-page authoring, and it always matches what is on screen.
 */
export default function CopyPromptButton({ title, category, difficulty }: CopyPromptButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [failedPrompt, setFailedPrompt] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  const handleCopy = async () => {
    const article = document.querySelector('article');
    const prompt = buildPrompt(
      { title, category, difficulty, url: window.location.href },
      extractArticleText(article)
    );

    const ok = await copyText(prompt);

    if (timerRef.current) clearTimeout(timerRef.current);

    if (ok) {
      setStatus('copied');
      setPanelOpen(true);
      setFailedPrompt('');
      timerRef.current = setTimeout(() => setStatus('idle'), 4000);
    } else {
      setStatus('failed');
      setFailedPrompt(prompt);
      setPanelOpen(true);
      setTimeout(() => areaRef.current?.select(), 0);
    }
  };

  return (
    <div className="not-prose shrink-0">
      <button
        type="button"
        onClick={handleCopy}
        className={
          'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ' +
          (status === 'copied'
            ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
            : 'border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 hover:text-zinc-900 ' +
              'dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-zinc-100')
        }
        aria-live="polite"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-3.5 w-3.5"
          aria-hidden="true"
        >
          {status === 'copied' ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
          ) : (
            <>
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path strokeLinecap="round" d="M15 5.5A1.5 1.5 0 0013.5 4h-8A1.5 1.5 0 004 5.5v8A1.5 1.5 0 005.5 15" />
            </>
          )}
        </svg>
        {status === 'copied'
          ? 'Prompt copied'
          : status === 'failed'
            ? 'Copy failed — select manually'
            : 'Copy prompt for AI to explain this'}
      </button>

      {panelOpen && (
        <div className="mt-2 max-w-sm rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs leading-relaxed text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          {status === 'failed' ? (
            <>
              <p className="mb-2 font-medium text-zinc-800 dark:text-zinc-200">
                Clipboard is blocked in this browser. Copy the text below yourself.
              </p>
              <textarea
                ref={areaRef}
                readOnly
                value={failedPrompt}
                rows={5}
                onFocus={(e) => e.currentTarget.select()}
                className="w-full resize-y rounded border border-zinc-300 bg-white p-2 font-mono text-[11px] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
              />
            </>
          ) : (
            <>
              <p className="mb-1 font-medium text-zinc-800 dark:text-zinc-200">
                Copied the whole page plus a prompt. Paste it into any AI chat.
              </p>
              <p className="mb-2">It will explain the page, walk the commands, and quiz you back.</p>
              <div className="flex flex-wrap gap-1.5">
                {AI_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded border border-zinc-300 bg-white px-2 py-1 font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                  >
                    Open {link.label} ↗
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
