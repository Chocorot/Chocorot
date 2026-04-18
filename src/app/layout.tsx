import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/Providers";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chocorot | Creative Developer",
  description: "Personal portfolio and home for silly apps by Chocorot.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body 
        className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary-500/30 font-sans"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <FirebaseAnalytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
