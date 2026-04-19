'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ErrorDisplay } from '@/components/atoms/ErrorDisplay';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Errors.500');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-24">
      <ErrorDisplay
        code="500"
        title={t('title')}
        description={t('description')}
        buttonText={t('button')}
        onRetry={() => reset()}
        variant="500"
      />
    </div>
  );
}
