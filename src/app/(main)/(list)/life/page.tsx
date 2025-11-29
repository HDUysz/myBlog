import { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { LifeBlogList } from "@/components/sections/LifeBlogList";

export const metadata: Metadata = {
  title: "Senzee's Blog - 生活博客",
  description: "记录生活的美好瞬间，分享人生的感悟与思考",
}

export default function LifeBlogPage() {
  return <LifeBlogList />;
}
