import type { Metadata } from "next";
import { Suspense } from "react";
import { Baloo_2, DM_Sans, Caveat } from "next/font/google";
import { FathomAnalytics } from "@/components/analytics/FathomAnalytics";
import { AiReferralTracker } from "@/components/analytics/AiReferralTracker";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { getSettings } from "@/lib/settings";
import "./globals.css";

const FALLBACK_TITLE = "Jersey Jumpy | #1 Bounce House Rentals in New Jersey";
const FALLBACK_DESCRIPTION =
  "Family owned and operated, Jersey Jumpy provides inflatable slide, obstacle course and bounce house rentals throughout New Jersey. Perfect for birthday parties, festivals, fundraisers, sales promotions and carnivals!";

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

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const title = settings.meta_title?.trim() || FALLBACK_TITLE;
  const description = settings.meta_description?.trim() || FALLBACK_DESCRIPTION;

  return {
    metadataBase: new URL("https://jerseyjumpy.com"),
    title: {
      default: title,
      template: "%s | Jersey Jumpy",
    },
    description,
    keywords:
      "bounce house rental NJ, inflatable rental New Jersey, party rental NJ, bouncy castle rental, obstacle course rental, wet slide rental, dry slide rental, birthday party rentals NJ, carnival rentals New Jersey",
    authors: [{ name: "JerseyJumpy.com LLC" }],
    icons: {
      icon: "/favicon.png",
      apple: "/favicon.png",
    },
    openGraph: {
      title,
      description,
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
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://jerseyjumpy.com",
    },
  };
}

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
        <Suspense fallback={null}>
          <FathomAnalytics />
          <AiReferralTracker />
        </Suspense>
        <LocalBusinessJsonLd />
        {children}
      </body>
    </html>
  );
}
