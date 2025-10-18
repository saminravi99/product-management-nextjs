"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { authApi } from "@/lib/api";
import { setCredentials } from "@/lib/redux/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { isValidEmail } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authApi.login(email);
      dispatch(setCredentials({ token: response.token, email }));
      router.push("/products");
    } catch (err: unknown) {
      setError("Failed to login. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-licorice mb-2">Welcome Back</h1>
        <p className="text-gray-600">
          Enter your email to access the product management system
        </p>
      </div>

      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        error={error}
        autoComplete="email"
        autoFocus
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isLoading}
        disabled={isLoading}
      >
        Sign In
      </Button>

      <p className="text-xs text-center text-gray-500">
        Use the same email you provided in your job application
      </p>
    </form>
  );
}
