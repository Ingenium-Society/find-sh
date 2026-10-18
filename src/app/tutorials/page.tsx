import { getMarkdownContent } from '@/lib/content';
import ContentRenderer from '@/components/ContentRenderer';
import PageHeader from '@/components/PageHeader';
import { notFound } from 'next/navigation';

export default async function TutorialsIndexPage() {
  const result = await getMarkdownContent([]);

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
