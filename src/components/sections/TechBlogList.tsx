'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, Code2, Cpu, Database, Zap, Terminal, Layers, Search } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  icon: React.ReactNode;
  tags: string[];
}

const techPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Next.js 15 新特性深度解析',
    excerpt: '探索 Next.js 15 带来的革命性变化，包括 App Router、Server Components 等新特性。',
    date: '2025-01-15',
    readTime: '8 分钟',
    category: 'Frontend',
    icon: <Code2 className="w-5 h-5" />,
    tags: ['Next.js', 'React', 'SSR'],
  },
  {
    id: 2,
    title: 'GSAP 动画库实战指南',
    excerpt: '从基础到进阶，全面掌握 GSAP 动画库，打造流畅炫酷的网页动效。',
    date: '2025-01-10',
    readTime: '10 分钟',
    category: 'Animation',
    icon: <Cpu className="w-5 h-5" />,
    tags: ['GSAP', 'Animation', 'JavaScript'],
  },
  {
    id: 3,
    title: '构建高性能的 React 应用',
    excerpt: '深入理解 React 性能优化技巧，包括 memo、useMemo、useCallback 等最佳实践。',
    date: '2025-01-05',
    readTime: '12 分钟',
    category: 'React',
    icon: <Database className="w-5 h-5" />,
    tags: ['React', 'Performance', 'Optimization'],
  },
  {
    id: 4,
    title: 'TypeScript 高级类型技巧',
    excerpt: '掌握 TypeScript 的高级类型系统，提升代码的类型安全性和可维护性。',
    date: '2024-12-28',
    readTime: '15 分钟',
    category: 'TypeScript',
    icon: <Terminal className="w-5 h-5" />,
    tags: ['TypeScript', 'Types', 'Advanced'],
  },
  {
    id: 5,
    title: 'Tailwind CSS 最佳实践',
    excerpt: '如何在大型项目中高效使用 Tailwind CSS，保持样式的一致性和可维护性。',
    date: '2024-12-20',
    readTime: '9 分钟',
    category: 'CSS',
    icon: <Layers className="w-5 h-5" />,
    tags: ['Tailwind', 'CSS', 'Styling'],
  },
  {
    id: 6,
    title: 'Vite 构建工具深入剖析',
    excerpt: '了解 Vite 的工作原理，以及如何利用 Vite 提升开发体验和构建速度。',
    date: '2024-12-15',
    readTime: '11 分钟',
    category: 'Build Tools',
    icon: <Zap className="w-5 h-5" />,
    tags: ['Vite', 'Build', 'Tooling'],
  },
];

export function TechBlogList() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 80, opacity: 0 },
        {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground text-center">
            技术博客
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-center mb-8">
            分享前端开发、编程技巧和技术思考
          </p>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <Input
                type="text"
                placeholder="搜索文章..."
                className="pl-10 border-2"
              />
            </div>
            <Button variant="outline" className="border-2">
              筛选
            </Button>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techPosts.map((post) => (
            <Card
              key={post.id}
              className="group border-2 hover:shadow-xl hover:border-foreground transition-all duration-300 cursor-pointer hover:-translate-y-2 overflow-hidden"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-foreground/10 rounded-lg text-foreground">
                    {post.icon}
                  </div>
                  <Badge variant="outline" className="font-medium">
                    {post.category}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-foreground/70 transition-colors">
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent className="pb-3">
                <p className="text-foreground/60 line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-foreground/5 rounded-full text-foreground/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-0 flex items-center justify-between text-sm text-foreground/50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </CardFooter>

              <div className="h-1 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-2">
          <Button variant="outline" className="border-2" disabled>
            上一页
          </Button>
          <Button variant="outline" className="border-2 bg-foreground text-background">
            1
          </Button>
          <Button variant="outline" className="border-2">
            2
          </Button>
          <Button variant="outline" className="border-2">
            3
          </Button>
          <Button variant="outline" className="border-2">
            下一页
          </Button>
        </div>
      </div>
    </section>
  );
}
