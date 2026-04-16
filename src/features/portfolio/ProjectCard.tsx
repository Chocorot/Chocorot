'use client';

import { Repository } from '@/services/github';
import { motion } from 'framer-motion';
import { FaStar, FaExternalLinkAlt, FaCode } from 'react-icons/fa';

interface ProjectCardProps {
  repo: Repository;
  index: number;
}

export function ProjectCard({ repo, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="card-standard group flex flex-col gap-4 hover:border-primary-500/50 transition-all shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div className="p-3 rounded-lg bg-primary-500/10 text-primary-500 group-hover:bg-primary-600 group-hover:text-white transition-colors">
          <FaCode className="w-6 h-6" />
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/30 hover:text-foreground transition-colors"
        >
          <FaExternalLinkAlt className="w-5 h-5" />
        </a>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
          {repo.name}
        </h3>
        <p className="text-sm text-foreground/60 line-clamp-2 min-h-[2.5rem]">
          {repo.description || 'No description provided.'}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-xs font-medium text-foreground/40">
          {repo.language && (
            <span className="flex items-center gap-1.5 text-primary-600">
              <span className="w-2 h-2 rounded-full bg-primary-500" />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <FaStar className="w-3 h-3" />
            {repo.stargazers_count}
          </span>
        </div>
        <span className="text-[10px] text-foreground/20 font-mono">
          {new Date(repo.updated_at).toLocaleDateString()}
        </span>
      </div>
    </motion.div>
  );
}
