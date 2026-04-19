'use client';

import { useTranslations } from 'next-intl';
import { FaGithub, FaYoutube, FaDiscord } from 'react-icons/fa';
import { LanguageSelector } from '../atoms/LanguageSelector';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="w-full border-t border-border bg-background/50 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="text-xl font-black">CHOCOROT</span>
          <p className="text-sm text-foreground/50">
            {t('text')}
          </p>
          <p className="text-xs text-foreground/30 uppercase tracking-widest">
            © {new Date().getFullYear()} — {t('all_rights')}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <LanguageSelector />
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Chocorot"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-md bg-foreground/5 hover:bg-primary-500 hover:text-white transition-all"
              aria-label="GitHub"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://youtube.com/@Chocorot"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-md bg-foreground/5 hover:bg-red-500 hover:text-white transition-all"
              aria-label="YouTube"
            >
              <FaYoutube className="w-6 h-6" />
            </a>
            <a
              href="https://discord.com/users/chocorot"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-md bg-[#5865F2]/10 text-[#5865F2] hover:bg-[#5865F2] hover:text-white transition-all"
              aria-label="Discord"
            >
              <FaDiscord className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
