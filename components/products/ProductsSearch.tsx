"use client";

import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

interface ProductsSearchProps {
  initialValue?: string;
}

export default function ProductsSearch({ initialValue = "" }: ProductsSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initialValue);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      router.push(`/products?${params.toString()}`);
    }, 500),
    [router, searchParams]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  return (
    <Input
      type="search"
      placeholder="Search products by name..."
      value={value}
      onChange={handleChange}
      className="w-full"
    />
  );
}
