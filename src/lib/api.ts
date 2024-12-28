import { supabase } from "@/lib/supabase";
import { NewsArticle } from "@/types/news";

interface FetchNewsParams {
  query?: string;
  category?: string;
  trending?: boolean;
  limit?: number;
}

export async function fetchNews({
  query = "",
  category = "",
  trending = false,
  limit = 30,
}: FetchNewsParams = {}) {
  try {
    let queryBuilder = supabase
      .from("articles")
      .select("*");

    if (query) {
      queryBuilder = queryBuilder.ilike("title", `%${query}%`);
    }

    if (category) {
      queryBuilder = queryBuilder.eq("category", category);
    }

    if (trending) {
      queryBuilder = queryBuilder.order("read_count", { ascending: false });
    } else {
      queryBuilder = queryBuilder.order("created_at", { ascending: false });
    }

    // Add limit at the end
    queryBuilder = queryBuilder.limit(limit);

    const { data: articles, error } = await queryBuilder;

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Failed to fetch articles");
    }

    if (!articles) {
      return { articles: [] };
    }

    // Remove duplicates by title
    const uniqueArticles = Array.from(
      new Map(articles.map(article => [article.title, article])).values()
    ) as NewsArticle[];

    return { articles: uniqueArticles };
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}
