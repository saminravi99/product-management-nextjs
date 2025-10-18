import { Github, Linkedin, Package, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-licorice dark:bg-[#1a1612] text-baby-powder border-t-2 border-licorice/30 dark:border-giants-orange transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8 text-giants-orange dark:text-mindaro" />
              <span className="text-xl font-bold text-baby-powder">
                ProductHub
              </span>
            </div>
            <p className="text-baby-powder/80 dark:text-baby-powder/70 text-sm">
              Modern product management solution for businesses of all sizes.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-giants-orange dark:text-mindaro">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products"
                  className="text-baby-powder/80 dark:text-baby-powder/70 hover:text-giants-orange dark:hover:text-mindaro transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products/create"
                  className="text-baby-powder/80 dark:text-baby-powder/70 hover:text-giants-orange dark:hover:text-mindaro transition-colors"
                >
                  Add Product
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-giants-orange dark:text-mindaro">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-baby-powder/80 dark:text-baby-powder/70 hover:text-giants-orange dark:hover:text-mindaro transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-baby-powder/80 dark:text-baby-powder/70 hover:text-giants-orange dark:hover:text-mindaro transition-colors"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-baby-powder/80 dark:text-baby-powder/70 hover:text-giants-orange dark:hover:text-mindaro transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-giants-orange dark:text-mindaro">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-baby-powder/80 dark:text-baby-powder/70 hover:text-giants-orange dark:hover:text-mindaro transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-baby-powder/80 dark:text-baby-powder/70 hover:text-giants-orange dark:hover:text-mindaro transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-baby-powder/80 dark:text-baby-powder/70 hover:text-giants-orange dark:hover:text-mindaro transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-baby-powder/30 dark:border-baby-powder/20 mt-8 pt-8 text-center text-sm text-baby-powder/80 dark:text-baby-powder/70">
          <p>
            © 2025 ProductHub. All rights reserved. Built with Next.js and
            Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
