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
import {
  getDefaultProductImage,
  isValidImageUrl,
} from "@/lib/utils/imageValidators";
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

  const hasValidImage =
    !imageError && product.images?.[0] && isValidImageUrl(product.images[0]);

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
      <article className="group bg-white dark:bg-[#1a1614] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-licorice/10 dark:border-mindaro/40 hover:border-giants-orange dark:hover:border-mindaro backdrop-blur-sm flex flex-col h-full">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative h-48 sm:h-56 bg-gradient-to-br from-beige/30 to-baby-powder/20 dark:from-black/60 dark:to-licorice/80 overflow-hidden">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
              priority={false}
            />
            {product.category && (
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-mindaro/95 text-licorice dark:text-licorice backdrop-blur-md border-2 border-licorice/20 dark:border-mindaro shadow-xl">
                  {product.category.name}
                </span>
              </div>
            )}
          </div>
        </Link>

        <div className="p-5 bg-gradient-to-b from-white to-baby-powder/30 dark:from-[#1a1614] dark:to-licorice/60 flex flex-col flex-1">
          <Link href={`/products/${product.slug}`} className="block mb-2">
            <h3 className="text-lg font-bold text-licorice dark:text-baby-powder line-clamp-2 group-hover:text-giants-orange dark:group-hover:text-mindaro transition-colors min-h-[3.5rem]">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-licorice/70 dark:text-baby-powder/85 mb-4 line-clamp-3 flex-grow">
            {product.description}
          </p>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-giants-orange dark:text-mindaro drop-shadow-sm">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="flex gap-2">
              <Link href={`/products/${product.slug}/edit`} className="flex-1">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full font-semibold"
                >
                  Edit
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
                disabled={isDeleting}
                className="flex-1 font-semibold"
              >
                Delete
              </Button>
            </div>
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
