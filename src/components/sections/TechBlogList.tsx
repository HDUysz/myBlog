'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { techPosts } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export function TechBlogList() {
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const handlePostClick = (id: number) => {
    router.push(`/tech/${id}`);
  };

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
              onClick={() => handlePostClick(post.id)}
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
