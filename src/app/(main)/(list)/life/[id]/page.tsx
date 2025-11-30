import { notFound } from 'next/navigation';
import { getLifePostById } from '@/lib/data';
import { BlogDetail } from '@/components/sections/BlogDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LifeBlogDetailPage({ params }: PageProps) {
  const { id } = await params;
  const post = getLifePostById(parseInt(id));
  if (!post) {
    notFound();
  }

  return <BlogDetail post={post} />;
}
