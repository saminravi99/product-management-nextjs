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
  return <>{children}</>;
}
