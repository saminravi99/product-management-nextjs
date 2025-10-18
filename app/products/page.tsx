import ProductsList from "@/components/products/ProductsList";
import ProductsSearch from "@/components/products/ProductsSearch";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Products - ProductHub",
  description: "Browse and manage your product catalog",
};

interface ProductsPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  const params = await searchParams;
  const searchQuery = params.search || "";

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-giants-orange to-giants-orange/70 dark:from-mindaro dark:to-mindaro/70 bg-clip-text text-transparent">
          Products
        </h1>
        <p className="text-licorice/70 dark:text-baby-powder/80 text-lg">
          Browse, search, and manage your product catalog
        </p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="flex-1">
          <ProductsSearch initialValue={searchQuery} />
        </div>
        <Link href="/products/create">
          <Button size="lg" className="shadow-lg w-full sm:w-auto">
            <Plus className="w-5 h-5 mr-2" />
            Create Product
          </Button>
        </Link>
      </div>

      <ProductsList searchQuery={searchQuery} />
    </div>
  );
}
