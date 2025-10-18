import { Button } from "@/components/ui/button";
import { fetchProductBySlug, fetchProducts } from "@/lib/actions/products";
import { logger } from "@/lib/utils/logger";
import { Package } from "lucide-react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const ProductDetails = dynamic(
  () => import("@/components/products/ProductDetails"),
  {
    loading: () => (
      <div className="animate-pulse h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    ),
  }
);

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const { products } = await fetchProducts({ limit: 1000 });
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    logger.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found - ProductHub",
      description:
        "The product you're looking for doesn't exist or has been removed. Browse our complete product catalog to find similar items.",
    };
  }

  const truncatedDescription =
    product.description.length > 155
      ? product.description.substring(0, 152) + "..."
      : product.description;

  return {
    title: `${product.name} - ProductHub | Product Details`,
    description: truncatedDescription,
    keywords: [
      `${product.name}`,
      product.category?.name || "",
      "product details",
      "buy online",
    ],
    openGraph: {
      title: product.name,
      description: truncatedDescription,
      images: product.images?.slice(0, 1),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: truncatedDescription,
      images: product.images?.slice(0, 1),
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-licorice/50 rounded-xl shadow-md p-12 text-center border-2 border-licorice dark:border-mindaro">
          <Package className="w-16 h-16 text-licorice/60 dark:text-baby-powder/60 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-licorice dark:text-baby-powder mb-2">
            Product Not Found
          </h1>
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
