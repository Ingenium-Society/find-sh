/**
 * Turns a rendered tutorial page into the prompt a reader copies.
 *
 * Kept separate from the button so the text logic can be exercised without a
 * browser, and so the prompt wording lives in one obvious place.
 */

export interface PromptMeta {
  title: string;
  category?: string;
  difficulty?: string;
  url?: string;
}

/** Hard cap so a pasted prompt never blows up a chat box. */
export const MAX_PROMPT_CHARS = 20000;

/**
 * Serialises a rendered article into plain markdown-ish text.
 *
 * Walks the DOM instead of using `innerText` because `innerText` depends on
 * layout and collapses code blocks unpredictably. This keeps fenced code
 * blocks, list items, tables and headings intact — which is what makes the
 * copied prompt actually readable to a model.
 */
export function serializeNode(node: Node): string {
  if (node.nodeType === 3) return node.nodeValue ?? '';
  if (node.nodeType !== 1) return '';

  const el = node as HTMLElement;
  const tag = el.tagName;

  // Never leak our own UI into the prompt. `data-prompt-skip` is the explicit
  // opt-out for component chrome that isn't content.
  if (el.hasAttribute('data-copy-button') || el.hasAttribute('data-prompt-skip')) return '';
  if (tag === 'BUTTON' || tag === 'SVG' || tag === 'SCRIPT' || tag === 'STYLE') return '';

  const inner = () => Array.from(el.childNodes).map(serializeNode).join('');

  if (tag === 'PRE') {
    const code = el.querySelector('code');
    const lang = el.getAttribute('data-language') ?? '';
    // rehype-pretty-code lays lines out as grid rows with no newline text nodes
    // between them, so `textContent` would glue `cd ..` and `ls` together.
    // Read the line spans directly instead.
    const lines = code?.querySelectorAll('[data-line]');
    const body = (
      lines && lines.length > 0
        ? Array.from(lines)
            .map((line) => (line.textContent ?? '').replace(/\s+$/, ''))
            .join('\n')
        : (code?.textContent ?? el.textContent ?? '')
    ).replace(/\n+$/, '');
    return `\n\n\`\`\`${lang}\n${body}\n\`\`\`\n\n`;
  }

  if (tag === 'TABLE') {
    const trs = Array.from(el.querySelectorAll('tr'));
    const rows = trs.map((tr) =>
      Array.from(tr.querySelectorAll('th,td'))
        .map((cell) => (cell.textContent ?? '').trim().replace(/\s+/g, ' '))
        .join(' | ')
    );
    if (rows.length === 0) return '';
    const columns = trs[0].querySelectorAll('th,td').length;
    const lines = rows.map((row) => `| ${row} |`);
    // Markdown tables need a separator under the header row or models read the
    // whole thing as prose.
    lines.splice(1, 0, `| ${Array.from({ length: columns }, () => '---').join(' | ')} |`);
    return `\n\n${lines.join('\n')}\n\n`;
  }

  if (tag === 'CODE') return `\`${el.textContent ?? ''}\``;
  if (tag === 'BR') return '\n';
  if (tag === 'HR') return '\n\n---\n\n';

  if (/^H[1-6]$/.test(tag)) {
    const level = Number(tag[1]);
    return `\n\n${'#'.repeat(level)} ${inner().trim()}\n\n`;
  }

  if (tag === 'LI') return `- ${inner().trim()}\n`;
  if (tag === 'SUMMARY') return `\n**${inner().trim()}**\n`;

  const BLOCK = new Set([
    'P', 'DIV', 'SECTION', 'ARTICLE', 'BLOCKQUOTE', 'DETAILS',
    'UL', 'OL', 'THEAD', 'TBODY', 'TR', 'TD', 'TH', 'FIGURE', 'FIGCAPTION',
  ]);

  if (BLOCK.has(tag)) return `\n\n${inner().trim()}\n\n`;

  return inner();
}

/** Extracts clean page text from the rendered `<article>`. */
export function extractArticleText(article: Element | null): string {
  if (!article) return '';

  const raw = Array.from(article.childNodes).map(serializeNode).join('');
  const cleaned = raw
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Insurance: if the walk missed everything (unexpected markup), fall back to
  // the browser's own rendering rather than sending an empty prompt.
  if (cleaned.length < 120) {
    const fallback = ((article as HTMLElement).innerText ?? '').trim();
    if (fallback.length > cleaned.length) return fallback.slice(0, MAX_PROMPT_CHARS);
  }

  if (cleaned.length <= MAX_PROMPT_CHARS) return cleaned;
  return `${cleaned.slice(0, MAX_PROMPT_CHARS)}\n\n[...page truncated for length...]`;
}

/** Assembles the final prompt: metadata, instructions, then the page text. */
export function buildPrompt(meta: PromptMeta, pageText: string): string {
  const metaLines = [
    `Page: "${meta.title}"`,
    meta.category ? `Section: ${meta.category}` : null,
    meta.difficulty ? `Level: ${meta.difficulty}` : null,
    meta.url ? `URL: ${meta.url}` : null,
  ].filter((line): line is string => Boolean(line));

  const instructions = [
    'I am reading it on my own and I get stuck easily, so:',
    '1. Open with a two-sentence plain-language summary of what this page teaches.',
    '2. Walk through the key ideas in the order they appear, explaining anything a first-timer would not know.',
    '3. Call out every command, file, or error message mentioned, and say what it does or why it appears.',
    '4. Give me one small thing to try on my own machine, with the exact commands.',
    '5. Name the most common beginner mistake here and how to spot it.',
    '6. Finish with two questions to check whether I understood — do not reveal the answers yet.',
    '',
    'Teach it to me rather than restating the page. Reply in the language I write to you in.',
  ];

  return [
    'You are helping me understand a page from a beginner programming curriculum.',
    '',
    ...metaLines,
    '',
    ...instructions,
    '',
    '--- PAGE CONTENT START ---',
    '',
    pageText,
    '',
    '--- PAGE CONTENT END ---',
  ].join('\n');
}
