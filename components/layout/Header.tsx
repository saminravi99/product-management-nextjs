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
    <header className="sticky top-0 z-40 w-full border-b-2 border-[#261c15] bg-white shadow-sm dark:bg-[#261c15] dark:border-[#c5d86d]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/products"
            className="flex items-center space-x-2 text-xl font-bold text-[#261c15] dark:text-[#f7f7f2] hover:text-[#f05d23] dark:hover:text-[#f05d23] transition-colors"
          >
            <Package className="w-8 h-8 text-[#f05d23]" />
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
                      ? "bg-[#c5d86d] text-[#261c15]"
                      : "text-[#261c15]/70 dark:text-[#f7f7f2]/70 hover:bg-[#e4e6c3] dark:hover:bg-[#f7f7f2]/10 hover:text-[#261c15] dark:hover:text-[#f7f7f2]"
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
