import { Header } from "@/components/layout/Header";
import { FullPageScroll } from "@/components/layout/FullPageScroll";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <FullPageScroll>{children}</FullPageScroll>
    </>
  );
}