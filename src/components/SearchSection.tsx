import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const filterCategories = [
  "Entertainment",
  "World news",
  "Politics",
  "Breaking news",
  "Business",
  "Health",
  "Lifestyle journalism",
  "Political journalism",
  "Science journalism",
];

interface SearchSectionProps {
  onSearch: (query: string) => void;
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

export const SearchSection = ({ onSearch, onCategorySelect, selectedCategory }: SearchSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Debounce search to avoid too many updates
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleFilterSelect = (filter: string) => {
    const newFilter = filter === selectedCategory ? "" : filter;
    onCategorySelect(newFilter);
    
    if (newFilter) {
      toast({
        title: "Filter Applied",
        description: `Filtered by: ${filter}`,
      });
    }
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
          <Input
            placeholder="Search news..."
            className="pl-9 rounded-full bg-background dark:bg-gray-800 text-foreground dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {filterCategories.map((filter) => (
            <Button
              key={filter}
              variant={selectedCategory === filter ? "default" : "outline"}
              className={`rounded-full text-sm transition-all duration-200 hover:scale-105 ${
                selectedCategory === filter
                  ? "bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground"
                  : "text-foreground dark:text-gray-300 dark:hover:text-white"
              }`}
              onClick={() => handleFilterSelect(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};