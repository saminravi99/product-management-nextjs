"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { isValidUrl } from "@/lib/utils";
import type { Category, ProductFormData } from "@/types";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductFormProps {
  initialData?: ProductFormData & { id?: string };
  onSubmit: (data: ProductFormData) => Promise<void>;
  isEdit?: boolean;
  categories: Category[];
}

interface FormErrors {
  name?: string;
  description?: string;
  price?: string;
  images?: string;
  categoryId?: string;
}

export default function ProductForm({
  initialData,
  onSubmit,
  isEdit = false,
  categories,
}: ProductFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    images: initialData?.images || [""],
    categoryId: initialData?.categoryId || "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Product name must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    const validImages = formData.images.filter((img) => img.trim());
    if (validImages.length === 0) {
      newErrors.images = "At least one image URL is required";
    } else {
      for (const img of validImages) {
        if (!isValidUrl(img)) {
          newErrors.images = "All image URLs must be valid";
          break;
        }
      }
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Please select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const validImages = formData.images.filter((img) => img.trim());
      await onSubmit({
        ...formData,
        images: validImages,
      });
      router.push("/products");
      router.refresh();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData({ ...formData, images: newImages });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, name: e.target.value })
          }
          placeholder="Enter product name"
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Enter product description"
          rows={4}
        />
        {errors.description && (
          <p className="text-sm text-red-600 mt-1">{errors.description}</p>
        )}
      </div>

      <div>
        <Label htmlFor="price">Price (USD) *</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
          }
          placeholder="0.00"
        />
        {errors.price && (
          <p className="text-sm text-red-600 mt-1">{errors.price}</p>
        )}
      </div>

      <div>
        <Label htmlFor="categoryId">Category *</Label>
        <Select
          id="categoryId"
          value={formData.categoryId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFormData({ ...formData, categoryId: e.target.value })
          }
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        {errors.categoryId && (
          <p className="text-sm text-red-600 mt-1">{errors.categoryId}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Product Images *</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addImageField}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Image
          </Button>
        </div>
        <div className="space-y-3">
          {formData.images.map((image, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={image}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleImageChange(index, e.target.value)
                }
                placeholder="https://example.com/image.jpg"
              />
              {formData.images.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeImageField(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        {errors.images && (
          <p className="text-sm text-red-600 mt-1">{errors.images}</p>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="flex-1"
        >
          {isEdit ? "Update Product" : "Create Product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
