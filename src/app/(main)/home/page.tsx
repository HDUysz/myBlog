import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { TechBlogSection } from "@/components/sections/TechBlogSection";
import { LifeBlogSection } from "@/components/sections/LifeBlogSection";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Senzee's Blog - 首页",
  description: "欢迎来到我的个人博客！分享前端开发、编程技巧和生活点滴。",
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <HeroSection />
        <TechBlogSection />
        <LifeBlogSection />
      </main>
      <Footer />
    </>
  );
}
