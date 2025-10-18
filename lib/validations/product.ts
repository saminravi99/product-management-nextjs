/**
 * Form validation schemas using Zod
 */

import { z } from "zod";

export const productFormSchema = z.object({
    name: z
        .string()
        .min(3, "Product name must be at least 3 characters")
        .max(100, "Product name must not exceed 100 characters"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description must not exceed 1000 characters"),
    price: z
        .number({ invalid_type_error: "Price must be a number" })
        .positive("Price must be greater than 0")
        .max(1000000, "Price must not exceed 1,000,000"),
    category: z
        .string()
        .min(1, "Please select a category"),
    images: z
        .array(z.url("Invalid image URL"))
        .min(1, "At least one image is required")
        .max(5, "Maximum 5 images allowed"),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
