import type { Metadata } from "next";
import { Baloo_2, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
  metadataBase: new URL("https://jerseyjumpy.com"),
  title: {
    default: "Jersey Jumpy | #1 Bounce House Rentals in New Jersey",
    template: "%s | Jersey Jumpy",
  },
  description: "Family owned and operated, Jersey Jumpy provides inflatable slide, obstacle course and bounce house rentals throughout New Jersey. Perfect for birthday parties, festivals, fundraisers, sales promotions and carnivals!",
  keywords: "bounce house rental NJ, inflatable rental New Jersey, party rental NJ, bouncy castle rental, obstacle course rental, wet slide rental, dry slide rental, birthday party rentals NJ, carnival rentals New Jersey",
  authors: [{ name: "JerseyJumpy.com LLC" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Jersey Jumpy | #1 Bounce House Rentals in New Jersey",
    description: "Family owned and operated, Jersey Jumpy provides inflatable slide, obstacle course and bounce house rentals throughout New Jersey. Perfect for birthday parties, festivals, fundraisers, sales promotions and carnivals!",
    url: "https://jerseyjumpy.com",
    type: "website",
    locale: "en_US",
    siteName: "Jersey Jumpy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jersey Jumpy Bounce House Rentals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jersey Jumpy | #1 Bounce House Rentals in New Jersey",
    description: "Family owned and operated bounce house rentals throughout New Jersey. Perfect for birthday parties, festivals, and events!",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://jerseyjumpy.com",
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
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
