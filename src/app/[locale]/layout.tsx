import { IntlProvider } from "@/components/Providers";
import { Navbar } from "@/components/molecules/Navbar";
import { Footer } from "@/components/molecules/Footer";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <IntlProvider locale={locale} messages={messages} timeZone="Asia/Kuala_Lumpur">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center p-4 pt-24">
        {children}
      </main>
      <Footer />
    </IntlProvider>
  );
}
