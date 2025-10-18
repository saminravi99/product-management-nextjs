import Header from "@/components/layout/Header";
import ProductDetailClient from "@/components/products/ProductDetailClient";
import { Button } from "@/components/ui/button";
import { fetchProductBySlug } from "@/lib/actions/products";
import { Package } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found - ProductHub",
    };
  }

  return {
    title: `${product.name} - ProductHub`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.slice(0, 1),
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f7f7f2]">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-md p-12 text-center border-2 border-[#261c15]">
            <Package className="w-16 h-16 text-[#261c15]/40 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#261c15] mb-2">
              Product Not Found
            </h2>
            <p className="text-[#261c15]/70 mb-6">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
            <Button asChild>
              <Link href="/products">Back to Products</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f2]">
      <Header />
      <ProductDetailClient product={product} />
    </div>
  );
}
