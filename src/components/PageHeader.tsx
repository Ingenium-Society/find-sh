import React from 'react';
import type { Frontmatter } from '@/lib/content';
import CopyPromptButton from '@/components/CopyPromptButton';

/**
 * The header block every content page shares: badges, title, and the
 * "copy prompt for AI" action. Kept in one place so `/tutorials` and the
 * catch-all route cannot drift apart.
 */
export default function PageHeader({ frontmatter }: { frontmatter: Frontmatter }) {
  return (
    <div className="flex flex-col gap-4 border-b border-zinc-200 pb-4 sm:flex-row sm:items-start sm:justify-between dark:border-zinc-800">
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          {frontmatter.category && (
            <span className="rounded bg-zinc-100 px-2 py-0.5 font-medium dark:bg-zinc-800">
              {frontmatter.category}
            </span>
          )}
          {frontmatter.difficulty && (
            <span className="rounded bg-zinc-100 px-2 py-0.5 font-medium capitalize dark:bg-zinc-800">
              {frontmatter.difficulty}
            </span>
          )}
          {frontmatter.updatedAt && <span>Updated: {frontmatter.updatedAt}</span>}
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          {frontmatter.title}
        </h1>
      </div>

      <CopyPromptButton
        title={frontmatter.title}
        category={frontmatter.category}
        difficulty={frontmatter.difficulty}
      />
    </div>
  );
}
