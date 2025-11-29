'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Coffee, Camera, BookOpen, Heart, Plane, Music, Search } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface LifePost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  icon: React.ReactNode;
  tags: string[];
}

const lifePosts: LifePost[] = [
  {
    id: 1,
    title: '周末的咖啡时光',
    excerpt: '在最喜欢的咖啡馆度过了一个美好的下午，品味生活的小确幸。阳光透过玻璃窗洒在桌上，一杯拿铁，一本书，这就是最惬意的时光。',
    date: '2025-01-20',
    category: '日常',
    icon: <Coffee className="w-5 h-5" />,
    tags: ['咖啡', '休闲', '生活'],
  },
  {
    id: 2,
    title: '城市漫步摄影记',
    excerpt: '用镜头记录城市的美好瞬间，发现生活中被忽略的美。从清晨的第一缕阳光到夜晚的霓虹灯光，每个时刻都值得被记录。',
    date: '2025-01-18',
    category: '摄影',
    icon: <Camera className="w-5 h-5" />,
    tags: ['摄影', '城市', '艺术'],
  },
  {
    id: 3,
    title: '阅读笔记：《人生的智慧》',
    excerpt: '叔本华的哲学思考，关于如何度过有意义的人生。书中的智慧让我重新思考生活的本质和幸福的真谛。',
    date: '2025-01-15',
    category: '读书',
    icon: <BookOpen className="w-5 h-5" />,
    tags: ['读书', '哲学', '思考'],
  },
  {
    id: 4,
    title: '旅行见闻：山水之间',
    excerpt: '远离城市的喧嚣，在自然中找到内心的平静。登山看日出，漫步在森林小道，感受大自然的力量。',
    date: '2025-01-12',
    category: '旅行',
    icon: <Plane className="w-5 h-5" />,
    tags: ['旅行', '自然', '探索'],
  },
  {
    id: 5,
    title: '音乐与灵魂的对话',
    excerpt: '在音乐中寻找共鸣，用旋律治愈心灵。从古典到爵士，从摇滚到民谣，每种音乐都有独特的魅力。',
    date: '2025-01-08',
    category: '音乐',
    icon: <Music className="w-5 h-5" />,
    tags: ['音乐', '艺术', '生活'],
  },
  {
    id: 6,
    title: '生活感悟：简单的幸福',
    excerpt: '幸福其实很简单，就在生活的点点滴滴中。学会欣赏平凡，在日常中发现美好。',
    date: '2025-01-05',
    category: '感悟',
    icon: <Heart className="w-5 h-5" />,
    tags: ['感悟', '幸福', '生活'],
  },
];

export function LifeBlogList() {
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
