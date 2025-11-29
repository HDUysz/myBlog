import { Footer } from "@/components/layout/Footer";

export default function ListLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="min-h-screen bg-background">
        {children}
      </main>
      <Footer />
    </>
  );
}