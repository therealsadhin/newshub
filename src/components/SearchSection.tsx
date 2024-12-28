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
  return (
    <div className="container py-6 space-y-6">
      <div className="flex gap-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            className="whitespace-nowrap"
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
            className="pl-9"
          />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {filters.map((filter) => (
              <SelectItem key={filter} value={filter.toLowerCase().replace(" ", "-")}>
                {filter}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};