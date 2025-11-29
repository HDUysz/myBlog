'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Heart, Camera, Coffee, BookOpen, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface LifePost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  icon: React.ReactNode;
  image?: string;
}

const lifePosts: LifePost[] = [
  {
    id: 1,
    title: '周末的咖啡时光',
    excerpt: '在最喜欢的咖啡馆度过了一个美好的下午，品味生活的小确幸。',
    date: '2025-01-20',
    category: '日常',
    icon: <Coffee className="w-5 h-5" />,
  },
  {
    id: 2,
    title: '城市漫步摄影记',
    excerpt: '用镜头记录城市的美好瞬间，发现生活中被忽略的美。',
    date: '2025-01-18',
    category: '摄影',
    icon: <Camera className="w-5 h-5" />,
  },
  {
    id: 3,
    title: '阅读笔记：《人生的智慧》',
    excerpt: '叔本华的哲学思考，关于如何度过有意义的人生。',
    date: '2025-01-15',
    category: '读书',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    id: 4,
    title: '旅行见闻：山水之间',
    excerpt: '远离城市的喧嚣，在自然中找到内心的平静。',
    date: '2025-01-12',
    category: '旅行',
    icon: <Heart className="w-5 h-5" />,
  },
];

export function LifeBlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        }
      );

      // Grid items animation
      const gridItems = gridRef.current?.children || [];
      if (gridItems.length > 0) {
        gsap.fromTo(
          gridItems,
          {
            y: 80,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="life-blog"
      ref={sectionRef}
      className="py-20 bg-background relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-foreground/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
          >
            生活博客
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            记录生活的美好瞬间，分享人生的感悟与思考
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 gap-6 mb-12">
          {lifePosts.slice(0, 3).map((post, index) => (
            <Card
              key={post.id}
              className={`life-card group border-2 hover:shadow-2xl hover:border-foreground transition-all duration-500 cursor-pointer overflow-hidden ${
                index === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div className={`flex ${index === 0 ? 'flex-col md:flex-row' : 'flex-col'} h-full`}>
                {/* Content */}
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
                    <p className="text-foreground/60 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </CardContent>

                  <CardFooter className="pt-0 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-foreground/50">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-foreground group-hover:translate-x-2 transition-transform" />
                  </CardFooter>
                </div>

                {/* Image placeholder (for featured post) */}
                {index === 0 && (
                  <div className="w-full md:w-2/5 h-48 md:h-auto bg-foreground/10 flex items-center justify-center border-t md:border-t-0 md:border-l-2 border-border">
                    <div className="text-center text-foreground/50">
                      <Camera className="w-16 h-16 mx-auto mb-2" />
                      <p className="text-sm">精选文章</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Black overlay on hover */}
              <div className="h-1 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 group"
          >
            探索更多生活故事
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
