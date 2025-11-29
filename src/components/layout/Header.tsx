'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Header scroll animation
    gsap.to(header, {
      scrollTrigger: {
        start: 'top top',
        end: '+=100',
        toggleActions: 'play none none reverse',
      },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      duration: 0.3,
    });
  }, []);

  const navItems = [
    { label: '首页', href: '/' },
    { label: '技术博客', href: '/tech' },
    { label: '生活博客', href: '/life' },
  ];

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-foreground">
          MyBlog
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-foreground/70 hover:text-foreground transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b md:hidden">
            <ul className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-foreground/70 hover:text-foreground transition-colors duration-200 font-medium w-full text-left block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
