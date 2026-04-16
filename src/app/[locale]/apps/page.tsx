'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { APPS } from '@/lib/apps';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function AppsPage() {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center gap-16 py-12 w-full max-w-6xl animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tighter uppercase">{t('Apps.title')}</h1>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">{t('Apps.subtitle')}</p>
      </div>

      <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6 px-4">
        {APPS.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={`/apps/${app.slug}`}
              className="group block card-standard hover:border-primary-500/50 transition-all shadow-sm h-full relative overflow-hidden"
            >
              <div className="flex items-center md:items-start justify-between relative z-10 gap-4">
                <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-0">
                  <div className={`p-3 md:p-4 rounded-lg text-white ${app.color} shadow-lg shadow-${app.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform flex-shrink-0`}>
                    <app.icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  
                  <div className="md:mt-6">
                    <h2 className="text-xl md:text-2xl font-bold group-hover:text-primary-600 transition-colors leading-tight">
                      {t(app.titleKey)}
                    </h2>
                    <p className="text-sm md:text-base text-foreground/60 leading-relaxed md:block hidden mt-2">
                      {t(app.descriptionKey)}
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded-md bg-foreground/5 opacity-40 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-foreground/40" />
                </div>
              </div>

              {/* Description visible on mobile list view but compact */}
              <p className="text-sm text-foreground/60 leading-relaxed md:hidden mt-3 line-clamp-2">
                {t(app.descriptionKey)}
              </p>

              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity transform rotate-12 pointer-events-none">
                <app.icon className="w-24 h-24 md:w-32 md:h-32" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 py-8">
        <div className="h-px w-24 bg-border" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/20">
          {t('Apps.coming_soon')}
        </p>
      </div>
    </div>
  );
}
