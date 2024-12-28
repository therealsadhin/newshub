import { supabase } from '@/lib/supabase';
import { NewsArticle } from '@/types/news';

export const newsService = {
  async syncNewsFromAPI() {
    try {
      console.log('Fetching news from API...');
      const { data, error } = await supabase.functions.invoke('fetch-news', {
        body: { limit: 100 }
      });
      
      if (error) {
        console.error('Error from Edge function:', error);
        throw error;
      }

      if (!data || !Array.isArray(data.articles)) {
        console.error('Invalid response from Edge function:', data);
        throw new Error('Invalid response from news API');
      }

      console.log('Received news articles:', data.articles.length);

      // Clear existing articles
      const { error: clearError } = await supabase
        .from('articles')
        .delete()
        .neq('id', 0); // Delete all articles

      if (clearError) {
        console.error('Error clearing articles:', clearError);
        throw clearError;
      }

      // Insert articles in batches to avoid timeout
      const batchSize = 20;
      const articles = data.articles;
      
      for (let i = 0; i < articles.length; i += batchSize) {
        const batch = articles.slice(i, i + batchSize);
        const { error: insertError } = await supabase
          .from('articles')
          .insert(
            batch.map((article: any) => ({
              title: article.title || 'Untitled',
              description: article.description || '',
              content: article.content || '',
              image_url: article.urlToImage || 'https://via.placeholder.com/800x400',
              category: article.category || 'General',
              author: article.author || 'Unknown',
              read_count: 0,
              created_at: article.publishedAt || new Date().toISOString(),
              updated_at: new Date().toISOString()
            }))
          );

        if (insertError) {
          console.error(`Error inserting batch ${i}-${i + batchSize}:`, insertError);
          continue; // Continue with next batch instead of failing completely
        }
      }

      console.log('Successfully synced news articles');
      return true;
    } catch (error) {
      console.error('Error in syncNewsFromAPI:', error);
      throw error;
    }
  },

  async getArticles({ 
    category = '', 
    searchQuery = '', 
    sortByTrending = false,
    page = 1,
    limit = 12 
  }) {
    try {
      // Always sync with API first
      await this.syncNewsFromAPI();

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
        throw error;
      }

      return { 
        articles: (data || []) as NewsArticle[], 
        total: count || 0 
      };
    } catch (error) {
      console.error('Error in getArticles:', error);
      throw error;
    }
  },

  async getArticleById(id: number) {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching article by ID:', error);
        throw error;
      }

      return data as NewsArticle;
    } catch (error) {
      console.error('Error in getArticleById:', error);
      throw error;
    }
  },

  async incrementReadCount(id: number) {
    try {
      const { error } = await supabase.rpc('increment_read_count', { article_id: id });

      if (error) {
        console.error('Error incrementing read count:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in incrementReadCount:', error);
      throw error;
    }
  },

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
};
