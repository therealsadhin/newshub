import { supabase } from "@/lib/supabase";
import { NewsArticle } from "@/types/news";

const GNEWS_API_KEY = '0ba8b864c082d3824e2cc4429af93688';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

const CATEGORIES = [
  'general',
  'world',
  'nation',
  'business',
  'technology',
  'entertainment',
  'sports',
  'science',
  'health'
];

const SAMPLE_ARTICLES: NewsArticle[] = [
  {
    id: 1,
    title: "AI Revolution in 2024: What to Expect",
    description: "Artificial Intelligence continues to transform industries. Here's what experts predict for 2024.",
    content: "The AI landscape is rapidly evolving with new developments in machine learning, natural language processing, and computer vision...",
    image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    category: "Technology",
    author: "Tech Insider",
    read_count: 150,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Global Climate Summit 2024",
    description: "World leaders gather to address climate change challenges and set new environmental goals.",
    content: "The annual climate summit brings together representatives from over 190 countries to discuss urgent environmental issues...",
    image_url: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d",
    category: "World",
    author: "Environmental Report",
    read_count: 120,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    title: "Space Exploration Breakthrough",
    description: "NASA announces major discovery in the search for extraterrestrial life.",
    content: "Scientists at NASA have made a groundbreaking discovery that could revolutionize our understanding of life in the universe...",
    image_url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
    category: "Science",
    author: "Space Weekly",
    read_count: 200,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

class NewsService {
  lastFetchTime: number;

  constructor() {
    this.lastFetchTime = 0;
  }

  async initializeWithSampleData() {
    try {
      // Check if we already have articles
      const { count } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true });

      if (!count || count === 0) {
        console.log('Initializing with sample articles...');
        
        const { error } = await supabase
          .from('articles')
          .insert(SAMPLE_ARTICLES);

        if (error) {
          console.error('Error inserting sample articles:', error);
          throw error;
        }

        console.log('Successfully added sample articles');
      }
    } catch (error) {
      console.error('Error in initializeWithSampleData:', error);
      throw error;
    }
  }

  async syncNewsFromAPI(force = false) {
    try {
      // Check if we have articles and if the last fetch was recent
      const { count } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true });

      const now = Date.now();
      const shouldFetch = force || 
        !count || 
        count === 0 || 
        (now - this.lastFetchTime) > CACHE_DURATION;

      if (!shouldFetch) {
        console.log('Using cached articles...');
        return true;
      }

      console.log('Fetching news from GNews API...');
      
      let allArticles = [];

      // Fetch articles from each category
      for (const category of CATEGORIES) {
        try {
          console.log(`Fetching ${category} news...`);
          const response = await fetch(
            `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${GNEWS_API_KEY}`
          );

          if (response.status === 429) {
            console.log(`Rate limit reached for ${category}, skipping...`);
            continue;
          }

          if (!response.ok) {
            console.error(`Error fetching ${category} news:`, response.statusText);
            continue;
          }

          const data = await response.json();
          
          if (data && Array.isArray(data.articles)) {
            // Add category to each article
            const articlesWithCategory = data.articles.map(article => ({
              ...article,
              category: category.charAt(0).toUpperCase() + category.slice(1) // Capitalize category
            }));
            allArticles = [...allArticles, ...articlesWithCategory];
          }

          // Wait a bit between requests to avoid rate limits
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Error fetching ${category} news:`, error);
          continue;
        }
      }

      if (allArticles.length === 0) {
        console.log('No articles received from API');
        return false;
      }

      console.log('Received news articles:', allArticles.length);

      // Only clear existing articles if we got new ones
      const { error: clearError } = await supabase
        .from('articles')
        .delete()
        .neq('id', 0);

      if (clearError) {
        console.error('Error clearing articles:', clearError);
        throw clearError;
      }

      // Insert articles in batches to avoid timeout
      const batchSize = 20;
      
      for (let i = 0; i < allArticles.length; i += batchSize) {
        const batch = allArticles.slice(i, i + batchSize);
        const { error: insertError } = await supabase
          .from('articles')
          .insert(
            batch.map((article: any) => ({
              title: article.title || 'Untitled',
              description: article.description || '',
              content: article.content || '',
              image_url: article.image || 'https://via.placeholder.com/800x400',
              category: article.category || 'General',
              author: article.source?.name || 'Unknown',
              read_count: 0,
              created_at: article.publishedAt || new Date().toISOString(),
              updated_at: new Date().toISOString()
            }))
          );

        if (insertError) {
          console.error(`Error inserting batch ${i}-${i + batchSize}:`, insertError);
          continue;
        }
      }

      this.lastFetchTime = now;
      console.log('Successfully synced news articles');
      return true;
    } catch (error) {
      console.error('Error in syncNewsFromAPI:', error);
      // If we have cached data, use it instead of failing
      const { count } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true });
      
      if (count && count > 0) {
        console.log('Error occurred but using cached data...');
        return true;
      }
      throw error;
    }
  }

  async getArticles({ 
    category = '', 
    searchQuery = '', 
    sortByTrending = false,
    page = 1,
    limit = 12 
  }) {
    try {
      // Initialize with sample data if needed
      await this.initializeWithSampleData();

      // Try to sync but don't fail if it doesn't work
      try {
        await this.syncNewsFromAPI();
      } catch (error) {
        console.error('Error syncing news, will try to use cached data:', error);
      }

      let query = supabase
        .from('articles')
        .select('*', { count: 'exact' });

      if (category) {
        query = query.eq('category', category);
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      if (sortByTrending) {
        query = query.order('read_count', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching articles:', error);
        throw new Error("Failed to fetch articles");
      }

      return { 
        articles: (data || []) as NewsArticle[], 
        total: count || 0 
      };
    } catch (error) {
      console.error('Error in getArticles:', error);
      throw error;
    }
  }

  async getArticleById(id: number) {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching article by ID:', error);
        throw new Error("Failed to fetch article");
      }

      return data as NewsArticle;
    } catch (error) {
      console.error('Error in getArticleById:', error);
      throw error;
    }
  }

  async incrementReadCount(id: number) {
    try {
      const { error } = await supabase.rpc('increment_read_count', { article_id: id });

      if (error) {
        console.error('Error incrementing read count:', error);
        throw new Error("Failed to update read count");
      }
    } catch (error) {
      console.error('Error in incrementReadCount:', error);
      throw error;
    }
  }

  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in getCategories:', error);
      throw error;
    }
  }
}

export const newsService = new NewsService();
