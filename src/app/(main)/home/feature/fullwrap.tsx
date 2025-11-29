export default function FullWrap({ children }: { children: Array<React.ReactNode> }) {
  return (
    <>
      {children.map((child, index) => (
        <section key={index} className="snap-start h-screen">
          {child}
        </section>
      ))}
    </>
  );
}