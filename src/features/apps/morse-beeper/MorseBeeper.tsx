'use client';

import { useState, useCallback } from 'react';
import { useMorseAudio } from '@/hooks/useMorseAudio';
import { textToMorse } from '@/utils/morse';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVolumeUp, FaPlay, FaTrashAlt } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export function MorseBeeper() {
  const t = useTranslations('Apps.MorseBeeper');
  const [text, setText] = useState('');
  const { playMorse, playTone, ensureContext } = useMorseAudio();
  const morse = textToMorse(text);

  const handleBeepDown = useCallback(() => {
    const ctx = ensureContext();
    playTone(ctx.currentTime, 0.1, 800); 
  }, [ensureContext, playTone]);

  const handleBeepUp = useCallback(() => {
    // Manual beep logic
  }, []);

  return (
    <div className="w-full card-standard flex flex-col gap-8 shadow-xl shadow-primary-500/5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-primary-600">
          <FaVolumeUp className="w-6 h-6" />
          Morse Beeper
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setText('')}
          className="p-2 rounded-md bg-foreground/5 hover:bg-red-500/10 text-foreground/30 hover:text-red-500 transition-colors"
        >
          <FaTrashAlt className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('placeholder')}
          className="w-full h-32 bg-foreground/[0.03] border border-border rounded-lg p-4 text-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-foreground/20 text-foreground"
        />
        <div className="absolute bottom-4 right-4 text-xs font-mono text-foreground/20 uppercase tracking-widest">
          {t('characters', { count: text.length })}
        </div>
      </div>

      <div className="min-h-[4rem] bg-secondary border border-primary-100 rounded-lg p-6 font-mono text-2xl tracking-[0.2em] break-all text-primary-700 flex items-center justify-center text-center">
        <AnimatePresence mode="popLayout">
          {morse || <span className="opacity-10">.... . .-.. .-.. ---</span>}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => playMorse(morse)}
          disabled={!morse}
          className="flex items-center justify-center gap-3 py-4 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-all"
        >
          <FaPlay className="w-4 h-4" />
          {t('play')}
        </motion.button>

        <motion.button
          onMouseDown={handleBeepDown}
          onMouseUp={handleBeepUp}
          onTouchStart={handleBeepDown}
          onTouchEnd={handleBeepUp}
          className="flex items-center justify-center gap-3 py-4 rounded-lg bg-foreground/5 border border-border hover:bg-foreground/10 font-bold transition-all active:bg-primary-500/20 active:border-primary-500/50 group"
        >
          <div className="w-4 h-4 rounded-sm border-2 border-foreground/30 group-active:border-primary-500 flex items-center justify-center transition-colors">
            <div className="w-1.5 h-1.5 rounded-sm bg-foreground/30 group-active:bg-primary-500 transition-colors" />
          </div>
          {t('manual')}
        </motion.button>
      </div>
      
      <p className="text-xs text-foreground/40 text-center italic leading-relaxed px-4">
        {t('tip')}
      </p>
    </div>
  );
}
