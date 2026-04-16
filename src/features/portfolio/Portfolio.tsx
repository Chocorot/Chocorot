import { getRepositories } from '@/services/github';
import { ProjectCard } from './ProjectCard';
import { getTranslations } from 'next-intl/server';

export async function Portfolio() {
  const repos = await getRepositories('Chocorot');
  const nt = await getTranslations('Navigation');
  const t = await getTranslations('Portfolio');

  return (
    <div className="w-full max-w-6xl flex flex-col gap-12 px-4">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-black tracking-tighter uppercase text-primary-600">
          {nt('portfolio')}
        </h2>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          {t('title_desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.length > 0 ? (
          repos.map((repo, index) => (
            <ProjectCard key={repo.id} repo={repo} index={index} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center card-standard">
            <p className="text-foreground/40 italic">{t('empty')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
