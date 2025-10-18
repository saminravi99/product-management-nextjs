import ProductDetails from "@/components/products/ProductDetails";
import { Button } from "@/components/ui/button";
import { fetchProductBySlug } from "@/lib/actions/products";
import { Package } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Enable dynamic rendering for real-time product data
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
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

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-licorice/50 rounded-xl shadow-md p-12 text-center border-2 border-licorice dark:border-mindaro">
          <Package className="w-16 h-16 text-licorice/40 dark:text-baby-powder/40 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-licorice dark:text-baby-powder mb-2">
            Product Not Found
          </h2>
          <p className="text-licorice/70 dark:text-baby-powder/70 mb-6">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}
