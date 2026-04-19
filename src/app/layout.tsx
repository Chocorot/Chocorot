import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/Providers";
import { AuthProvider } from "@/components/Firebase/AuthContext";
import { GoogleAnalytics } from "@next/third-parties/google";

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
