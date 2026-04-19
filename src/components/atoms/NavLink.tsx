'use client';

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useRef } from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export function NavLink({ href, children, external }: NavLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === href;
  const prefetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (!external) {
      // Debounce prefetch by 80ms to prevent network spam during rapid mouse movement
      prefetchTimeoutRef.current = setTimeout(() => {
        router.prefetch(href);
      }, 80);
    }
  };

  const handleMouseLeave = () => {
    if (prefetchTimeoutRef.current) {
      clearTimeout(prefetchTimeoutRef.current);
    }
  };

  const content = (
    <span className="relative py-1 px-2 transition-colors">
      {children}
      {isActive && (
        <motion.span
          layoutId="nav-active"
          className="absolute inset-0 bg-primary-500/10 rounded-md -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </span>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-foreground/70 hover:text-primary-500 transition-colors"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary-500",
        isActive ? "text-primary-600" : "text-foreground/70"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </Link>
  );
}
