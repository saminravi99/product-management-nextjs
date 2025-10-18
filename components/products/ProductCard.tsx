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
import { formatPrice } from "@/lib/utils";
import { getDefaultProductImage, isValidImageUrl } from "@/lib/utils/image";
import type { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check if the product has a valid image URL
  const hasValidImage = !imageError && isValidImageUrl(product.images[0]);

  // Use valid image or placeholder
  const imageUrl = hasValidImage ? product.images[0] : getDefaultProductImage();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProduct(product.id);
      setShowDeleteDialog(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <article className="group bg-white dark:bg-licorice/60 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-licorice/15 dark:border-mindaro/30 hover:border-giants-orange/50 dark:hover:border-mindaro backdrop-blur-sm">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative h-48 sm:h-56 bg-beige/50 dark:bg-black/40 overflow-hidden">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
            {product.category && (
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/95 dark:bg-black/90 text-licorice dark:text-mindaro backdrop-blur-sm border border-licorice/30 dark:border-mindaro/50 shadow-lg">
                  {product.category.name}
                </span>
              </div>
            )}
          </div>
        </Link>

        <div className="p-5 bg-white dark:bg-licorice/80">
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-lg font-bold text-licorice dark:text-baby-powder mb-2 line-clamp-2 group-hover:text-giants-orange dark:group-hover:text-mindaro transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-licorice/80 dark:text-baby-powder/90 mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-giants-orange dark:text-mindaro">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="flex gap-2">
            <Link href={`/products/${product.slug}/edit`} className="flex-1">
              <Button variant="secondary" size="sm" className="w-full">
                Edit
              </Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
              disabled={isDeleting}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        </div>
      </article>

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
