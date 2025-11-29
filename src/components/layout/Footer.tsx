'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Github, Linkedin, Mail, Twitter, Heart, ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Delay to ensure scroller is set up
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        const footerContent = contentRef.current?.children || [];
        if (footerContent.length > 0) {
          gsap.fromTo(
            footerContent,
            { y: 50, opacity: 0 },
            {
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 90%',
                toggleActions: 'play none none reset',
              },
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
            }
          );
        }
      }, footerRef);

      return () => ctx.revert();
    }, 200);

    return () => clearTimeout(timeoutId);
  }, []);

  const scrollToTop = () => {
    const scrollContainer = document.querySelector('.snap-y');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, label: 'GitHub', href: '#' },
    { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: '#' },
    { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', href: '#' },
    { icon: <Mail className="w-5 h-5" />, label: 'Email', href: '#' },
  ];

  const quickLinks = [
    { label: '首页', href: '#hero' },
    { label: '技术博客', href: '#tech-blog' },
    { label: '生活博客', href: '#life-blog' },
    { label: '关于我', href: '#' },
  ];

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="relative bg-foreground text-background overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-background rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-background rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div ref={contentRef} className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-3xl font-bold mb-4 text-background">
              MyBlog
            </h3>
            <p className="text-background/70 mb-6">
              记录技术成长，分享生活点滴。
              用代码改变世界，用文字温暖人心。
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  size="icon"
                  variant="outline"
                  className="rounded-full border-background/30 text-background hover:border-background hover:bg-background/10 hover:scale-110 transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-background">快速链接</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => {
                      const element = document.querySelector(link.href);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-background/70 hover:text-background transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-background">订阅更新</h4>
            <p className="text-background/70 mb-4">
              订阅我的博客，获取最新的技术文章和生活分享。
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                className="bg-foreground/90 text-background border-background/30 placeholder:text-background/50 focus-visible:ring-background/20"
              />
              <Button className="bg-background text-foreground hover:bg-background/90 shrink-0">
                订阅
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-background/20" />

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/70 text-sm flex items-center gap-2">
            © 2025 MyBlog. Made with
            <Heart className="w-4 h-4 text-background fill-background animate-pulse" />
            by Senzee
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-background/70 hover:text-background transition-colors"
          >
            <span className="text-sm">回到顶部</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
