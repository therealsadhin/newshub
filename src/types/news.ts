export interface NewsArticle {
  id: number;
  title: string;
  description: string;
  content: string;
  image_url: string;
  category: string;
  read_count: number;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface NewsAPIResponse {
  news: {
    title: string;
    description: string;
    content: string;
    urlToImage: string;
    category: string;
    author: string;
    publishedAt: string;
  }[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}
