import Header from "@/components/layout/Header";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-baby-powder dark:bg-licorice flex flex-col transition-colors duration-300">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
