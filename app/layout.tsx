import { Metadata } from "next";

export const metadata: Metadata = {
  title: "主页",
  description: "This is my blog",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}