import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/**
 * Display: Fraunces — high-contrast, slightly wonky editorial serif. Chosen
 * because it rhymes with the NexBrix wordmark and reads as hospitality rather
 * than as software.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

/** Interface + body: a neutral grotesque that stays out of the way. */
const instrument = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

/** Data + labels: the "docket" voice. Tabular figures for every number. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexbrix.com.au"),
  title: "NexBrix — Hospitality operations software",
  description:
    "NexBrix connects your stock, purchasing, deliveries, sales and staff operations — so you can spot waste, make better decisions and protect your margins.",
  icons: { icon: "/brand/nexbrix-icon.png" },
  openGraph: {
    title: "NexBrix — Hospitality operations software",
    description:
      "Know what you have. Know what you use. Know where your money goes.",
    type: "website",
    locale: "en_AU",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A2924",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      className={`${fraunces.variable} ${instrument.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
