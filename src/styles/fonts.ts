import localFont from "next/font/local";

export const monocraft = localFont({
  src: [
    {
      path: "../../public/fonts/Monocraft.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Monocraft-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Monocraft-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-monocraft",
  display: "swap",
});
