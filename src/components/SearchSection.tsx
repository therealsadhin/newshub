import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const categories = ["Trending", "Politics", "Sports", "Business"];
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

export const SearchSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const { toast } = useToast();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value.length > 0) {
      toast({
        title: "Searching",
        description: `Searching for: ${value}`,
      });
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    toast({
      title: "Category Selected",
      description: `Viewing ${category} news`,
    });
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter === selectedFilter ? "" : filter);
    if (filter !== selectedFilter) {
      toast({
        title: "Filter Applied",
        description: `Filtered by: ${filter}`,
      });
    }
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="rounded-full whitespace-nowrap min-w-[100px] transition-all duration-200 hover:scale-105"
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search news..."
            className="pl-9 rounded-full"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {filterCategories.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              className="rounded-full text-sm transition-all duration-200 hover:scale-105"
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