"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--card-bg)] animate-pulse" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--card-bg)] flex items-center justify-center transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_0_12px_rgba(240,180,41,0.3)] group"
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun size={16} className="text-[var(--accent)] group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon size={16} className="text-[var(--accent)] group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}
