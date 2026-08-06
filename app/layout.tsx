import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IMEX — Freight Without Friction",
  description: "IMEX connects cargo, businesses, and markets through precise global logistics.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "IMEX — Freight Without Friction",
    description: "Global freight. Local precision. Zero friction.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "IMEX global freight network" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IMEX — Freight Without Friction",
    description: "Global freight. Local precision. Zero friction.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
