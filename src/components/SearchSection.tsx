import { useState } from "react";
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

export const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const { toast } = useToast();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    // Here you would typically trigger the search functionality
    console.log("Searching for:", value);
  };

  const handleFilterSelect = (filter: string) => {
    const newFilter = filter === selectedFilter ? "" : filter;
    setSelectedFilter(newFilter);
    console.log("Filter selected:", newFilter);
    
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