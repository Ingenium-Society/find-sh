'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TreeNode } from '@/lib/content';

interface FileTreeProps {
  nodes: TreeNode[];
}

export default function FileTree({ nodes }: FileTreeProps) {
  return (
    <ul className="space-y-1 text-sm font-medium">
      {nodes.map((node) => (
        <FileTreeNode key={node.slug} node={node} />
      ))}
    </ul>
  );
}

function FileTreeNode({ node }: { node: TreeNode }) {
  const pathname = usePathname();
  const isActive = pathname === `/tutorials/${node.slug}`;
  const [isOpen, setIsOpen] = useState(true);

  if (node.type === 'folder') {
    const hasClickableIndex = node.hasIndex;
    const isFolderActive = pathname === `/tutorials/${node.slug}`;

    return (
      <li>
        <div className="flex items-center justify-between py-1 px-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 flex-1 text-left font-semibold"
          >
            <span>{isOpen ? '📂' : '📁'}</span>
            <span>{node.name}</span>
          </button>
          {hasClickableIndex && (
            <Link
              href={`/tutorials/${node.slug}`}
              className={`text-xs px-2 py-0.5 rounded ${
                isFolderActive
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              View
            </Link>
          )}
        </div>
        {isOpen && node.children && node.children.length > 0 && (
          <ul className="pl-4 mt-1 space-y-1 border-l border-zinc-200 dark:border-zinc-800">
            {node.children.map((child: TreeNode) => (
              <FileTreeNode key={child.slug} node={child} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={`/tutorials/${node.slug}`}
        className={`block py-1.5 px-2 rounded-md transition-colors ${
          isActive
            ? 'bg-blue-600 text-white font-semibold'
            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        }`}
      >
        📄 {node.frontmatter?.title || node.name}
      </Link>
    </li>
  );
}
