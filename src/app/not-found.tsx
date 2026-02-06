import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="font-display text-7xl font-bold text-cta-primary mb-4">
            404
          </h1>
          <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
            This page bounced away!
          </h2>
          <p className="text-text-secondary mb-8">
            Looks like the page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-display font-bold text-white bg-gradient-to-r from-cta-primary to-cta-primary-hover hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
