import {
  Check,
  ChevronsUpDown,
  GalleryVerticalEnd,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "./theme-provider";
import { forwardRef } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const ThemeToggle = forwardRef<HTMLButtonElement>(() => {
  const { setTheme, theme } = useTheme();
  const data = ["light", "dark", "system"];
  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="ghost" size="icon">
    //       <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
    //       <Moon className="hidden h-5 w-5 dark:block" />
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent
    //     className="w-[--radix-dropdown-menu-trigger-width]"
    //     align="start"
    //   >
    //     {data.map((_theme) => (
    //       <DropdownMenuItem key={_theme} onSelect={(e) => setTheme(e, _theme)}>
    //         {_theme} {_theme === theme && <Check className="ml-auto" />}
    //       </DropdownMenuItem>
    //     ))}
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => setTheme(e, theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <Moon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
});
ThemeToggle.displayName = "ThemeToggle";
