import { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { TechBlogSection } from "@/components/sections/TechBlogSection";
import { LifeBlogSection } from "@/components/sections/LifeBlogSection";
import { Footer } from "@/components/layout/Footer";
import FullWrap from "./feature/fullwrap";

export const metadata: Metadata = {
  title: "Senzee's Blog - 首页",
  description: "欢迎来到我的个人博客！分享前端开发、编程技巧和生活点滴。",
}

export default function Home() {
  return (
    <>
      <FullWrap>
        <HeroSection />
        <TechBlogSection />
        <LifeBlogSection />
      </FullWrap>
      <section className="snap-start">
        <Footer />
      </section>
    </>
  );
}
