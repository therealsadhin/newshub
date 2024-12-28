import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

const categories = ["Trending", "Politics", "Sports", "Business"];

export const Header = () => {
  const { theme, setTheme } = useTheme();

  const handleCategoryClick = (category: string) => {
    console.log("Selected category:", category);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="border-b bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center">
          <div className="text-2xl font-bold mr-8">NewsHub</div>
          <div className="flex-1 flex items-center gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                className="whitespace-nowrap"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};