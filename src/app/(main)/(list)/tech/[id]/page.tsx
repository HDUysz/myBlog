import { notFound } from 'next/navigation';
import { getTechPostById } from '@/lib/data';
import { BlogDetail } from '@/components/sections/BlogDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TechBlogDetailPage({ params }: PageProps) {
  const { id } = await params;
  const post = getTechPostById(parseInt(id));

  if (!post) {
    notFound();
  }

  return <BlogDetail post={post} />;
}
