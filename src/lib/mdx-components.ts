import type { MDXComponents } from 'mdx/types';
import Callout from '@/components/Callout';
import CommandTabs from '@/components/CommandTabs';
import CheckYourself from '@/components/CheckYourself';
import FileSystemExplorer from '@/components/FileSystemExplorer';

/**
 * Components available globally inside any .mdx file in /content.
 *
 * Passed to `compileMDX` in src/lib/content.ts, so authors use them by name
 * with no import statement. See AGENTS.md for the authoring contract.
 */
export const mdxComponents: MDXComponents = {
  Callout,
  CommandTabs,
  CheckYourself,
  FileSystemExplorer,
};

export default mdxComponents;
