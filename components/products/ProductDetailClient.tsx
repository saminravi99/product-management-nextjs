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
import type { Product } from "@/types";
import { ChevronLeft, ChevronRight, Edit, Package, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

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
        <nav className="mb-6 flex items-center space-x-2 text-sm">
          <Link
            href="/products"
            className="text-[#f05d23] hover:underline"
          >
            Products
          </Link>
          <span className="text-[#261c15]/40">/</span>
          <span className="text-[#261c15]/70">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-xl shadow-md overflow-hidden border-2 border-[#261c15]">
              {!imageError && product.images[currentImageIndex] ? (
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#261c15]/40">
                  <Package className="w-24 h-24" />
                </div>
              )}

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6 text-[#261c15]" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6 text-[#261c15]" />
                  </button>
                </>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setImageError(false);
                    }}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-[#f05d23] ring-2 ring-[#f05d23]/50"
                        : "border-[#261c15] hover:border-[#c5d86d]"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {product.category && (
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-[#c5d86d] text-[#261c15] border border-[#261c15]">
                {product.category.name}
              </span>
            )}

            <div>
              <h1 className="text-4xl font-bold text-[#261c15] mb-4">
                {product.name}
              </h1>
              <p className="text-5xl font-bold text-[#f05d23]">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="border-t-2 border-b-2 border-[#e4e6c3] py-6">
              <h2 className="text-lg font-semibold text-[#261c15] mb-3">
                Description
              </h2>
              <p className="text-[#261c15]/70 leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            <div className="space-y-2 text-sm text-[#261c15]/70">
              <p>
                <span className="font-medium text-[#261c15]">Created:</span>{" "}
                {formatDate(product.createdAt)}
              </p>
              <p>
                <span className="font-medium text-[#261c15]">Last Updated:</span>{" "}
                {formatDate(product.updatedAt)}
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button className="flex-1" asChild>
                <Link href={`/products/${product.slug}/edit`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Product
                </Link>
              </Button>
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
              Are you sure you want to delete &ldquo;{product.name}&rdquo;? This action cannot be undone.
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
