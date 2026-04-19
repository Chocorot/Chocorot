import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { APPS } from '@/lib/apps';
import { AppDetailView } from '@/components/views/AppDetailView';

interface AppPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: AppPageProps) {
  const { locale, slug } = await params;
  const app = APPS.find((a) => a.slug === slug);
  
  if (!app) return {};

  const t = await getTranslations({ locale });
  const title = t(app.titleKey);
  const description = t(app.descriptionKey);

  return {
    title: `${title} | Apps`,
    description: description,
    alternates: {
      canonical: `/${locale}/apps/${slug}`,
      languages: {
        en: `/en/apps/${slug}`,
        zh: `/zh/apps/${slug}`,
        ja: `/ja/apps/${slug}`,
      },
    },
  };
}

export default async function AppPage({ params }: AppPageProps) {
  const { slug } = await params;
  
  const appMetadata = APPS.find((a) => a.slug === slug);
  if (!appMetadata) {
    notFound();
  }

  return <AppDetailView slug={slug} />;
}
