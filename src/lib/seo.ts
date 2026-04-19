import { Metadata } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = 'https://www.chocorot.net';

export interface MetadataOptions {
  title: string;
  description: string;
  path: string;
  locale: string;
  ogImage?: string;
  keywords?: string[];
}

export function generateLocalizedMetadata(options: MetadataOptions): Metadata {
  const { title, description, path, locale, ogImage = '/og-image.png', keywords = [] } = options;
  
  // Clean up path (remove leading/trailing slashes for consistency)
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  const canonicalPath = cleanPath ? `/${locale}/${cleanPath}` : `/${locale}`;
  
  // Construct language alternates including x-default
  const languages: Record<string, string> = {};
  routing.locales.forEach((l) => {
    languages[l] = cleanPath ? `/${l}/${cleanPath}` : `/${l}`;
  });
  
  // Google recommends x-default to be the default language or a language selector
  languages['x-default'] = cleanPath ? `/${routing.defaultLocale}/${cleanPath}` : `/${routing.defaultLocale}`;

  return {
    title,
    description,
    keywords: [...keywords, "Chocorot", "Creative Developer"],
    alternates: {
      canonical: canonicalPath,
      languages: languages,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${canonicalPath}`,
      siteName: 'Chocorot',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'en' ? 'en_US' : locale === 'zh' ? 'zh_CN' : 'ja_JP',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@Chocorot',
    },
  };
}
