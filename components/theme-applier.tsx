"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { useEffect, useLayoutEffect, useState } from "react";

export function ThemeApplier() {
  const theme = useAppSelector((state) => state.theme.theme);
  const [hydrated, setHydrated] = useState(false);

  // Wait for hydration
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Use useLayoutEffect to apply theme BEFORE paint
  useLayoutEffect(() => {
    if (!hydrated) {
      console.log("⏳ ThemeApplier: Waiting for hydration...");
      return;
    }

    const root = document.documentElement;

    console.log("🎨 ThemeApplier (Layout Effect): Current theme:", theme);
    console.log("🎨 Current HTML classes BEFORE:", root.className);

    // Remove both classes first to ensure clean state
    root.classList.remove("dark");

    // Add the current theme class
    if (theme === "dark") {
      root.classList.add("dark");
      console.log("✅ Added 'dark' class to HTML");
    } else {
      console.log("✅ Ensured NO 'dark' class on HTML (light mode)");
    }

    console.log("🎨 Current HTML classes AFTER:", root.className);
  }, [theme, hydrated]);

  return null;
}
