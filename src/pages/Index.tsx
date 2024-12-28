import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SearchSection } from "@/components/SearchSection";
import { NewsGrid } from "@/components/NewsGrid";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  readCount: number;
}

interface IndexProps {
  sortByTrending?: boolean;
}

const Index = ({ sortByTrending = false }: IndexProps) => {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Update selected category when route changes
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("");
    }
  }, [category]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (newCategory: string) => {
    setSelectedCategory(newCategory);
  };

  return (
    <div className="min-h-screen bg-background">
      <main>
        <SearchSection 
          onSearch={handleSearch}
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
        <NewsGrid 
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          sortByTrending={sortByTrending}
        />
      </main>
    </div>
  );
};

export default Index;