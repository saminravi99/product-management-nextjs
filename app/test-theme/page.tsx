"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setTheme, toggleTheme } from "@/lib/store/slices/themeSlice";
import { useEffect } from "react";

export default function TestThemePage() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    console.log("📊 TestTheme Page Mounted");
    console.log("📊 Current theme from Redux:", theme);
    console.log(
      "📊 HTML classList:",
      document.documentElement.classList.toString()
    );
    console.log("📊 localStorage keys:", Object.keys(localStorage));
    console.log(
      "📊 localStorage producthub-theme:",
      localStorage.getItem("producthub-theme")
    );
    console.log(
      "📊 localStorage persist:producthub-root:",
      localStorage.getItem("persist:producthub-root")
    );
  }, [theme]);

  return (
    <div className="min-h-screen p-8 bg-baby-powder dark:bg-licorice text-licorice dark:text-baby-powder">
      <h1 className="text-4xl font-bold mb-8">Theme Test Page</h1>

      <div className="space-y-4 max-w-2xl">
        <div className="p-6 border-2 border-licorice dark:border-mindaro rounded-lg bg-white dark:bg-[#1a1612]">
          <h2 className="text-2xl font-semibold mb-4">Current Theme State</h2>
          <p className="text-xl mb-2">
            <strong>Redux Theme:</strong>{" "}
            <span className="font-mono bg-mindaro text-licorice px-2 py-1 rounded">
              {theme}
            </span>
          </p>
          <p className="text-xl mb-4">
            <strong>HTML Class:</strong>{" "}
            <span className="font-mono bg-mindaro text-licorice px-2 py-1 rounded">
              {typeof window !== "undefined"
                ? document.documentElement.classList.toString() || "none"
                : "SSR"}
            </span>
          </p>
          <p className="text-xl mb-2">
            <strong>LocalStorage (persist:producthub-root):</strong>
            <span className="font-mono bg-mindaro text-licorice px-2 py-1 rounded text-sm block mt-1">
              {typeof window !== "undefined"
                ? localStorage.getItem("persist:producthub-root") || "null"
                : "SSR"}
            </span>
          </p>
        </div>

        <div className="p-6 border-2 border-licorice dark:border-mindaro rounded-lg bg-white dark:bg-[#1a1612]">
          <h2 className="text-2xl font-semibold mb-4">Theme Controls</h2>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => {
                console.log("🔵 Toggling theme...");
                dispatch(toggleTheme());
              }}
              className="px-6 py-3 bg-mindaro text-licorice rounded-lg font-semibold hover:bg-giants-orange hover:text-white transition-colors"
            >
              Toggle Theme
            </button>

            <button
              onClick={() => {
                console.log("☀️ Setting to light...");
                dispatch(setTheme("light"));
              }}
              className="px-6 py-3 bg-baby-powder text-licorice border-2 border-licorice rounded-lg font-semibold hover:bg-beige transition-colors"
            >
              Set Light
            </button>

            <button
              onClick={() => {
                console.log("🌙 Setting to dark...");
                dispatch(setTheme("dark"));
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
            <div className="p-4 bg-baby-powder dark:bg-licorice border-2 border-licorice dark:border-mindaro rounded">
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
