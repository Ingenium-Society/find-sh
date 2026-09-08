import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

const CONTENT_DIR = path.join(process.cwd(), 'content');

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

/**
 * Recursively walk /content to build the navigation tree.
 * Sorts: folders before files, alphabetical within each group.
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
      const indexFilePath = path.join(fullPath, 'index.md');
      const hasIndex = fs.existsSync(/*turbopackIgnore: true*/ indexFilePath);

      let folderFrontmatter: Frontmatter | undefined = undefined;
      if (hasIndex) {
        try {
          const fileContent = fs.readFileSync(/*turbopackIgnore: true*/ indexFilePath, 'utf-8');
          const parsed = matter(fileContent);
          folderFrontmatter = parsed.data as Frontmatter;
        } catch (e) {
          console.error(`Error reading index.md in ${fullPath}:`, e);
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
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const nameWithoutExt = entry.name.replace(/\.md$/, '');
      // index.md is never listed as its own child item — it's already represented
      // by the folder itself (via hasIndex / the "View" link), at every nesting level.
      if (entry.name === 'index.md') {
        continue;
      }

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

  // Sort: explicit "order" in frontmatter first (ascending, missing = last),
  // then folders before files, then alphabetical as a final tiebreaker.
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
        const indexFile = path.join(fullPath, 'index.md');
        if (fs.existsSync(/*turbopackIgnore: true*/ indexFile)) {
          slugs.push(nextParts);
        }
        walk(fullPath, nextParts);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        if (entry.name === 'index.md' && dir === CONTENT_DIR) continue;
        const nameWithoutExt = entry.name.replace(/\.md$/, '');
        slugs.push([...currentSlugParts, nameWithoutExt]);
      }
    }
  }

  walk(CONTENT_DIR);
  return slugs;
}

/**
 * Given a slug array (e.g. ['python-fundamentals', 'syntax-basics'] or ['python-fundamentals']),
 * reads and parses the corresponding .md file into { frontmatter, htmlContent }.
 */
export async function getMarkdownContent(slugParts: string[]): Promise<{ frontmatter: Frontmatter; htmlContent: string } | null> {
  if (slugParts && slugParts.length === 1 && slugParts[0] === 'index') {
    slugParts = [];
  }

  let filePath: string;
  if (!slugParts || slugParts.length === 0) {
    filePath = path.join(CONTENT_DIR, 'index.md');
    if (!fs.existsSync(/*turbopackIgnore: true*/ filePath)) return null;
  } else {
    filePath = path.join(CONTENT_DIR, ...slugParts) + '.md';

    // If path doesn't exist as a file, check if it's a folder with an index.md
    if (!fs.existsSync(/*turbopackIgnore: true*/ filePath)) {
      const indexPath = path.join(CONTENT_DIR, ...slugParts, 'index.md');
      if (fs.existsSync(/*turbopackIgnore: true*/ indexPath)) {
        filePath = indexPath;
      } else {
        return null;
      }
    }
  }

  try {
    const fileContent = fs.readFileSync(/*turbopackIgnore: true*/ filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const processedContent = await remark()
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, {
        behavior: 'wrap',
      })
      .use(rehypePrettyCode, {
        theme: 'github-dark',
        keepBackground: true,
      })
      .use(rehypeStringify)
      .process(content);

    return {
      frontmatter: data as Frontmatter,
      htmlContent: processedContent.toString(),
    };
  } catch (e) {
    console.error(`Error processing markdown for slug ${slugParts.join('/')}:`, e);
    return null;
  }
}
