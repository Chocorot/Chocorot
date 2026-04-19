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
  metadataBase: new URL("https://www.chocorot.net"),
  title: {
    default: "Chocorot | Creative Developer",
    template: "%s | Chocorot"
  },
  description: "Personal portfolio and home for experimental apps and creative coding projects by Chocorot.",
  keywords: ["Creative Developer", "Software Engineer", "Hardware", "Arduino", "Next.js", "Portfolio", "Open Source", "Chocorot"],
  authors: [{ name: "Chocorot", url: "https://www.chocorot.net" }],
  creator: "Chocorot",
  publisher: "Chocorot",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.chocorot.net",
    siteName: "Chocorot",
    title: "Chocorot | Creative Developer",
    description: "Personal portfolio and home for experimental apps and creative coding projects by Chocorot.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chocorot | Creative Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chocorot | Creative Developer",
    description: "Personal portfolio and home for experimental apps and creative coding projects by Chocorot.",
    images: ["/og-image.png"],
    creator: "@Chocorot",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
    shortcut: "/favicon-light.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
