/**
 * Content validation for /content.
 *
 * Runs three checks that catch different classes of failure:
 *
 *   1. Frontmatter  — required fields present, difficulty in the allowed set
 *   2. Links        — every internal /tutorials link resolves to a real route
 *   3. MDX compile  — every .mdx file actually compiles
 *
 * Check 3 matters most. A file can have perfect frontmatter and valid links and
 * still fail to compile — and because getMarkdownContent catches compile errors
 * and returns null, the page 404s with no build failure and no obvious cause.
 * That is a silent, production-only failure. This catches it locally.
 *
 * Usage:  node scripts/check-content.mjs      (or: npm run check:content)
 * Exits 1 if anything fails.
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compile } from '@mdx-js/mdx';

const CONTENT = 'content';
const REQUIRED = ['title', 'category', 'difficulty', 'updatedAt'];
const DIFFICULTIES = new Set(['beginner', 'intermediate', 'advanced']);
const CONTENT_EXT = /\.(md|mdx)$/;

const problems = [];
const add = (kind, msg) => problems.push(`  [${kind}] ${msg}`);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (CONTENT_EXT.test(entry.name)) out.push(full);
  }
  return out;
}

const files = walk(CONTENT);

// ---------------------------------------------------------------- 1. frontmatter
for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8');
  if (!raw.startsWith('---')) {
    add('frontmatter', `${file} — no frontmatter block`);
    continue;
  }
  const { data } = matter(raw);
  for (const field of REQUIRED) {
    if (!data[field]) add('frontmatter', `${file} — missing "${field}"`);
  }
  if (data.difficulty && !DIFFICULTIES.has(data.difficulty)) {
    add('frontmatter', `${file} — difficulty "${data.difficulty}" not in ${[...DIFFICULTIES].join(' | ')}`);
  }
}

// ---------------------------------------------------------------- 2. routes + links
const validRoutes = new Set(['/tutorials']);
const isIndex = (n) => n === 'index.md' || n === 'index.mdx';
const findIndex = (dir) => ['.md', '.mdx'].some((e) => fs.existsSync(path.join(dir, `index${e}`)));

(function buildRoutes(dir, parts) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const next = [...parts, entry.name];
      if (findIndex(full)) validRoutes.add(`/tutorials/${next.join('/')}`);
      buildRoutes(full, next);
    } else if (CONTENT_EXT.test(entry.name)) {
      if (isIndex(entry.name) && dir === CONTENT) continue;
      validRoutes.add(`/tutorials/${[...parts, entry.name.replace(CONTENT_EXT, '')].join('/')}`);
    }
  }
})(CONTENT, []);

let linksChecked = 0;
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/\]\((\/tutorials[^)#]*)/g)) {
    linksChecked++;
    const target = m[1].replace(/\/$/, '') || '/tutorials';
    if (!validRoutes.has(target)) add('link', `${file} — ${target} does not exist`);
  }
}

// ---------------------------------------------------------------- 3. MDX compile
const mdxFiles = files.filter((f) => f.endsWith('.mdx'));
for (const file of mdxFiles) {
  const { content } = matter(fs.readFileSync(file, 'utf8'));
  try {
    await compile(content);
  } catch (e) {
    const [first, ...rest] = String(e.message).split('\n');
    add('mdx', `${file} — ${first.trim()}${rest.length ? ` (${rest[0].trim()})` : ''}`);
  }
}

// ---------------------------------------------------------------- report
const md = files.filter((f) => f.endsWith('.md')).length;

console.log(`content files : ${files.length}  (${md} .md, ${mdxFiles.length} .mdx)`);
console.log(`routes        : ${validRoutes.size}`);
console.log(`links checked : ${linksChecked}`);

if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  console.log(problems.join('\n'));
  process.exit(1);
}

console.log('\nall checks passed');
