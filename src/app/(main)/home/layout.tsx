import { FullPageScroll } from "@/components/layout/FullPageScroll";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <FullPageScroll>{children}</FullPageScroll>
  )
}