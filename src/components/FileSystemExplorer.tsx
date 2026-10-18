'use client';

import React, { useCallback, useMemo, useState } from 'react';

interface Node {
  name: string;
  path: string;
  dir?: boolean;
  hidden?: boolean;
  children?: Node[];
}

const HOME = '/Users/you';

const TREE: Node = {
  name: 'you',
  path: HOME,
  dir: true,
  children: [
    {
      name: 'notes',
      path: `${HOME}/notes`,
      dir: true,
      children: [
        { name: 'todo.txt', path: `${HOME}/notes/todo.txt` },
        { name: 'ideas.md', path: `${HOME}/notes/ideas.md` },
      ],
    },
    {
      name: 'scripts',
      path: `${HOME}/scripts`,
      dir: true,
      children: [
        { name: 'hello.py', path: `${HOME}/scripts/hello.py` },
        { name: 'backup.sh', path: `${HOME}/scripts/backup.sh` },
      ],
    },
    { name: 'README.md', path: `${HOME}/README.md` },
    { name: '.env', path: `${HOME}/.env`, hidden: true },
  ],
};

const COMMANDS = ['pwd', 'ls', 'ls -a', 'cd notes', 'cd scripts', 'cd ..', 'cd ~'];

function findNode(path: string, node: Node = TREE): Node | null {
  if (node.path === path) return node;
  if (!node.children) return null;
  for (const child of node.children) {
    const found = findNode(path, child);
    if (found) return found;
  }
  return null;
}

interface LogEntry {
  id: number;
  kind: 'command' | 'output' | 'error' | 'note';
  text: string;
}

export default function FileSystemExplorer() {
  const [cwd, setCwd] = useState(HOME);
  const [log, setLog] = useState<LogEntry[]>([
    { id: 0, kind: 'note', text: 'Click a command, or click a folder in the tree.' },
  ]);
  const [hint, setHint] = useState<string>(
    'Every command below does one thing to the directory. Nothing here creates or deletes files — watch what changes and what does not.'
  );

  const push = useCallback((entries: Omit<LogEntry, 'id'>[]) => {
    setLog((prev) => {
      const next = [...prev];
      entries.forEach((e, i) => next.push({ ...e, id: prev.length + i }));
      return next.slice(-40);
    });
  }, []);

  const run = useCallback(
    (cmd: string) => {
      const entries: Omit<LogEntry, 'id'>[] = [{ kind: 'command', text: `${cwd.replace(HOME, '~')} % ${cmd}` }];
      let note = '';

      if (cmd === 'pwd') {
        entries.push({ kind: 'output', text: cwd });
        note = 'pwd prints the full path of the folder you are standing in. It answers "where am I?"';
      } else if (cmd === 'ls' || cmd === 'ls -a') {
        const node = findNode(cwd);
        const showHidden = cmd === 'ls -a';
        const names = (node?.children ?? [])
          .filter((c) => showHidden || !c.hidden)
          .map((c) => (c.dir ? `${c.name}/` : c.name));
        entries.push({ kind: 'output', text: names.join('   ') });
        note = showHidden
          ? 'ls -a includes hidden files. Names starting with a dot are hidden by default — which is why secrets live in .env.'
          : 'ls lists what is inside the current folder. The trailing slash on folders is a convention, not part of the name.';
      } else if (cmd === 'cd ..') {
        if (cwd === HOME) {
          entries.push({ kind: 'error', text: 'cd: there is nothing above your home folder' });
          note = 'You are already at the top. cd .. means "go up one level", and there is no level above home.';
        } else {
          setCwd(cwd.slice(0, cwd.lastIndexOf('/')));
          note = 'cd .. moves you up one level. .. always means "the folder containing this one".';
        }
      } else if (cmd === 'cd ~') {
        setCwd(HOME);
        note = 'cd ~ takes you home from anywhere. ~ is shorthand for your home folder — the escape hatch when you are lost.';
      } else if (cmd.startsWith('cd ')) {
        const target = cmd.slice(3);
        const next = `${cwd}/${target}`;
        const node = findNode(next);
        if (node?.dir) {
          setCwd(next);
          note = `cd ${target} moves you into that folder. Nothing was created or changed — cd only changes where you are standing.`;
        } else {
          entries.push({ kind: 'error', text: `cd: no such file or directory: ${target}` });
          note = `There is no folder called "${target}" here. This is the most common terminal error, and it almost always means the wrong folder or a typo.`;
        }
      }

      push(entries);
      setHint(note);
    },
    [cwd, push]
  );

  const rows = useMemo(() => {
    const out: { node: Node; prefix: string; isLast: boolean; isRoot: boolean }[] = [];
    const walk = (node: Node, prefix: string, isLast: boolean, isRoot: boolean) => {
      out.push({ node, prefix, isLast, isRoot });
      node.children?.forEach((child, i) =>
        walk(child, isRoot ? '' : prefix + (isLast ? '   ' : '│  '), i === node.children!.length - 1, false)
      );
    };
    walk(TREE, '', true, true);
    return out;
  }, []);

  return (
    <div className="not-prose my-6" data-prompt-skip>
      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-zinc-500 dark:text-zinc-400">You are here</span>
        <code className="rounded-md bg-blue-500/10 px-2 py-1 font-mono text-[13px] text-blue-700 dark:text-blue-300">
          {cwd}
        </code>
      </div>

      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">The filesystem</p>
          <div className="font-mono text-[13px] leading-[1.85]">
            {(() => {
              const root = rows[0];
              const atRoot = root.node.path === cwd;
              return (
                <div
                  className={
                    atRoot
                      ? 'font-medium text-blue-700 dark:text-blue-300'
                      : 'text-zinc-500 dark:text-zinc-400'
                  }
                >
                  {root.node.name}  (home)
                  {atRoot && (
                    <span className="text-zinc-400 dark:text-zinc-500">  ← you are here</span>
                  )}
                </div>
              );
            })()}

            {rows.slice(1).map(({ node, prefix, isLast }) => {
              const here = node.path === cwd;
              // A node is on the path to cwd only if cwd is inside it, not merely
              // a string prefix of it (otherwise "/Users/you2" would match "/Users/you").
              const onPath = cwd === node.path || cwd.startsWith(`${node.path}/`);
              const clickable = Boolean(node.dir);

              return (
                <div
                  key={node.path}
                  onClick={clickable ? () => run(`cd ${node.name}`) : undefined}
                  className={
                    (here
                      ? 'font-medium text-blue-700 dark:text-blue-300'
                      : onPath
                        ? 'text-zinc-800 dark:text-zinc-200'
                        : 'text-zinc-500 dark:text-zinc-400') +
                    (clickable ? ' cursor-pointer hover:underline' : '')
                  }
                >
                  {prefix}
                  {isLast ? '└─ ' : '├─ '}
                  {node.name}
                  {here && (
                    <span className="text-zinc-400 dark:text-zinc-500">  ← you are here</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="mb-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">Terminal</p>
            <div className="h-[150px] overflow-y-auto font-mono text-[12.5px] leading-[1.7]">
              {log.map((entry) => (
                <div
                  key={entry.id}
                  className={
                    entry.kind === 'command'
                      ? 'font-medium text-zinc-900 dark:text-zinc-100'
                      : entry.kind === 'error'
                        ? 'text-amber-700 dark:text-amber-400'
                        : entry.kind === 'note'
                          ? 'text-zinc-400 dark:text-zinc-500'
                          : 'text-blue-700 dark:text-blue-300'
                  }
                >
                  {entry.text}
                </div>
              ))}
            </div>
          </div>

          <p className="mb-3 min-h-[2.5rem] text-[12.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            {hint}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {COMMANDS.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => run(cmd)}
                className="rounded border border-zinc-300 px-2 py-1 font-mono text-xs text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
