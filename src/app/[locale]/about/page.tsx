import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { FaCode, FaTools, FaMusic } from 'react-icons/fa';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('about.title'),
    description: t('about.description'),
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: '/en/about',
        zh: '/zh/about',
        ja: '/ja/about',
      },
    },
  };
}

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className="max-w-4xl w-full py-12 flex flex-col gap-12">
      <div className="space-y-4 text-center">
        <h1 className="text-5xl font-black uppercase"> {t('title')}</h1>
        <p className="text-xl text-foreground/60">{t('bio')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="card-standard flex flex-col gap-4">
          <div className="flex items-center gap-3 text-primary-600">
            <FaCode className="w-6 h-6" />
            <h2 className="text-xl font-bold">{t('software.title')}</h2>
          </div>
          <p className="text-foreground/70 leading-relaxed font-medium">
            {t('software.skills')}
          </p>
        </section>

        <section className="card-standard flex flex-col gap-4">
          <div className="flex items-center gap-3 text-sky-600">
            <FaTools className="w-6 h-6" />
            <h2 className="text-xl font-bold">{t('hardware.title')}</h2>
          </div>
          <p className="text-foreground/70 leading-relaxed font-medium">
            {t('hardware.skills')}
          </p>
        </section>

        <section className="card-standard flex flex-col gap-4 md:col-span-2">
          <div className="flex items-center gap-3 text-primary-700">
            <FaMusic className="w-6 h-6" />
            <h2 className="text-xl font-bold">{t('hobbies.title')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="font-bold text-xs uppercase tracking-widest text-foreground/30 mb-1">{t('hobbies.labels.music')}</p>
              <p className="font-medium">{t('hobbies.piano')}</p>
            </div>
            <div>
              <p className="font-bold text-xs uppercase tracking-widest text-foreground/30 mb-1">{t('hobbies.labels.gaming')}</p>
              <p className="font-medium">{t('hobbies.games')}</p>
            </div>
            <div>
              <p className="font-bold text-xs uppercase tracking-widest text-foreground/30 mb-1">{t('hobbies.labels.tech')}</p>
              <p className="font-medium">{t('hobbies.ai')}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
