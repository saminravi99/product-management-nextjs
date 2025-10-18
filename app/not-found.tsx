import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center bg-[#f7f7f2] p-4">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <Package className="w-20 h-20 text-[#261c15]/40 mx-auto mb-4" />
            <h1 className="text-9xl font-bold text-[#f05d23] mb-4">404</h1>
            <h2 className="text-3xl font-bold text-[#261c15] mb-4">
              Page Not Found
            </h2>
            <p className="text-[#261c15]/70 mb-8">
              Sorry, the page you are looking for does not exist or has been
              moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/products">Go to Products</Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
