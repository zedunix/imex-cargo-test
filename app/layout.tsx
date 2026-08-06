import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Northline — Freight Without Friction",
  description: "Placeholder marketing site for a global freight and logistics partner.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Northline — Freight Without Friction",
    description: "Global freight. Local precision. Zero friction.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Northline freight network" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Northline — Freight Without Friction",
    description: "Global freight. Local precision. Zero friction.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
