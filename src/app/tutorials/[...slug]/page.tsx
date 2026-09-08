import { notFound } from 'next/navigation';
import { getAllSlugs, getMarkdownContent } from '@/lib/content';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug: string[]) => ({
    slug,
  }));
}

export default async function TutorialPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slugParts = resolvedParams.slug;
  const result = await getMarkdownContent(slugParts);

  if (!result) {
    notFound();
  }

  const { frontmatter, htmlContent } = result;

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mb-2">
          {frontmatter.category && (
            <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded font-medium">
              {frontmatter.category}
            </span>
          )}
          {frontmatter.difficulty && (
            <span className="capitalize bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded font-medium">
              {frontmatter.difficulty}
            </span>
          )}
          {frontmatter.updatedAt && (
            <span>Updated: {frontmatter.updatedAt}</span>
          )}
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          {frontmatter.title}
        </h1>
      </div>
      <MarkdownRenderer html={htmlContent} />
    </div>
  );
}
