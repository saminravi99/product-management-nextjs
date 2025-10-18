"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  isMobileMenu?: boolean;
}

export function ThemeToggle({ isMobileMenu = false }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    if (isMobileMenu) {
      return (
        <Button
          variant="outline"
          size="lg"
          className="w-full font-semibold justify-start"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] mr-2" />
          <span>Toggle Theme</span>
        </Button>
      );
    }
    return (
      <Button variant="ghost" size="icon">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  if (isMobileMenu) {
    return (
      <Button
        variant="outline"
        size="lg"
        onClick={handleToggle}
        className="w-full font-semibold justify-start"
      >
        {theme === "dark" ? (
          <>
            <Sun className="h-[1.2rem] w-[1.2rem] mr-2" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="h-[1.2rem] w-[1.2rem] mr-2" />
            <span>Dark Mode</span>
          </>
        )}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
