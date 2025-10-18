import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "ProductHub | Modern Product Management System",
  description:
    "Welcome to ProductHub - A modern, efficient product management application for managing your product catalog, inventory, and e-commerce operations. Built with Next.js for optimal performance.",
  keywords: [
    "product management",
    "inventory system",
    "e-commerce",
    "catalog management",
  ],
};

export default function Home() {
  redirect("/login");
}
