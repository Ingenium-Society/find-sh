'use client';

import React, { useState } from 'react';
import FileTree from '@/components/FileTree';
import { TreeNode } from '@/lib/content';
import Link from 'next/link';

interface TutorialsLayoutClientProps {
  tree: TreeNode[];
  children: React.ReactNode;
}

export default function TutorialsLayoutClient({ tree, children }: TutorialsLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-zinc-950">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
            📚 Ingenium Docs
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <FileTree nodes={tree} />
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Top Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-2"
          >
            <span>☰</span> Menu
          </button>
          <Link href="/" className="font-bold text-sm">
            Ingenium Docs
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-12">
          <div className="max-w-3xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
