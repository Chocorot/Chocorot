import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { FaExternalLinkAlt, FaGlobe, FaRobot } from 'react-icons/fa';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('websites.title'),
    description: t('websites.description'),
    alternates: {
      canonical: `/${locale}/websites`,
      languages: {
        en: '/en/websites',
        zh: '/zh/websites',
        ja: '/ja/websites',
      },
    },
  };
}

export default function WebsitesPage() {
  const t = useTranslations('Websites');

  return (
    <div className="max-w-5xl w-full py-12 flex flex-col gap-12">
      <div className="space-y-4 text-center">
        <h1 className="text-5xl font-black uppercase">{t('title')}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-standard flex flex-col gap-6 relative group overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-lg bg-primary-100 text-primary-600">
              <FaGlobe className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{t('naic.name')}</h2>
              <p className="text-xs font-mono uppercase tracking-widest text-primary-600/60">naic.chocorot.net</p>
            </div>
          </div>
          <p className="text-foreground/70 leading-relaxed text-lg">
            {t('naic.description')}
          </p>
          <a
            href="http://naic.chocorot.net"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-3 py-4 rounded-md bg-primary-600 text-white font-bold hover:bg-primary-700 transition-all px-6"
          >
            {t('visit')} <FaExternalLinkAlt className="w-4 h-4" />
          </a>
        </div>

        <div className="card-standard flex flex-col gap-6 relative group overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-lg bg-[#5865F2]/10 text-[#5865F2]">
              <FaRobot className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{t('echo.name')}</h2>
              <p className="text-xs font-mono uppercase tracking-widest text-[#5865F2]/60">bot.chocorot.net</p>
            </div>
          </div>
          <p className="text-foreground/70 leading-relaxed text-lg">
            {t('echo.description')}
          </p>
          <a
            href="http://bot.chocorot.net"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-3 py-4 rounded-md bg-[#5865F2] text-white font-bold hover:brightness-110 transition-all px-6"
          >
            {t('visit')} <FaExternalLinkAlt className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
