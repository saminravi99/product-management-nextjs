import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products - ProductHub",
  description:
    "Browse and manage your product catalog. Search, filter, and organize products efficiently.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-baby-powder dark:bg-[#0f0d0b] flex flex-col transition-colors duration-300">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
