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
import type { Product } from "@/types";
import { Package } from "lucide-react";
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
      <article className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-[#261c15] hover:border-[#c5d86d]">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative h-48 sm:h-56 bg-[#f7f7f2] overflow-hidden">
            {!imageError && product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#261c15]/40">
                <Package className="w-16 h-16" />
              </div>
            )}
            {product.category && (
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white bg-opacity-90 text-[#261c15] backdrop-blur-sm border border-[#261c15]">
                  {product.category.name}
                </span>
              </div>
            )}
          </div>
        </Link>

        <div className="p-5">
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-lg font-semibold text-[#261c15] mb-2 line-clamp-2 group-hover:text-[#f05d23] transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-[#261c15]/70 mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-[#f05d23]">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="flex-1" asChild>
              <Link href={`/products/${product.slug}/edit`}>Edit</Link>
            </Button>
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
              Are you sure you want to delete "{product.name}"? This action cannot be undone.
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
