"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { toggleTheme } from "@/lib/store/slices/themeSlice";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  const handleToggle = () => {
    console.log("🔄 Theme Toggle: Current theme:", theme);
    dispatch(toggleTheme());
    console.log("🔄 Theme Toggle: Dispatched toggleTheme action");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-baby-powder" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-licorice" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
