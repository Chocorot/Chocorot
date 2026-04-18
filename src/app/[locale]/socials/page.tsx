'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FaGithub, FaYoutube, FaDiscord, FaCopy, FaCheck, FaExternalLinkAlt } from 'react-icons/fa';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function SocialsPage() {
  const t = useTranslations('Socials');
  const commonT = useTranslations('Common');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const socials = [
    {
      id: 'github',
      name: t('platforms.github'),
      handle: 'Chocorot',
      url: 'https://github.com/Chocorot',
      description: t('platforms.github_desc'),
      icon: FaGithub,
      color: 'hover:bg-zinc-800',
      iconColor: 'bg-zinc-800/10 text-zinc-800 dark:bg-zinc-100/10 dark:text-zinc-100',
    },
    {
      id: 'youtube',
      name: t('platforms.youtube'),
      handle: '@Chocorot',
      url: 'https://youtube.com/@Chocorot',
      description: t('platforms.youtube_desc'),
      icon: FaYoutube,
      color: 'hover:bg-red-600',
      iconColor: 'bg-red-600/10 text-red-600',
    },
    {
      id: 'discord',
      name: t('platforms.discord'),
      handle: 'chocorot',
      url: 'https://discord.com/users/chocorot',
      description: t('platforms.discord_desc'),
      icon: FaDiscord,
      color: 'hover:bg-[#5865F2]',
      iconColor: 'bg-[#5865F2]/10 text-[#5865F2]',
    },
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl w-full mx-auto space-y-12 py-8">
      <div className="text-center space-y-4">
        <motion.h1 
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-primary-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t('title')}
        </motion.h1>
        <motion.p 
          className="text-xl text-foreground/60 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {t('subtitle')}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {socials.map((social, i) => (
          <motion.div
            key={social.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-border bg-background p-8 transition-all hover:shadow-2xl hover:-translate-y-1",
            )}
          >
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className={cn("p-4 rounded-xl", social.iconColor)}>
                  <social.icon className="w-8 h-8" />
                </div>
                <div className="flex gap-2">
                   <button
                    onClick={() => copyToClipboard(social.handle, social.id)}
                    className="p-3 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors"
                    title={t('copy_handle')}
                  >
                    {copiedId === social.id ? (
                      <FaCheck className="w-4 h-4 text-green-500" />
                    ) : (
                      <FaCopy className="w-4 h-4 text-foreground/50" />
                    )}
                  </button>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors"
                  >
                    <FaExternalLinkAlt className="w-4 h-4 text-foreground/50" />
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight">{social.name}</h3>
                <p className="text-lg font-bold text-primary-500">{social.handle}</p>
                <p className="text-foreground/60 leading-relaxed pt-2">
                  {social.description}
                </p>
              </div>

              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "block w-full py-4 rounded-xl text-center font-bold tracking-wider uppercase text-sm transition-all group-hover:scale-[1.02]",
                  "bg-foreground text-background"
                )}
              >
                {t('visit')}
              </a>
            </div>
            
            {/* Subtle background glow on hover */}
            <div className={cn(
              "absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none",
              social.id === 'github' && "bg-zinc-500",
              social.id === 'youtube' && "bg-red-500",
              social.id === 'discord' && "bg-[#5865F2]"
            )} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
