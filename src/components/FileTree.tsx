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

function FolderIcon({ isOpen }: { isOpen: boolean }) {
  if (isOpen) {
    return (
      <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg className="w-4 h-4 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
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
            <FolderIcon isOpen={isOpen} />
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
        className={`flex items-center gap-2 py-1.5 px-2 rounded-md transition-colors ${
          isActive
            ? 'bg-blue-600 text-white font-semibold'
            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        }`}
      >
        <FileIcon />
        <span>{node.frontmatter?.title || node.name}</span>
      </Link>
    </li>
  );
}
