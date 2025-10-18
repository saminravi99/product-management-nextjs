import LoginForm from "@/components/auth/LoginForm";
import Footer from "@/components/layout/Footer";
import { Package } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - ProductHub",
  description: "Sign in to access the ProductHub product management system",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-[beige] via-[baby-powder] to-[mindaro]">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[licorice]">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-[giants-orange] rounded-full">
                <Package className="w-12 h-12 text-white" />
              </div>
            </div>
            <LoginForm />
          </div>

          <p className="text-center mt-6 text-sm text-[licorice]/70">
            © 2024 ProductHub. All rights reserved.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
