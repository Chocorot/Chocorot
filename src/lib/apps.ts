import { LucideIcon, Terminal, Hash, Fingerprint, Palette, ScanQrCode } from 'lucide-react';

export interface AppMetadata {
  id: string;
  slug: string;
  titleKey: string;
  descriptionKey: string;
  icon: LucideIcon;
  color: string;
}

export const APPS: AppMetadata[] = [
  {
    id: 'morse-beeper',
    slug: 'morse-beeper',
    titleKey: 'Apps.beeper',
    descriptionKey: 'Apps.beeper_desc',
    icon: Terminal,
    color: 'bg-primary-500',
  },
  {
    id: 'pi-display',
    slug: 'pi-display',
    titleKey: 'Apps.pi',
    descriptionKey: 'Apps.pi_desc',
    icon: Hash,
    color: 'bg-amber-500',
  },
  {
    id: 'clicker',
    slug: 'clicker',
    titleKey: 'Apps.clicker',
    descriptionKey: 'Apps.clicker_desc',
    icon: Fingerprint,
    color: 'bg-rose-500',
  },
  {
    id: 'color-picker',
    slug: 'color-picker',
    titleKey: 'Apps.color_picker',
    descriptionKey: 'Apps.color_picker_desc',
    icon: Palette,
    color: 'bg-indigo-500',
  },
  {
    id: 'q-art-scanner',
    slug: 'q-art-scanner',
    titleKey: 'Apps.q_art_scanner',
    descriptionKey: 'Apps.q_art_scanner_desc',
    icon: ScanQrCode,
    color: 'bg-emerald-500',
  },
];
