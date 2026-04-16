'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor, Check } from 'lucide-react';

interface ThemeOption {
  label: string;
  value: string;
  icon: React.ElementType;
}

const themeOptions: ThemeOption[] = [
  { label: 'Light', value: 'light', icon: Sun },
  { label: 'Dark', value: 'dark', icon: Moon },
  { label: 'System', value: 'system', icon: Monitor },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) return <div className="w-10 h-10" />;

  const ActiveIcon = themeOptions.find((opt) => opt.value === theme)?.icon || Sun;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-md border border-border hover:bg-foreground/5 transition-colors"
        aria-label="Toggle Theme"
      >
        <ActiveIcon className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 right-0 w-36 bg-card border border-border rounded-md shadow-lg overflow-hidden z-50"
          >
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setTheme(option.value);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-foreground/5 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <option.icon className="w-4 h-4" />
                  <span>{option.label}</span>
                </div>
                {theme === option.value && <Check className="w-4 h-4 text-primary" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
