const { exec } = require('child_process');
const generateSitemap = require('../src/utils/generateSitemap').default;

// Generate sitemap
generateSitemap().then(() => {
  // Ping search engines
  const searchEngines = [
    'http://www.google.com/webmasters/sitemaps/ping?sitemap=https://newshub.com/sitemap.xml',
    'http://www.bing.com/ping?sitemap=https://newshub.com/sitemap.xml'
  ];

  searchEngines.forEach(url => {
    exec(`curl ${url}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error pinging search engine: ${error}`);
        return;
      }
      console.log(`Successfully pinged search engine with sitemap`);
    });
  });
});
