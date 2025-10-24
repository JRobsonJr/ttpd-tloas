import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "TTPD x TLOAS Mashup",
  description: "Find out your The Tortured Poets Department x The Life of a Showgirl mashup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
