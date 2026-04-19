'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { Home, RefreshCcw, ArrowLeft } from 'lucide-react';

interface ErrorDisplayProps {
  code: string;
  title: string;
  description: string;
  buttonText: string;
  href?: string;
  onRetry?: () => void;
  variant?: '404' | '500' | 'generic';
}

export function ErrorDisplay({
  code,
  title,
  description,
  buttonText,
  href = '/',
  onRetry,
  variant = 'generic'
}: ErrorDisplayProps) {
  const containerVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const glitchVariants: Variants = {
    animate: {
      x: [0, -2, 2, -1, 1, 0],
      opacity: [1, 0.8, 0.9, 0.7, 1],
      transition: {
        duration: 0.2,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: Math.random() * 5 + 2
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center text-center max-w-lg px-4"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.h1 
        className="text-8xl md:text-9xl font-bold font-mono tracking-tighter text-primary-500 mb-4 select-none"
        variants={glitchVariants}
        animate="animate"
      >
        {code}
      </motion.h1>
      
      <h2 className="text-2xl md:text-3xl font-semibold mb-3">
        {title}
      </h2>
      
      <p className="text-foreground/70 mb-8 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        {onRetry ? (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 bg-primary-500 text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary-500/20"
          >
            <RefreshCcw className="w-4 h-4" />
            {buttonText}
          </button>
        ) : (
          <Link
            href={href}
            className="flex items-center gap-2 bg-primary-500 text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary-500/20"
          >
            {variant === '404' ? <Home className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {buttonText}
          </Link>
        )}
      </div>

      {/* Background decoration elements */}
      <div className="absolute -z-10 opacity-10 pointer-events-none overflow-hidden inset-0 select-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-sky-500 rounded-full blur-[128px]" />
      </div>
    </motion.div>
  );
}
