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
    <header className="sticky top-0 z-40 w-full border-b-2 border-licorice bg-white shadow-sm dark:bg-licorice dark:border-mindaro">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/products"
            className="flex items-center space-x-2 text-xl font-bold text-licorice dark:text-baby-powder hover:text-giants-orange dark:hover:text-giants-orange transition-colors"
          >
            <Package className="w-8 h-8 text-giants-orange" />
            <span>ProductHub</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-mindaro text-licorice"
                      : "text-licorice/70 dark:text-baby-powder/70 hover:bg-beige dark:hover:bg-baby-powder/10 hover:text-licorice dark:hover:text-baby-powder"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
