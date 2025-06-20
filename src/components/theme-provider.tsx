'use client'
import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let theme = localStorage.getItem("theme");
      if (!theme) {
        theme = "dark";
        localStorage.setItem("theme", "dark");
      }
      if (theme === "light") {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  return <>{children}</>;
} 