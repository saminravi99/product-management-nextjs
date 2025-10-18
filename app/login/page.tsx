import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - ProductHub",
  description: "Sign in to access the ProductHub product management system",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-beige via-baby-powder to-mindaro">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-giants-orange rounded-full">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <LoginForm />
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          © 2024 ProductHub. All rights reserved.
        </p>
      </div>
    </div>
  );
}
