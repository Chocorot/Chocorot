import { useTranslations } from 'next-intl';
import { ErrorDisplay } from '@/components/atoms/ErrorDisplay';

export default function NotFoundPage() {
  const t = useTranslations('Errors.404');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-24">
      <ErrorDisplay
        code="404"
        title={t('title')}
        description={t('description')}
        buttonText={t('button')}
        variant="404"
      />
    </div>
  );
}
