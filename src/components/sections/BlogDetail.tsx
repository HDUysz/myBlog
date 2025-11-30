'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import type { BlogPost, LifePost } from '@/lib/data';
import 'highlight.js/styles/github-dark.css';

gsap.registerPlugin(ScrollTrigger);

type Post = BlogPost | LifePost;

interface BlogDetailProps {
  post: Post;
}

export function BlogDetail({ post }: BlogDetailProps) {
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { y: 80, opacity: 0 },
        {
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleBack = () => {
    router.back();
  };

  // Type guard to check if post is BlogPost
  const isBlogPost = (post: Post): post is BlogPost => {
    return 'readTime' in post;
  };

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-8 group hover:bg-foreground/5"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          返回
        </Button>

        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-foreground/10 rounded-lg text-foreground">
              {post.icon}
            </div>
            <Badge variant="outline" className="font-medium text-base px-3 py-1">
              {post.category}
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-foreground/70 mb-6 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-foreground/60">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="text-base">{post.date}</span>
            </div>
            {isBlogPost(post) && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="text-base">{post.readTime}</span>
              </div>
            )}
          </div>

          <Separator className="mt-6" />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-6 flex-wrap">
              <Tag className="w-4 h-4 text-foreground/60" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-foreground/5 rounded-full text-foreground/70 text-sm font-medium hover:bg-foreground/10 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <Card ref={contentRef} className="border-2">
          <CardHeader className="pb-0" />
          <CardContent className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-foreground/5 prose-a:text-foreground/80 hover:prose-a:text-foreground">
            {post.content ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
              >
                {post.content}
              </ReactMarkdown>
            ) : (
              <div className="text-center py-12 text-foreground/60">
                <p className="text-lg">文章内容正在准备中...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bottom Navigation */}
        <div className="mt-12 flex justify-center">
          <Button
            onClick={handleBack}
            size="lg"
            variant="outline"
            className="border-2 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            返回列表
          </Button>
        </div>
      </div>
    </section>
  );
}
