import { getTranslations } from 'next-intl/server';
import { SocialsView } from '@/components/views/SocialsView';
import { generateLocalizedMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/SEO/Breadcrumb';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return generateLocalizedMetadata({
    title: t('socials.title'),
    description: t('socials.description'),
    path: '/socials',
    locale,
  });
}

export default async function SocialsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const nt = await getTranslations({ locale, namespace: 'Navigation' });

  return (
    <div className="flex flex-col items-center w-full">
      <Breadcrumb 
        items={[
          { name: nt('home'), item: '/' },
          { name: nt('socials'), item: '/socials' }
        ]} 
      />
      <SocialsView />
    </div>
  );
}
