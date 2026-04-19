import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = 'https://www.chocorot.net';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const paths = ['', '/about', '/portfolio', '/apps', '/websites', '/socials'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  paths.forEach((path) => {
    // Add an entry for each locale
    locales.forEach((locale) => {
      const url = `${BASE_URL}/${locale}${path}`;
      
      // Define alternates for hreflang
      const alternates = locales.reduce((acc, l) => {
        acc[l] = `${BASE_URL}/${l}${path}`;
        return acc;
      }, {} as Record<string, string>);

      sitemapEntries.push({
        url: url,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'daily' : 'weekly',
        priority: path === '' ? 1 : 0.8,
        // @ts-ignore - next-intl pattern for alternates in sitemap
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  return sitemapEntries;
}
