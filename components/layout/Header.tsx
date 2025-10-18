"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/actions/products";
import { Package } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
    router.refresh();
  };

  const navigation = [
    { name: "Products", href: "/products" },
    { name: "Create Product", href: "/products/create" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-licorice/20 bg-white shadow-lg dark:bg-[#1a1614] dark:border-mindaro/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/products"
            className="flex items-center space-x-2 text-xl font-bold text-licorice dark:text-baby-powder hover:text-giants-orange dark:hover:text-mindaro transition-colors"
          >
            <Package className="w-8 h-8 text-giants-orange dark:text-mindaro" />
            <span>ProductHub</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-giants-orange dark:bg-mindaro text-white dark:text-licorice shadow-lg"
                      : "text-licorice/80 dark:text-baby-powder/80 hover:bg-giants-orange/10 dark:hover:bg-mindaro/20 hover:text-giants-orange dark:hover:text-mindaro border border-transparent hover:border-giants-orange/30 dark:hover:border-mindaro/30"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="font-semibold"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
