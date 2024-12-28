import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useNavigate } from "react-router-dom";

const categories = ["Trending", "Politics", "Sports", "Business"];

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    if (category === "Trending") {
      navigate("/trending");
    } else {
      navigate(`/category/${category.toLowerCase()}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="border-b bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center">
          <h1 
            onClick={() => navigate("/")}
            className="text-2xl font-bold cursor-pointer hover:text-primary transition-colors mr-8"
          >
            NewsHub
          </h1>
          
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