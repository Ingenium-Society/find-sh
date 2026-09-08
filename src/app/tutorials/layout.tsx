import { getNavigationTree } from '@/lib/content';
import TutorialsLayoutClient from '@/components/TutorialsLayoutClient';

export default async function TutorialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tree = getNavigationTree();

  return <TutorialsLayoutClient tree={tree}>{children}</TutorialsLayoutClient>;
}
