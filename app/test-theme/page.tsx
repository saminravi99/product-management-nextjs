"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function TestThemePage() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    console.log("📊 TestTheme Page Mounted");
    console.log("📊 Current theme from next-themes:", theme);
    console.log("📊 Resolved theme:", resolvedTheme);
    console.log(
      "📊 HTML classList:",
      document.documentElement.classList.toString()
    );
    console.log("📊 localStorage keys:", Object.keys(localStorage));
    console.log("📊 localStorage theme:", localStorage.getItem("theme"));
  }, [theme, resolvedTheme, mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen p-8 bg-baby-powder dark:bg-[#0f0d0b] text-licorice dark:text-baby-powder">
        <h1 className="text-4xl font-bold mb-8">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-baby-powder dark:bg-[#0f0d0b] text-licorice dark:text-baby-powder">
      <h1 className="text-4xl font-bold mb-8">Theme Test Page</h1>

      <div className="space-y-4 max-w-2xl">
        <div className="p-6 border-2 border-licorice dark:border-mindaro rounded-lg bg-white dark:bg-[#1a1612]">
          <h2 className="text-2xl font-semibold mb-4">Current Theme State</h2>
          <p className="text-xl mb-2">
            <strong>next-themes Theme:</strong>{" "}
            <span className="font-mono bg-mindaro text-licorice px-2 py-1 rounded">
              {theme || "undefined"}
            </span>
          </p>
          <p className="text-xl mb-2">
            <strong>Resolved Theme:</strong>{" "}
            <span className="font-mono bg-mindaro text-licorice px-2 py-1 rounded">
              {resolvedTheme || "undefined"}
            </span>
          </p>
          <p className="text-xl mb-4">
            <strong>HTML Class:</strong>{" "}
            <span className="font-mono bg-mindaro text-licorice px-2 py-1 rounded">
              {document.documentElement.classList.toString() || "none"}
            </span>
          </p>
          <p className="text-xl mb-2">
            <strong>LocalStorage (theme):</strong>
            <span className="font-mono bg-mindaro text-licorice px-2 py-1 rounded text-sm block mt-1">
              {localStorage.getItem("theme") || "null"}
            </span>
          </p>
        </div>

        <div className="p-6 border-2 border-licorice dark:border-mindaro rounded-lg bg-white dark:bg-[#1a1612]">
          <h2 className="text-2xl font-semibold mb-4">Theme Controls</h2>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => {
                console.log("🔵 Toggling theme...");
                setTheme(theme === "dark" ? "light" : "dark");
              }}
              className="px-6 py-3 bg-mindaro text-licorice rounded-lg font-semibold hover:bg-giants-orange hover:text-white transition-colors"
            >
              Toggle Theme
            </button>

            <button
              onClick={() => {
                console.log("☀️ Setting to light...");
                setTheme("light");
              }}
              className="px-6 py-3 bg-baby-powder text-licorice border-2 border-licorice rounded-lg font-semibold hover:bg-beige transition-colors"
            >
              Set Light
            </button>

            <button
              onClick={() => {
                console.log("🌙 Setting to dark...");
                setTheme("dark");
              }}
              className="px-6 py-3 bg-licorice text-baby-powder rounded-lg font-semibold hover:bg-[#0f0d0b] transition-colors"
            >
              Set Dark
            </button>

            <button
              onClick={() => {
                console.log("🗑️ Clearing localStorage...");
                localStorage.clear();
                console.log("🔄 Reloading page...");
                window.location.reload();
              }}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Clear Storage & Reload
            </button>
          </div>
        </div>

        <div className="p-6 border-2 border-licorice dark:border-mindaro rounded-lg bg-white dark:bg-[#1a1612]">
          <h2 className="text-2xl font-semibold mb-4">Visual Test</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-baby-powder dark:bg-[#0f0d0b] border-2 border-licorice dark:border-mindaro rounded">
              <p className="font-semibold">Background adapts</p>
              <p className="text-sm opacity-70">
                This box should change colors
              </p>
            </div>
            <div className="p-4 bg-mindaro dark:bg-giants-orange text-licorice dark:text-baby-powder border-2 border-licorice dark:border-mindaro rounded">
              <p className="font-semibold">Accent colors</p>
              <p className="text-sm opacity-90">Mindaro → Orange</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
