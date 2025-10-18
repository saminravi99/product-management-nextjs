import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-baby-powder p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-giants-orange mb-4">404</h1>
          <h2 className="text-3xl font-bold text-licorice mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button variant="primary" size="lg">
              Go to Products
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="lg">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
