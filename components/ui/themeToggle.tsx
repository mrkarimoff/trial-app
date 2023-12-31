"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ModeToggle({ UiTranslations }: { UiTranslations: any }) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="dark:bg-slate-700 dark:hover:bg-slate-600 bg-white"
          variant="outline"
          size="icon"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark:bg-slate-900" align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {UiTranslations.light}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>{UiTranslations.dark}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          {UiTranslations.system}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
