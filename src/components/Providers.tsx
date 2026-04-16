'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes';
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';

interface ProvidersProps extends ThemeProviderProps {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
  timeZone: string;
}

// Suppress React 19 script tag warning in development (NextThemes compatibility)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const origError = console.error;
  console.error = (...args: any[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) return;
    origError.apply(console, args);
  };
}

interface ThemeProviderPropsWrapper {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderPropsWrapper) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      scriptProps={{ id: 'next-theme' }}
    >
      {children}
    </NextThemesProvider>
  );
}

interface IntlProviderProps {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
  timeZone: string;
}

export function IntlProvider({ children, locale, messages, timeZone }: IntlProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  );
}

export function Providers({ children, locale, messages, timeZone }: ProvidersProps) {
  return (
    <ThemeProvider>
      <IntlProvider locale={locale} messages={messages} timeZone={timeZone}>
        {children}
      </IntlProvider>
    </ThemeProvider>
  );
}
