import { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { TechBlogList } from "@/components/sections/TechBlogList";

export const metadata: Metadata = {
  title: "Senzee's Blog - 技术博客",
  description: "分享前端开发、编程技巧和技术思考",
}

export default function TechBlogPage() {
  return <TechBlogList />;
}
