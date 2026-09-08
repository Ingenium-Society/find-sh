import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black p-6">
      <main className="flex flex-col items-center max-w-2xl text-center gap-6">
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
          Ingenium Software & AI Tutorials
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Practical, code-focused reference guides for club projects and engineering workflows.
        </p>
        <div className="flex gap-4">
          <Link
            href="/tutorials/what-is-python"
            className="rounded-full bg-foreground text-background px-6 py-3 font-medium hover:opacity-90 transition-opacity"
          >
            Browse Tutorials
          </Link>
        </div>
      </main>
    </div>
  );
}
