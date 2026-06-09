import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "KAVYA SEN | Luxury Indian Wedding & Heritage Portrait Photographer",
  description: "Walk into Kavya Sen — a cinematic photography studio capturing timeless Indian destination weddings, royal heritage portraits, and cultural campaigns. Preserving heirloom memories.",
  keywords: "indian wedding photographer, luxury wedding photography, heritage portraiture, udaipur destination wedding, jaipur wedding photography",
  openGraph: {
    title: "KAVYA SEN | Luxury Indian & Heritage Photography",
    description: "Preserving heirloom memories. Experience dark, cinematic, editorial storytelling for fine weddings and portraits.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${inter.variable} font-sans bg-studioBlack text-softCream antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
