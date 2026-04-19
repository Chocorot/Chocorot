import { Portfolio } from '@/features/portfolio/Portfolio';
import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generateLocalizedMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/SEO/Breadcrumb';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return generateLocalizedMetadata({
    title: t('portfolio.title'),
    description: t('portfolio.description'),
    path: '/portfolio',
    locale,
  });
}

export default function PortfolioPage() {
  const t = useTranslations('Portfolio');
  const nt = useTranslations('Navigation');

  return (
    <div className="py-12 w-full flex flex-col items-center px-4">
      <Breadcrumb 
        items={[
          { name: nt('home'), item: '/' },
          { name: nt('portfolio'), item: '/portfolio' }
        ]} 
      />
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
