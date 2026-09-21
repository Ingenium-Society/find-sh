import React from 'react';
import CodeEnhancer from '@/components/CodeEnhancer';
import type { ContentResult } from '@/lib/content';

/**
 * Renders a resolved content file, whichever pipeline produced it.
 *
 * `.md` arrives as an HTML string (remark/rehype), `.mdx` as a React node
 * (next-mdx-remote). Both get the same prose typography and the same
 * client-side code-block enhancement.
 */
export default function ContentRenderer({ result }: { result: ContentResult }) {
  return (
    <CodeEnhancer>
      {result.kind === 'html' ? (
        <article
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: result.html }}
        />
      ) : (
        <article className="prose dark:prose-invert max-w-none">{result.node}</article>
      )}
    </CodeEnhancer>
  );
}
