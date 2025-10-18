"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Select, { type SelectOption } from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { categoriesApi } from "@/lib/api";
import { useAppSelector } from "@/lib/redux/hooks";
import { isValidUrl } from "@/lib/utils";
import type { Category, ProductFormData } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductFormProps {
  initialData?: ProductFormData & { id?: string };
  onSubmit: (data: ProductFormData) => Promise<void>;
  isEdit?: boolean;
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
}: ProductFormProps) {
  const router = useRouter();
  const { loading: productLoading } = useAppSelector((state) => state.products);

  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    images: initialData?.images || [""],
    categoryId: initialData?.categoryId || "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesApi.getAll();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

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

    if (!formData.categoryId) {
      newErrors.categoryId = "Please select a category";
    }

    const validImages = formData.images.filter((img) => img.trim() !== "");
    if (validImages.length === 0) {
      newErrors.images = "At least one image URL is required";
    } else {
      const invalidImages = validImages.filter((img) => !isValidUrl(img));
      if (invalidImages.length > 0) {
        newErrors.images = "All image URLs must be valid";
      }
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
      const submitData = {
        ...formData,
        images: formData.images.filter((img) => img.trim() !== ""),
      };
      await onSubmit(submitData);
    } catch (error: unknown) {
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

  const categoryOptions: SelectOption[] = [
    { value: "", label: "Select a category" },
    ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
  ];

  if (loadingCategories) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Product Name *"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Enter product name"
        error={errors.name}
        maxLength={100}
      />

      <Textarea
        label="Description *"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Enter product description"
        error={errors.description}
        rows={4}
        maxLength={500}
      />

      <Input
        label="Price (USD) *"
        type="number"
        step="0.01"
        min="0"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
        }
        placeholder="0.00"
        error={errors.price}
      />

      <Select
        label="Category *"
        value={formData.categoryId}
        onChange={(e) =>
          setFormData({ ...formData, categoryId: e.target.value })
        }
        options={categoryOptions}
        error={errors.categoryId}
      />

      <div className="space-y-3">
        <label className="block text-sm font-medium text-licorice">
          Image URLs *
        </label>
        {formData.images.map((image, index) => (
          <div key={index} className="flex gap-2">
            <div className="flex-1">
              <Input
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder="https://example.com/image.jpg"
                error={errors.images && index === 0 ? errors.images : undefined}
              />
            </div>
            {formData.images.length > 1 && (
              <Button
                type="button"
                variant="danger"
                size="md"
                onClick={() => removeImageField(index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button type="button" variant="ghost" size="sm" onClick={addImageField}>
          + Add Another Image
        </Button>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          disabled={isSubmitting || productLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting || productLoading}
          disabled={isSubmitting || productLoading}
        >
          {isEdit ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
