export const dynamic = "force-dynamic";

import "@/styles/globals.css";

import { Noto_Sans } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

const noto_sans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
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
      <body className={`font-sans ${noto_sans.variable}`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
