"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/actions/products";
import { Menu, Package, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
    router.refresh();
  };

  const navigation = [
    { name: "Products", href: "/products" },
    { name: "Create Product", href: "/products/create" },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-licorice/20 bg-white shadow-lg dark:bg-[#1a1614] dark:border-mindaro/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/products"
            className="flex items-center space-x-2 text-xl font-bold text-licorice dark:text-baby-powder hover:text-giants-orange dark:hover:text-mindaro transition-colors"
          >
            <Package className="w-8 h-8 text-giants-orange dark:text-mindaro" />
            <span className="hidden sm:inline">ProductHub</span>
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
            <div className="hidden md:flex items-center space-x-2">
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

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-licorice dark:text-baby-powder hover:bg-giants-orange/10 dark:hover:bg-mindaro/20 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
          <div className="fixed top-16 right-0 bottom-0 w-72 bg-white dark:bg-[#1a1614] border-l-2 border-licorice/20 dark:border-mindaro/40 shadow-2xl z-50 md:hidden overflow-y-auto">
            <nav className="flex flex-col p-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                      isActive
                        ? "bg-giants-orange dark:bg-mindaro text-white dark:text-licorice shadow-lg"
                        : "text-licorice dark:text-baby-powder hover:bg-giants-orange/10 dark:hover:bg-mindaro/20 hover:text-giants-orange dark:hover:text-mindaro border-2 border-transparent hover:border-giants-orange/30 dark:hover:border-mindaro/30"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t-2 border-licorice/20 dark:border-mindaro/40 mt-4 pt-4 px-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-licorice dark:text-baby-powder">
                  Theme
                </span>
                <ThemeToggle />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="w-full font-semibold"
              >
                Logout
              </Button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
