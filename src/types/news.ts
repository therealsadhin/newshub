export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  image_url: string;
  category: string;
  source: string;
  author: string;
  url: string;
  read_count: number;
  created_at: string;
  updated_at: string;
}

export interface NewsResponse {
  articles: NewsArticle[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}
