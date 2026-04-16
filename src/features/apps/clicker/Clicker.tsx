'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, RotateCcw, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Clicker() {
  const t = useTranslations('Apps.Clicker');
  const [count, setCount] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [lastClicks, setLastClicks] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const saved = localStorage.getItem('clicker-count');
    if (saved) setCount(parseInt(saved, 10));
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('clicker-count', count.toString());
    }
  }, [count, isMounted]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setCount((prev) => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const id = Date.now();
    setLastClicks((prev) => [...prev, { id, x, y }].slice(-10));
    setTimeout(() => {
      setLastClicks((prev) => prev.filter((click) => click.id !== id));
    }, 1000);
  };

  const handleReset = (): void => {
    if (confirm(t('reset_confirm'))) {
      setCount(0);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="w-full card-standard flex flex-col gap-12 shadow-xl shadow-rose-500/5 items-center justify-center py-16">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-3 text-rose-600 uppercase tracking-tight">
          <Fingerprint className="w-6 h-6" />
          {t('title')}
        </h2>
        <p className="text-foreground/40 text-sm font-medium">{t('subtitle')}</p>
      </div>

      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
          className="relative w-48 h-48 rounded-full bg-rose-500 text-white shadow-2xl shadow-rose-500/40 flex items-center justify-center group overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex flex-col items-center">
            <span className="text-5xl font-black">{count}</span>
            <span className="text-xs uppercase font-bold tracking-widest opacity-60">{t('clicks')}</span>
          </div>
          
          <AnimatePresence>
            {lastClicks.map((click) => (
              <motion.span
                key={click.id}
                initial={{ opacity: 1, y: click.y - 120, x: click.x - 100, scale: 0.5 }}
                animate={{ opacity: 0, y: click.y - 200, scale: 1.5 }}
                exit={{ opacity: 0 }}
                className="absolute text-white font-bold pointer-events-none select-none"
              >
                +1
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.button>

        {count > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg border-4 border-card"
          >
            <Zap className="w-6 h-6 fill-current" />
          </motion.div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-foreground/5 text-foreground/40 hover:bg-rose-500/10 hover:text-rose-600 transition-all text-sm font-bold uppercase tracking-wider"
        >
          <RotateCcw className="w-4 h-4" />
          {t('reset')}
        </button>
      </div>

      <div className="text-[10px] text-foreground/20 font-mono uppercase tracking-[0.3em] px-4 text-center">
        {t('saved')}
      </div>
    </div>
  );
}
