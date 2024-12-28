import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const categories = ["Trending", "Politics", "Sports", "Business"];
const filters = [
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

  useEffect(() => {
    // Notify when filter changes
    if (selectedFilter) {
      toast({
        title: "Filter Applied",
        description: `Filtered by: ${selectedFilter}`,
      });
    }
  }, [selectedFilter, toast]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    console.log("Searching for:", value);
    // You would typically make an API call here to fetch filtered results
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
    toast({
      title: "Category Selected",
      description: `Viewing ${category} news`,
    });
  };

  const handleFilterSelect = (value: string) => {
    setSelectedFilter(value);
    // You would typically make an API call here to fetch filtered results
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
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search news..."
            className="pl-9 rounded-full"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Select onValueChange={handleFilterSelect} value={selectedFilter}>
          <SelectTrigger className="w-full sm:w-[200px] rounded-full">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {filters.map((filter) => (
              <SelectItem 
                key={filter} 
                value={filter.toLowerCase().replace(" ", "-")}
                className="cursor-pointer"
              >
                {filter}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};