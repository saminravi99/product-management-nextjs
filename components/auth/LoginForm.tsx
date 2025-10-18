"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticateUser } from "@/lib/actions/products";
import { isValidEmail } from "@/lib/utils";
import { logger } from "@/lib/utils/logger";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
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
      const response = await authenticateUser(email);

      if (response.error) {
        setError(response.error);
        return;
      }

      router.push("/products");
      router.refresh();
    } catch (err: unknown) {
      setError("Failed to login. Please try again.");
      logger.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-licorice dark:text-baby-powder">
          Welcome Back
        </h1>
        <p className="text-licorice/70 dark:text-baby-powder/70">
          Enter your email to access the product management system
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          autoFocus
        />
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        isLoading={isLoading}
        disabled={isLoading}
      >
        Sign In
      </Button>

      <p className="text-xs text-center text-licorice/65 dark:text-baby-powder/65">
        Use the same email you provided in your job application
      </p>
    </form>
  );
}
