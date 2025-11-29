'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FullPageScrollProps {
  children: React.ReactNode;
}

export function FullPageScroll({ children }: FullPageScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Tell ScrollTrigger to use this container as the scroller
    ScrollTrigger.defaults({
      scroller: containerRef.current,
    });

    // Refresh ScrollTrigger after a short delay to ensure proper setup
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.defaults({
        scroller: undefined,
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
      {children}
    </div>
  );
}
