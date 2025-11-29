'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          descriptionRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          buttonsRef.current?.children || [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          '-=0.4'
        )
        .fromTo(
          socialsRef.current?.children || [],
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1 },
          '-=0.4'
        );

      // Floating animation for background elements
      gsap.to('.float-element', {
        y: 'random(-20, 20)',
        x: 'random(-20, 20)',
        duration: 'random(2, 4)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 1,
          from: 'random',
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#tech-blog');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="float-element absolute top-20 left-10 w-72 h-72 bg-foreground/5 rounded-full blur-3xl" />
        <div className="float-element absolute top-40 right-20 w-96 h-96 bg-foreground/8 rounded-full blur-3xl" />
        <div className="float-element absolute bottom-20 left-1/3 w-80 h-80 bg-foreground/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold mb-6 text-foreground"
          >
            你好，我是 Senzee
          </h1>

          <p
            ref={subtitleRef}
            className="text-2xl md:text-3xl font-semibold text-foreground/70 mb-4"
          >
            全栈开发者 · 技术爱好者 · 终身学习者
          </p>

          <p
            ref={descriptionRef}
            className="text-lg md:text-xl text-foreground/60 mb-8 max-w-2xl mx-auto"
          >
            欢迎来到我的个人博客！在这里，我分享关于编程、技术和生活的点滴。
            让我们一起探索代码的世界，记录生活的美好瞬间。
          </p>

          <div ref={buttonsRef} className="flex flex-wrap gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90"
              onClick={() => document.querySelector('#tech-blog')?.scrollIntoView({ behavior: 'smooth' })}
            >
              查看技术博客
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.querySelector('#life-blog')?.scrollIntoView({ behavior: 'smooth' })}
            >
              探索生活博客
            </Button>
          </div>

          <div ref={socialsRef} className="flex gap-4 justify-center">
            <Button size="icon" variant="outline" className="rounded-full hover:scale-110 transition-transform">
              <Github className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full hover:scale-110 transition-transform">
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
      >
        <ArrowDown className="w-6 h-6 text-foreground/50" />
      </button>
    </section>
  );
}
