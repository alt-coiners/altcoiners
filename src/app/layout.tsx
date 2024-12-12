export const dynamic = "force-static";

import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Noto_Sans } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import { TRPCReactProvider } from "@/trpc/react";
import type { Metadata } from "next";

const noto_sans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Altcoiners",
  description: "Altcoiners",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="a30jirDlKYGbOSPBL7x-fQ-JlOPkfdEzQF-d_dTsN9c"
        />
      </head>
      <body className={`font-sans ${noto_sans.variable}`}>
        <Toaster />
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <GoogleAnalytics gaId="G-HDBXD4ZM36" />
      </body>
    </html>
  );
}
