import localFont from "next/font/local";

export const monocraft = localFont({
  src: [
    {
      path: "../../public/fonts/Monocraft-ExtraLight-11.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Monocraft-01.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Monocraft-Italic-02.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Monocraft-SemiBold-07.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Monocraft-Bold-05.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Monocraft-Black-03.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-monocraft",
  display: "swap",
});
