import { getTranslations } from 'next-intl/server';
import { AppsView } from '@/components/views/AppsView';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('apps.title'),
    description: t('apps.description'),
    alternates: {
      canonical: `/${locale}/apps`,
      languages: {
        en: '/en/apps',
        zh: '/zh/apps',
        ja: '/ja/apps',
      },
    },
  };
}

export default function AppsPage() {
  return <AppsView />;
}
