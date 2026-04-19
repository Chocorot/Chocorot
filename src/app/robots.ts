import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/auth-demo'],
    },
    sitemap: 'https://www.chocorot.net/sitemap.xml',
  };
}
