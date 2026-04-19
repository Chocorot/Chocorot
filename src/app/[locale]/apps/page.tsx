import { getTranslations } from 'next-intl/server';
import { AppsView } from '@/components/views/AppsView';
import { generateLocalizedMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/SEO/Breadcrumb';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return generateLocalizedMetadata({
    title: t('apps.title'),
    description: t('apps.description'),
    path: '/apps',
    locale,
  });
}

export default async function AppsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const nt = await getTranslations({ locale, namespace: 'Navigation' });

  return (
    <div className="flex flex-col items-center w-full">
      <Breadcrumb 
        items={[
          { name: nt('home'), item: '/' },
          { name: nt('apps'), item: '/apps' }
        ]} 
      />
      <AppsView />
    </div>
  );
}
