import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "GIPRE Transparency — Open methodology + governance audit",
    template: "%s · GIPRE Transparency",
  },
  description:
    "The open methodology and governance audit view of the GIPRE engine — Geopolitical Intelligence and Probabilistic Reasoning Engine. 65 layers, 146 agents, 100 scenarios. Built by Strature Geopolitical Prospects & Strategy Inc.",
  metadataBase: new URL("https://ashy-forest-072686a0f.7.azurestaticapps.net"),
  openGraph: {
    type: "website",
    title: "GIPRE Transparency",
    description: "The open methodology and governance audit view of the GIPRE engine.",
    siteName: "GIPRE Transparency",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
