import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { FaArrowRight } from 'react-icons/fa';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('home.title'),
    description: t('home.description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        zh: '/zh',
        ja: '/ja',
      },
    },
  };
}

export default function HomePage() {
  const t = useTranslations('Index');
  const nt = useTranslations('Navigation');

  return (
    <div className="flex flex-col items-center text-center py-16 md:py-32 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <h1 className="text-7xl md:text-9xl font-black text-primary-600">
          {t('title')}
        </h1>
        
        <p className="text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto leading-relaxed font-medium">
          {t('hero.subtitle')}
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <Link
          href="/portfolio"
          className="group flex items-center gap-3 px-8 py-4 rounded-md bg-primary-600 text-white font-bold transition-all hover:bg-primary-700 hover:scale-105"
        >
          {nt('portfolio')}
          <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="/about"
          className="group flex items-center gap-3 px-8 py-4 rounded-md bg-foreground/5 border border-border font-bold transition-all hover:bg-foreground/10"
        >
          {nt('about')}
        </Link>
      </div>
    </div>
  );
}
