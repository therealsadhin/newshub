import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { newsService } from "@/services/newsService";
import { NewsArticle } from "@/types/news";
import { useToast } from "@/hooks/use-toast";

interface NewsGridProps {
  searchQuery: string;
  selectedCategory: string;
  sortByTrending?: boolean;
}

export const NewsGrid = ({ searchQuery, selectedCategory, sortByTrending = false }: NewsGridProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const { articles } = await newsService.getArticles({
          category: selectedCategory,
          searchQuery,
          sortByTrending,
        });
        setArticles(articles);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles');
        toast({
          title: "Error",
          description: "Failed to load articles. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [searchQuery, selectedCategory, sortByTrending, toast]);

  const handleArticleClick = async (article: NewsArticle) => {
    try {
      await newsService.incrementReadCount(article.id);
      navigate(`/article/${article.id}`);
    } catch (err) {
      console.error('Error incrementing read count:', err);
    }
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="cursor-pointer overflow-hidden">
              <div className="aspect-video bg-muted animate-pulse" />
              <CardContent className="p-4 space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8 text-center">
        <p className="text-lg text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="container py-8 text-center">
        <p className="text-lg text-muted-foreground">No articles found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card
            key={article.id}
            className="cursor-pointer overflow-hidden hover:shadow-lg transition-shadow"
            onClick={() => handleArticleClick(article)}
          >
            <div className="aspect-video relative">
              <img
                src={article.image_url}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{article.category}</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {article.read_count}
                </span>
              </div>
              <h3 className="font-semibold line-clamp-2">{article.title}</h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {article.description}
              </p>
              <div className="text-sm text-muted-foreground">
                {new Date(article.created_at).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};