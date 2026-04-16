'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Palette, Copy, Check, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ColorPicker() {
  const t = useTranslations('Apps.ColorStudio');
  const ct = useTranslations('Common');
  const [color, setColor] = useState<string>('#3b82f6');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const hexToHsl = (hex: string): { h: number; s: number; l: number } => {
    let { r, g, b } = hexToRgb(hex);
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  const handleCopy = (text: string, type: string): void => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const generateRandom = useCallback((): void => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setColor(randomColor);
  }, []);

  return (
    <div className="w-full card-standard flex flex-col gap-8 shadow-xl shadow-indigo-500/5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-indigo-600">
          <Palette className="w-6 h-6" />
          {t('title')}
        </h2>
        <button
          onClick={generateRandom}
          className="p-2 rounded-md bg-foreground/5 hover:bg-foreground/10 transition-colors"
          aria-label={t('random')}
        >
          <RefreshCw className="w-5 h-5 text-foreground/40" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative group aspect-square max-w-[280px] mx-auto w-full">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <motion.div
            animate={{ backgroundColor: color }}
            className="w-full h-full rounded-2xl shadow-inner border-4 border-white dark:border-slate-800 flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
            <span className="relative z-20 text-white font-black text-2xl drop-shadow-md select-none pointer-events-none uppercase">
              {color}
            </span>
          </motion.div>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { label: 'HEX', value: color.toUpperCase() },
            { label: 'RGB', value: rgbString },
            { label: 'HSL', value: hslString },
          ].map((item) => (
            <div key={item.label} className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30 px-1">
                {item.label}
              </span>
              <button
                onClick={() => handleCopy(item.value, item.label)}
                className="w-full flex items-center justify-between p-4 bg-foreground/[0.03] border border-border rounded-lg hover:border-indigo-500/30 transition-all group"
              >
                <code className="text-sm font-mono text-foreground/70">{item.value}</code>
                {copiedType === item.label ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4 text-foreground/20 group-hover:text-indigo-500 transition-colors" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-lg text-xs text-indigo-600/60 font-medium italic text-center">
        {t('tip')}
      </div>
    </div>
  );
}
