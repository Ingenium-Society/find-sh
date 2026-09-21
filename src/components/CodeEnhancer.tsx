'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Adds a copy button to every code block inside the rendered content.
 *
 * Done as a DOM pass rather than a React wrapper because code blocks arrive
 * from two different pipelines — `.md` produces an HTML string rendered via
 * `dangerouslySetInnerHTML`, `.mdx` produces React elements. A post-render
 * pass covers both without either renderer needing to know about it.
 */
export default function CodeEnhancer({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const cleanups: (() => void)[] = [];

    root.querySelectorAll('pre').forEach((pre) => {
      if (pre.querySelector('[data-copy-button]')) return;

      const el = pre as HTMLElement;
      el.style.position = 'relative';

      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.copyButton = 'true';
      button.textContent = 'Copy';
      button.setAttribute('aria-label', 'Copy code to clipboard');
      button.className =
        'absolute right-2 top-2 rounded border border-zinc-300/70 bg-white/85 px-2 py-1 ' +
        'text-xs font-medium text-zinc-600 backdrop-blur transition-colors ' +
        'hover:bg-white hover:text-zinc-900 ' +
        'dark:border-zinc-700 dark:bg-zinc-900/85 dark:text-zinc-400 ' +
        'dark:hover:bg-zinc-900 dark:hover:text-zinc-100';
      // Never include the button's own label when a reader selects the block.
      button.style.userSelect = 'none';

      let timer: ReturnType<typeof setTimeout> | undefined;

      const onClick = () => {
        const code = el.querySelector('code');
        const text = (code ?? el).textContent ?? '';
        navigator.clipboard?.writeText(text).then(
          () => {
            button.textContent = 'Copied';
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
              button.textContent = 'Copy';
            }, 1600);
          },
          () => {
            button.textContent = 'Failed';
          }
        );
      };

      button.addEventListener('click', onClick);
      el.appendChild(button);

      cleanups.push(() => {
        if (timer) clearTimeout(timer);
        button.removeEventListener('click', onClick);
        button.remove();
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [pathname, children]);

  return <div ref={containerRef}>{children}</div>;
}
