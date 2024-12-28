import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { newsService } from "@/services/newsService";
import { NewsArticle } from "@/types/news";

interface ArticleCardProps {
  article: NewsArticle;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleClick = async () => {
    try {
      await newsService.incrementReadCount(article.id);
      navigate(`/article/${article.id}`);
    } catch (error) {
      console.error("Error incrementing read count:", error);
      toast({
        title: "Error",
        description: "Failed to track article view. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card
      className="cursor-pointer overflow-hidden hover:shadow-lg transition-shadow bg-card dark:bg-gray-800"
      onClick={handleClick}
    >
      <div className="aspect-video relative">
        <img
          src={article.image_url || "/placeholder.svg"}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      </div>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground dark:text-gray-400">{article.category}</span>
          <span className="flex items-center gap-1 text-muted-foreground dark:text-gray-400">
            <Eye className="w-4 h-4" />
            {article.read_count}
          </span>
        </div>
        <h3 className="font-semibold line-clamp-2 text-foreground dark:text-white">
          {article.title}
        </h3>
        <p className="text-sm line-clamp-2 text-muted-foreground dark:text-gray-300">
          {article.description}
        </p>
        <div className="text-sm text-muted-foreground dark:text-gray-400">
          {new Date(article.created_at).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};
