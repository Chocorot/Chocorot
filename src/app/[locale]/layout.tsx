import { IntlProvider } from "@/components/Providers";
import { Navbar } from "@/components/molecules/Navbar";
import { Footer } from "@/components/molecules/Footer";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { JsonLd } from "@/components/SEO/JsonLd";
import { ThemeProvider } from "@/components/Providers";
import { AuthProvider } from "@/components/Firebase/AuthContext";
import { GoogleAnalytics } from "@next/third-parties/google";

const monocraft = localFont({
  src: [
    {
      path: "../../../public/fonts/Monocraft-01.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Monocraft-Italic-02.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Monocraft-Light-09.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Monocraft-Light-Italic-10.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Monocraft-ExtraLight-11.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Monocraft-ExtraLight-Italic-12.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Monocraft-SemiBold-07.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Monocraft-SemiBold-Italic-08.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Monocraft-Bold-05.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Monocraft-Bold-Italic-06.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Monocraft-Black-03.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Monocraft-Black-Italic-04.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-monocraft",
});

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
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${monocraft.variable} h-full antialiased`}
    >
      <body 
        className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary-500/30 font-sans"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AuthProvider>
            <IntlProvider locale={locale} messages={messages} timeZone="Asia/Kuala_Lumpur">
              <JsonLd
                data={{
                  "@context": "https://schema.org",
                  "@type": "Person",
                  "name": "Chocorot",
                  "url": "https://www.chocorot.net",
                  "jobTitle": "Creative Developer",
                  "sameAs": [
                    "https://github.com/Chocorot",
                    "https://youtube.com/@Chocorot"
                  ],
                  "description": "Personal portfolio and home for experimental apps and creative coding projects by Chocorot."
                }}
              />
              <Navbar />
              <main className="flex-grow flex flex-col items-center justify-center p-4 pt-24">
                {children}
              </main>
              <Footer />
            </IntlProvider>
          </AuthProvider>
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
