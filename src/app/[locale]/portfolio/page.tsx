import { Portfolio } from '@/features/portfolio/Portfolio';
import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('portfolio.title'),
    description: t('portfolio.description'),
    alternates: {
      canonical: `/${locale}/portfolio`,
      languages: {
        en: '/en/portfolio',
        zh: '/zh/portfolio',
        ja: '/ja/portfolio',
      },
    },
  };
}

export default function PortfolioPage() {
  const t = useTranslations('Portfolio');

  return (
    <div className="py-12 w-full flex justify-center px-4">
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4 py-20">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-foreground/40 animate-pulse">{t('loading_repos')}</p>
        </div>
      }>
        <Portfolio />
      </Suspense>
    </div>
  );
}
