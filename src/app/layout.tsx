import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/Providers";
import { AuthProvider } from "@/components/Firebase/AuthContext";
import { GoogleAnalytics } from "@next/third-parties/google";

const monocraft = localFont({
  src: [
    {
      path: "../../public/fonts/Monocraft-01.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Monocraft-Italic-02.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Monocraft-Light-09.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Monocraft-Light-Italic-10.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/Monocraft-ExtraLight-11.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Monocraft-ExtraLight-Italic-12.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/Monocraft-SemiBold-07.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Monocraft-SemiBold-Italic-08.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/Monocraft-Bold-05.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Monocraft-Bold-Italic-06.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/Monocraft-Black-03.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Monocraft-Black-Italic-04.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-monocraft",
});

export const metadata: Metadata = {
  title: "Chocorot | Creative Developer",
  description: "Personal portfolio and home for silly apps by Chocorot.",
  icons: {
    icon: [
      {
        url: "/favicon-light.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${monocraft.variable} h-full antialiased`}
    >
      <body 
        className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary-500/30 font-sans"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
