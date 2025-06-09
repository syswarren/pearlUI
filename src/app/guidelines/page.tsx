"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as DropdownMenu from "@/components/ui/dropdown-menu";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function GuidelinesPage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const currentlyDark = html.classList.contains("dark");
    if (currentlyDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">UI Guidelines</h1>
        <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </Button>
      </div>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Inputs</h2>
        <Input placeholder="Type something..." className="mb-2" />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Dropdown</h2>
        <DropdownMenu.DropdownMenu>
          <DropdownMenu.DropdownMenuTrigger asChild>
            <Button>Open Dropdown</Button>
          </DropdownMenu.DropdownMenuTrigger>
          <DropdownMenu.DropdownMenuContent>
            <DropdownMenu.DropdownMenuItem>Option 1</DropdownMenu.DropdownMenuItem>
            <DropdownMenu.DropdownMenuItem>Option 2</DropdownMenu.DropdownMenuItem>
            <DropdownMenu.DropdownMenuItem>Option 3</DropdownMenu.DropdownMenuItem>
          </DropdownMenu.DropdownMenuContent>
        </DropdownMenu.DropdownMenu>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Buttons</h2>
        <div className="flex gap-2 flex-wrap">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Text</h2>
        <h1 className="text-3xl font-bold">Heading 1 (h1)</h1>
        <h2 className="text-2xl font-semibold">Heading 2 (h2)</h2>
        <p className="text-base mt-2">This is a paragraph (p). Use this style for regular text content.</p>
      </section>
    </div>
  );
} 