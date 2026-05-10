"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { themeStorageKey } from "@/components/portfolio/theme-storage";

type Theme = "light" | "dark";

const themeChangeEvent = "portfolio-theme-change";

function getThemeSnapshot(): Theme {
  if (typeof document === "undefined") {
    return "dark";
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function subscribeToTheme(callback: () => void) {
  window.addEventListener(themeChangeEvent, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(themeChangeEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  window.localStorage.setItem(themeStorageKey, theme);
  window.dispatchEvent(new Event(themeChangeEvent));
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => "dark"
  );

  function toggleTheme() {
    applyTheme(theme === "dark" ? "light" : "dark");
  }

  const isDark = theme === "dark";
  const Icon = isDark ? Sun : Moon;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={toggleTheme}
    >
      <Icon className="size-5" strokeWidth={2.3} />
    </Button>
  );
}
