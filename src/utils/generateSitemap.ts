import { writeFileSync } from 'fs';
import { format } from 'date-fns';
import { newsService } from '@/services/newsService';

async function generateSitemap() {
  try {
    // Get all articles
    const articles = await newsService.getAllArticles();
    
    // Get all categories
    const categories = ['world', 'technology', 'business', 'sports', 'trending'];
    
    // Static pages
    const staticPages = [
      '/',
      '/about',
      '/terms',
      '/privacy',
      '/help',
      '/careers'
    ];

    // Create XML content
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
    <url>
      <loc>https://newshub.com${page}</loc>
      <lastmod>${format(new Date(), 'yyyy-MM-dd')}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page === '/' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
  
  ${categories.map(category => `
    <url>
      <loc>https://newshub.com/category/${category}</loc>
      <lastmod>${format(new Date(), 'yyyy-MM-dd')}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>
  `).join('')}
  
  ${articles.map(article => `
    <url>
      <loc>https://newshub.com/article/${article.id}</loc>
      <lastmod>${format(new Date(article.updated_at || article.created_at), 'yyyy-MM-dd')}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  `).join('')}
</urlset>`;

    // Write sitemap to public directory
    writeFileSync('./public/sitemap.xml', sitemap);
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

export default generateSitemap;
