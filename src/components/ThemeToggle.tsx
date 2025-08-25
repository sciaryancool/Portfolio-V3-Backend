"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Avoid SSR/CSR mismatch: only choose an icon after mount
  const current = theme === "system" ? systemTheme : theme;

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme((current === "dark" ? "light" : "dark") || "light")}
      className="btn"
    >
      {!mounted ? (
        // Render a stable placeholder during SSR to avoid mismatches
        <span className="opacity-70">Theme</span>
      ) : current === "dark" ? (
        <>
          <Sun className="w-4 h-4 mr-2" /> Light Mode
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 mr-2" /> Dark Mode
        </>
      )}
    </button>
  );
}