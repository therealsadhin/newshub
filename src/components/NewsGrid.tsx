import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArticleCard } from "@/components/ArticleCard";
import { fetchNews } from "@/lib/api";

interface NewsGridProps {
  searchQuery: string;
  selectedCategory: string;
  sortByTrending?: boolean;
}

export const NewsGrid = ({ searchQuery, selectedCategory, sortByTrending = false }: NewsGridProps) => {
  const { toast } = useToast();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["news", searchQuery, selectedCategory, sortByTrending],
    queryFn: () => fetchNews({ 
      query: searchQuery, 
      category: selectedCategory, 
      trending: sortByTrending 
    }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError && error instanceof Error) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch news articles. Please try again later.",
        variant: "destructive",
      });
    }
  }, [isError, error, toast]);

  if (isLoading) {
    return (
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-4 space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </Card>
        ))}
      </div>
    );
  }

  const articles = data?.articles || [];

  if (articles.length === 0) {
    return (
      <div className="container py-8 text-center">
        <p className="text-lg text-muted-foreground dark:text-gray-400">
          {searchQuery || selectedCategory
            ? "No articles found. Try a different search term or category."
            : "No articles available at the moment."}
        </p>
      </div>
    );
  }

  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {articles.map((article, index) => (
        <ArticleCard key={`${article.id}-${index}`} article={article} />
      ))}
    </div>
  );
};