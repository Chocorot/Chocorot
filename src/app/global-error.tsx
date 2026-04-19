'use client';

import { ErrorDisplay } from '@/components/atoms/ErrorDisplay';
import { monocraft } from "@/styles/fonts";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={`${monocraft.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#020617] text-[#f8fafc] font-sans">
        <main className="flex-grow flex flex-col items-center justify-center min-h-screen p-4">
          <ErrorDisplay
            code="500"
            title="System Exception"
            description="A critical error occurred. The developer's server encountered an unexpected state."
            buttonText="Retry Connection"
            onRetry={() => reset()}
            variant="500"
          />
        </main>
      </body>
    </html>
  );
}
