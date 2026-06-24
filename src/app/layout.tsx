import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Script from "next/script";
import { MIDTRANS_CONFIG } from "@/lib/midtrans";

export const metadata: Metadata = {
  title: "PromptVault — Premium AI Prompts for Web Design",
  description: "Discover 80+ production-ready AI prompts for stunning landing pages, hero sections, and UI components.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {/* Midtrans Snap */}
        <Script
          src={MIDTRANS_CONFIG.snapUrl}
          data-client-key={MIDTRANS_CONFIG.clientKey}
          strategy="lazyOnload"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
