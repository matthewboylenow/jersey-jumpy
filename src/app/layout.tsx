import type { Metadata } from "next";
import { Baloo_2, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jersey Jumpy - New Jersey's #1 Bounce House Rentals",
  description: "Premium bounce house and inflatable rentals in New Jersey. Castle bouncers, combo units, wet/dry slides, and obstacle courses for your next party. Family-owned since 2007.",
  keywords: "bounce house rental, inflatable rental, New Jersey, party rental, bouncy castle, obstacle course, wet slide, dry slide",
  authors: [{ name: "JerseyJumpy.com LLC" }],
  openGraph: {
    title: "Jersey Jumpy - New Jersey's #1 Bounce House Rentals",
    description: "Premium bounce house and inflatable rentals in New Jersey. Castle bouncers, combo units, wet/dry slides, and obstacle courses for your next party.",
    type: "website",
    locale: "en_US",
    siteName: "Jersey Jumpy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${baloo.variable} ${dmSans.variable} ${caveat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
