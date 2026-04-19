'use client';

import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { ChevronLeft } from 'lucide-react';

// Feature Imports
import { MorseBeeper } from '@/features/apps/morse-beeper/MorseBeeper';
import { PiDisplay } from '@/features/apps/pi-display/PiDisplay';
import { Clicker } from '@/features/apps/clicker/Clicker';
import { ColorPicker } from '@/features/apps/color-picker/ColorPicker';
import { QArtScanner } from '@/features/apps/q-art-scanner/QArtScanner';

interface AppDetailViewProps {
  slug: string;
}

export function AppDetailView({ slug }: AppDetailViewProps) {
  const renderApp = (): React.ReactNode => {
    switch (slug) {
      case 'morse-beeper':
        return <MorseBeeper />;
      case 'pi-display':
        return <PiDisplay />;
      case 'clicker':
        return <Clicker />;
      case 'color-picker':
        return <ColorPicker />;
      case 'q-art-scanner':
        return <QArtScanner />;
      default:
        return null;
    }
  };

  // If the slug is not recognized, the server component should ideally handle notFound,
  // but we provide a fallback here as well.
  const appContent = renderApp();
  if (!appContent) {
    notFound();
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <Link
          href="/apps"
          className="flex items-center gap-2 text-sm font-bold text-foreground/40 hover:text-primary-600 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Apps
        </Link>
      </div>

      <div className="flex flex-col gap-12">
        {appContent}
      </div>
      
      <div className="flex flex-col items-center gap-6 py-12">
        <div className="h-px w-full bg-border opacity-50" />
        <p className="text-xs text-foreground/20 font-medium text-center max-w-md">
          This is an experimental mini-app built for the Chocorot ecosystem. 
          Feedback and suggestions are always welcome.
        </p>
      </div>
    </div>
  );
}
