import LoginForm from "@/components/auth/LoginForm";
import { ThemeToggle } from "@/components/theme-toggle";
import { Package } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - ProductHub | Sign In to Your Account",
  description:
    "Sign in to access the ProductHub product management system. Manage your product catalog, inventory, categories, and streamline your e-commerce operations securely.",
  keywords: [
    "login",
    "sign in",
    "authentication",
    "user account",
    "product management",
  ],
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-beige via-baby-powder to-mindaro dark:from-[#1a1612] dark:via-[#0f0d0b] dark:to-licorice transition-colors">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-[#1a1612] rounded-2xl shadow-2xl p-8 border-2 border-licorice dark:border-mindaro transition-colors">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-giants-orange dark:bg-mindaro rounded-full transition-colors">
                <Package className="w-12 h-12 text-white dark:text-licorice" />
              </div>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
