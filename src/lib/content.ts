import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { compileMDX } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/lib/mdx-components';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/** Extensions treated as content files. Order matters only for index lookup. */
const CONTENT_EXTENSIONS = ['.md', '.mdx'] as const;

export interface Frontmatter {
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  updatedAt: string;
  order?: number;
}

export interface TreeNode {
  name: string;
  slug: string;
  path: string;
  type: 'file' | 'folder';
  frontmatter?: Frontmatter;
  children?: TreeNode[];
  hasIndex?: boolean;
}

function isContentFile(name: string): boolean {
  return CONTENT_EXTENSIONS.some((ext) => name.endsWith(ext));
}

function isIndexFile(name: string): boolean {
  return name === 'index.md' || name === 'index.mdx';
}

function stripExtension(name: string): string {
  return name.replace(/\.(md|mdx)$/, '');
}

/** Finds `index.md` or `index.mdx` in a folder, preferring `.md`. */
function findIndexFile(dir: string): string | null {
  for (const ext of CONTENT_EXTENSIONS) {
    const candidate = path.join(dir, `index${ext}`);
    if (fs.existsSync(/*turbopackIgnore: true*/ candidate)) return candidate;
  }
  return null;
}

/**
 * Recursively walk /content to build the navigation tree.
 * Sorts: explicit `order` first (ascending, missing = last), then folders
 * before files, then alphabetical as a final tiebreaker.
 */
export function getNavigationTree(dir: string = CONTENT_DIR, baseSlug: string = ''): TreeNode[] {
  if (!fs.existsSync(/*turbopackIgnore: true*/ dir)) return [];

  const entries = fs.readdirSync(/*turbopackIgnore: true*/ dir, { withFileTypes: true });
  const nodes: TreeNode[] = [];

  for (const entry of entries) {
    // Skip hidden files/folders
    if (entry.name.startsWith('.')) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const folderSlug = baseSlug ? `${baseSlug}/${entry.name}` : entry.name;
      const indexFilePath = findIndexFile(fullPath);
      const hasIndex = indexFilePath !== null;

      let folderFrontmatter: Frontmatter | undefined = undefined;
      if (indexFilePath) {
        try {
          const fileContent = fs.readFileSync(/*turbopackIgnore: true*/ indexFilePath, 'utf-8');
          const parsed = matter(fileContent);
          folderFrontmatter = parsed.data as Frontmatter;
        } catch (e) {
          console.error(`Error reading index file in ${fullPath}:`, e);
        }
      }

      const children = getNavigationTree(fullPath, folderSlug);

      nodes.push({
        name: entry.name,
        slug: folderSlug,
        path: path.relative(CONTENT_DIR, fullPath),
        type: 'folder',
        hasIndex,
        frontmatter: folderFrontmatter,
        children,
      });
    } else if (entry.isFile() && isContentFile(entry.name)) {
      // index files are never listed as their own child item — they're already
      // represented by the folder itself (via hasIndex / the "View" link).
      if (isIndexFile(entry.name)) {
        continue;
      }

      const nameWithoutExt = stripExtension(entry.name);
      const fileSlug = baseSlug ? `${baseSlug}/${nameWithoutExt}` : nameWithoutExt;
      const fileContent = fs.readFileSync(/*turbopackIgnore: true*/ fullPath, 'utf-8');
      const parsed = matter(fileContent);

      nodes.push({
        name: nameWithoutExt,
        slug: fileSlug,
        path: path.relative(CONTENT_DIR, fullPath),
        type: 'file',
        frontmatter: parsed.data as Frontmatter,
      });
    }
  }

  return nodes.sort((a, b) => {
    const orderA = a.frontmatter?.order ?? Infinity;
    const orderB = b.frontmatter?.order ?? Infinity;
    if (orderA !== orderB) return orderA - orderB;

    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;

    return a.name.localeCompare(b.name);
  });
}

/**
 * Returns a flat list of all valid slug arrays for generateStaticParams.
 */
export function getAllSlugs(): string[][] {
  const slugs: string[][] = [];

  function walk(dir: string, currentSlugParts: string[] = []) {
    if (!fs.existsSync(/*turbopackIgnore: true*/ dir)) return;
    const entries = fs.readdirSync(/*turbopackIgnore: true*/ dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue;
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        const nextParts = [...currentSlugParts, entry.name];
        if (findIndexFile(fullPath)) {
          slugs.push(nextParts);
        }
        walk(fullPath, nextParts);
      } else if (entry.isFile() && isContentFile(entry.name)) {
        if (isIndexFile(entry.name) && dir === CONTENT_DIR) continue;
        const nameWithoutExt = stripExtension(entry.name);
        slugs.push([...currentSlugParts, nameWithoutExt]);
      }
    }
  }

  walk(CONTENT_DIR);
  return slugs;
}

/**
 * Resolves a slug array to a file path on disk, or null if nothing matches.
 * Handles the folder-with-index-file case.
 */
function resolveContentFile(slugParts: string[]): string | null {
  if (!slugParts || slugParts.length === 0) {
    return findIndexFile(CONTENT_DIR);
  }

  const base = path.join(CONTENT_DIR, ...slugParts);

  for (const ext of CONTENT_EXTENSIONS) {
    const asFile = base + ext;
    if (fs.existsSync(/*turbopackIgnore: true*/ asFile)) return asFile;
  }

  return findIndexFile(base);
}

export type ContentResult =
  | { frontmatter: Frontmatter; kind: 'html'; html: string }
  | { frontmatter: Frontmatter; kind: 'mdx'; node: React.ReactNode };

/**
 * Given a slug array (e.g. ['terminal-basics', 'what-is-a-terminal'] or
 * ['terminal-basics']), reads the corresponding content file.
 *
 * `.md` files are rendered to an HTML string via remark/rehype.
 * `.mdx` files are compiled to a React node via next-mdx-remote.
 *
 * Both run at build time only — never on a live serverless request path.
 */
export async function getMarkdownContent(slugParts: string[]): Promise<ContentResult | null> {
  if (slugParts && slugParts.length === 1 && slugParts[0] === 'index') {
    slugParts = [];
  }

  const filePath = resolveContentFile(slugParts ?? []);
  if (!filePath) return null;

  try {
    const fileContent = fs.readFileSync(/*turbopackIgnore: true*/ filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const frontmatter = data as Frontmatter;

    if (filePath.endsWith('.mdx')) {
      const { content: node } = await compileMDX({
        source: content,
        components: mdxComponents,
        options: {
          // Frontmatter is already handled by gray-matter above.
          parseFrontmatter: false,
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
              [
                rehypePrettyCode,
                {
                  theme: {
                    light: 'github-light',
                    dark: 'github-dark',
                  },
                  keepBackground: false,
                },
              ],
            ],
          },
        },
      });

      return { frontmatter, kind: 'mdx', node };
    }

    const processedContent = await remark()
      .use(remarkGfm)
      // Raw HTML in markdown is preserved rather than dropped — this is what
      // makes one-off <details> blocks work without converting a file to MDX.
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, {
        behavior: 'wrap',
      })
      .use(rehypePrettyCode, {
        theme: {
          light: 'github-light',
          dark: 'github-dark',
        },
        keepBackground: false,
      })
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content);

    return { frontmatter, kind: 'html', html: processedContent.toString() };
  } catch (e) {
    console.error(`Error processing content for slug ${slugParts.join('/')}:`, e);
    return null;
  }
}
