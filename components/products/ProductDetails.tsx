"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteProduct } from "@/lib/actions/products";
import { formatDate, formatPrice } from "@/lib/utils";
import { getDefaultProductImage, isValidImageUrl } from "@/lib/utils/image";
import type { Product } from "@/types";
import { ChevronLeft, ChevronRight, Edit, Package, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const currentImageUrl = product.images?.[currentImageIndex];
  const hasValidImage =
    !imageError && currentImageUrl && isValidImageUrl(currentImageUrl);
  const displayImage = hasValidImage
    ? currentImageUrl
    : getDefaultProductImage();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProduct(product.id);
      router.push("/products");
      router.refresh();
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    setImageError(false);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
    setImageError(false);
  };

  return (
    <>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-6 flex items-center space-x-2 text-sm font-semibold">
          <Link
            href="/products"
            className="text-giants-orange dark:text-mindaro hover:underline"
          >
            Products
          </Link>
          <span className="text-licorice/40 dark:text-baby-powder/40">/</span>
          <span className="text-licorice/70 dark:text-baby-powder/70">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative aspect-square bg-gradient-to-br from-beige/30 to-baby-powder/20 dark:from-black/60 dark:to-licorice/80 rounded-xl shadow-xl dark:shadow-mindaro/20 overflow-hidden border-2 border-licorice/20 dark:border-mindaro/40">
              <Image
                src={displayImage}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                onError={() => setImageError(true)}
              />

              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-[#1a1614]/95 hover:bg-white dark:hover:bg-[#1a1614] rounded-full p-2 shadow-lg border-2 border-licorice/20 dark:border-mindaro/40 transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6 text-licorice dark:text-baby-powder" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-[#1a1614]/95 hover:bg-white dark:hover:bg-[#1a1614] rounded-full p-2 shadow-lg border-2 border-licorice/20 dark:border-mindaro/40 transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6 text-licorice dark:text-baby-powder" />
                  </button>
                </>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => {
                  const isValidThumb = image && isValidImageUrl(image);
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setImageError(false);
                      }}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-giants-orange dark:border-mindaro ring-2 ring-giants-orange/50 dark:ring-mindaro/50"
                          : "border-licorice/30 dark:border-mindaro/40 hover:border-giants-orange dark:hover:border-mindaro"
                      }`}
                    >
                      {isValidThumb ? (
                        <Image
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-baby-powder/50 dark:bg-licorice/50">
                          <Package className="w-8 h-8 text-licorice/40 dark:text-baby-powder/40" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {product.category && (
              <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-mindaro dark:bg-mindaro text-licorice dark:text-licorice border-2 border-mindaro shadow-md">
                {product.category.name}
              </span>
            )}

            <div>
              <h1 className="text-4xl font-bold text-licorice dark:text-baby-powder mb-4">
                {product.name}
              </h1>
              <p className="text-5xl font-bold text-giants-orange dark:text-mindaro drop-shadow-sm">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="border-t-2 border-b-2 border-licorice/20 dark:border-mindaro/30 py-6">
              <h2 className="text-lg font-semibold text-licorice dark:text-baby-powder mb-3">
                Description
              </h2>
              <p className="text-licorice/70 dark:text-baby-powder/80 leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            <div className="space-y-2 text-sm text-licorice/70 dark:text-baby-powder/70">
              <p>
                <span className="font-semibold text-licorice dark:text-baby-powder">
                  Created:
                </span>{" "}
                {formatDate(product.createdAt)}
              </p>
              <p>
                <span className="font-semibold text-licorice dark:text-baby-powder">
                  Last Updated:
                </span>{" "}
                {formatDate(product.updatedAt)}
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Link href={`/products/${product.slug}/edit`} className="flex-1">
                <Button className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Product
                </Button>
              </Link>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{product.name}&rdquo;? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              isLoading={isDeleting}
              disabled={isDeleting}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
