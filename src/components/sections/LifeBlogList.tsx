'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Camera, Search } from 'lucide-react';
import { lifePosts } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export function LifeBlogList() {
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const handlePostClick = (id: number) => {
    router.push(`/life/${id}`);
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
    <section className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground text-center">
            生活博客
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-center mb-8">
            记录生活的美好瞬间，分享人生的感悟与思考
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
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {lifePosts.map((post, index) => (
            <Card
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              className={`group border-2 hover:shadow-2xl hover:border-foreground transition-all duration-500 cursor-pointer hover:-translate-y-2 overflow-hidden ${
                index === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div className={`flex ${index === 0 ? 'flex-col md:flex-row' : 'flex-col'} h-full`}>
                <div className="flex-1">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-foreground/10 rounded-lg text-foreground">
                        {post.icon}
                      </div>
                      <Badge variant="outline" className="font-medium">
                        {post.category}
                      </Badge>
                    </div>
                    <h3
                      className={`font-bold text-foreground group-hover:text-foreground/70 transition-colors ${
                        index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'
                      }`}
                    >
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

                  <CardFooter className="pt-0 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-foreground/50">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-foreground group-hover:translate-x-2 transition-transform" />
                  </CardFooter>
                </div>

                {index === 0 && (
                  <div className="w-full md:w-2/5 h-48 md:h-auto bg-foreground/10 flex items-center justify-center border-t md:border-t-0 md:border-l-2 border-border">
                    <div className="text-center text-foreground/50">
                      <Camera className="w-16 h-16 mx-auto mb-2" />
                      <p className="text-sm">精选文章</p>
                    </div>
                  </div>
                )}
              </div>

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
