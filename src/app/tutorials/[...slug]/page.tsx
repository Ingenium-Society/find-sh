import { notFound } from 'next/navigation';
import { getAllSlugs, getMarkdownContent } from '@/lib/content';
import ContentRenderer from '@/components/ContentRenderer';
import PageHeader from '@/components/PageHeader';

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

  const { frontmatter } = result;

  return (
    <div className="space-y-6">
      <PageHeader frontmatter={frontmatter} />
      <ContentRenderer result={result} />
    </div>
  );
}
