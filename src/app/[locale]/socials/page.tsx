import { getTranslations } from 'next-intl/server';
import { SocialsView } from '@/components/views/SocialsView';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('socials.title'),
    description: t('socials.description'),
    alternates: {
      canonical: `/${locale}/socials`,
      languages: {
        en: '/en/socials',
        zh: '/zh/socials',
        ja: '/ja/socials',
      },
    },
  };
}

export default function SocialsPage() {
  return <SocialsView />;
}
