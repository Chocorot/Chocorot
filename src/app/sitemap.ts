import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { APPS } from '@/lib/apps';

const BASE_URL = 'https://www.chocorot.net';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  
  // Base paths to index
  const basePaths = ['', '/about', '/portfolio', '/apps', '/websites', '/socials'];
  
  // Dynamic app paths
  const appPaths = APPS.map(app => `/apps/${app.slug}`);
  
  const allPaths = [...basePaths, ...appPaths];
  const sitemapEntries: MetadataRoute.Sitemap = [];

  allPaths.forEach((path) => {
    locales.forEach((locale) => {
      const url = `${BASE_URL}/${locale}${path}`;
      
      const languages = locales.reduce((acc, l) => {
        acc[l] = `${BASE_URL}/${l}${path}`;
        return acc;
      }, {} as Record<string, string>);
      
      // Add x-default
      languages['x-default'] = `${BASE_URL}/${routing.defaultLocale}${path}`;

      sitemapEntries.push({
        url: url,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'daily' : 'weekly',
        priority: path === '' ? 1 : path.startsWith('/apps') ? 0.7 : 0.8,
        // @ts-ignore - next-intl pattern for alternates in sitemap
        alternates: {
          languages: languages,
        },
      });
    });
  });

  return sitemapEntries;
}
