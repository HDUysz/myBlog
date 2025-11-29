'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, Code2, Cpu, Database } from 'lucide-react';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  icon: React.ReactNode;
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
  },
  {
    id: 2,
    title: 'GSAP 动画库实战指南',
    excerpt: '从基础到进阶，全面掌握 GSAP 动画库，打造流畅炫酷的网页动效。',
    date: '2025-01-10',
    readTime: '10 分钟',
    category: 'Animation',
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    id: 3,
    title: '构建高性能的 React 应用',
    excerpt: '深入理解 React 性能优化技巧，包括 memo、useMemo、useCallback 等最佳实践。',
    date: '2025-01-05',
    readTime: '12 分钟',
    category: 'React',
    icon: <Database className="w-5 h-5" />,
  },
];

export function TechBlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Delay to ensure scroller is set up
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          titleRef.current,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reset',
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
          }
        );

        // Cards animation
        const cards = cardsRef.current?.children || [];
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            {
              y: 100,
              opacity: 0,
            },
            {
              scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reset',
              },
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: 'power3.out',
            }
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    }, 200);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section
      id="tech-blog"
      ref={sectionRef}
      className="h-full w-full flex items-center bg-muted/30 relative overflow-y-auto"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-foreground/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-20 relative z-10 w-full">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
          >
            技术博客
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            分享前端开发、编程技巧和技术思考
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                <p className="text-foreground/60 line-clamp-2">
                  {post.excerpt}
                </p>
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

              {/* Black overlay on hover */}
              <div className="h-1 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="group border-2"
            onClick={() => router.push('/tech')}
          >
            查看更多技术文章
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
