import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { newsService } from "@/services/newsService";
import { NewsArticle } from "@/types/news";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Calendar, Share2 } from "lucide-react";

export const ArticleView = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const articleData = await newsService.getArticleById(parseInt(id));
        setArticle(articleData);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article');
        toast({
          title: "Error",
          description: "Failed to load article. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-8 space-y-4">
        <div className="h-8 bg-muted rounded w-2/3 animate-pulse" />
        <div className="aspect-video bg-muted rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container max-w-4xl mx-auto py-8 text-center">
        <p className="text-lg text-muted-foreground">
          {error || "Article not found"}
        </p>
      </div>
    );
  }

  return (
    <article className="container max-w-4xl mx-auto py-8">
      <header className="mb-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center justify-between text-muted-foreground">
          <div className="space-x-4">
            <span>By {article.author}</span>
            <span>•</span>
            <span>{new Date(article.created_at).toLocaleDateString()}</span>
          </div>
          <span>{article.category}</span>
        </div>
      </header>

      <div className="aspect-video relative mb-8">
        <img
          src={article.image_url}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
        <span className="flex items-center">
          <Calendar className="mr-1 h-4 w-4" />
          {new Date(article.created_at).toLocaleDateString()}
        </span>
        <span className="flex items-center">
          <Eye className="mr-1 h-4 w-4" />
          {article.read_count} reads
        </span>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="lead mb-8 text-xl text-muted-foreground">
          {article.description}
        </p>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      <div className="flex items-center justify-between py-4 border-y">
        <div className="flex items-center gap-2">
          <span className="font-semibold">By {article.author}</span>
          <span className="text-muted-foreground">in {article.category}</span>
        </div>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
};
