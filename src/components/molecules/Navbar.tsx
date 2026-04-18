'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { NavLink } from '../atoms/NavLink';
import { ThemeToggle } from '../atoms/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';

export function Navbar() {
  const t = useTranslations('Navigation');
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/apps', label: t('apps') },
    { href: '/portfolio', label: t('portfolio') },
    { href: '/socials', label: t('socials') },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="group">
              <span className="text-xl font-black tracking-tighter group-hover:text-primary-600 transition-colors">CHOCOROT</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            
            {/* Mobile Menu Button - Just the icon */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 md:hidden transition-colors z-[110] relative text-foreground/60 hover:text-primary-600"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Outside header to fix stacking constraints */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-16 inset-x-0 bottom-0 bg-background/98 backdrop-blur-2xl z-[100] md:hidden flex flex-col pt-8 px-8 pb-12 gap-8 border-t border-border shadow-2xl overflow-y-auto"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`text-3xl font-black uppercase tracking-tighter hover:text-primary-600 transition-colors block py-1 ${
                      pathname === link.href ? 'text-primary-600' : 'text-foreground/80'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between p-4 rounded-md bg-foreground/5 border border-border">
                  <span className="text-xs font-black uppercase tracking-widest text-foreground/30">Theme Settings</span>
                  <ThemeToggle />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
