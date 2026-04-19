import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { APPS } from '@/lib/apps';
import { AppDetailView } from '@/components/views/AppDetailView';
import { generateLocalizedMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/SEO/Breadcrumb';

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

  return generateLocalizedMetadata({
    title: `${title} | Apps`,
    description: description,
    path: `/apps/${slug}`,
    locale,
  });
}

export default async function AppPage({ params }: AppPageProps) {
  const { locale, slug } = await params;
  
  const appMetadata = APPS.find((a) => a.slug === slug);
  if (!appMetadata) {
    notFound();
  }

  const t = await getTranslations({ locale });
  const nt = await getTranslations({ locale, namespace: 'Navigation' });

  return (
    <div className="flex flex-col items-center w-full">
      <Breadcrumb 
        items={[
          { name: nt('home'), item: '/' },
          { name: nt('apps'), item: '/apps' },
          { name: t(appMetadata.titleKey), item: `/apps/${slug}` }
        ]} 
      />
      <AppDetailView slug={slug} />
    </div>
  );
}
