"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-7xl font-bold text-coral mb-4">
          Oops!
        </h1>
        <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
          Something went wrong
        </h2>
        <p className="text-text-secondary mb-8">
          We ran into an unexpected error. Please try again or head back to the
          home page.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-display font-bold text-white bg-gradient-to-r from-cta-primary to-cta-primary-hover hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-display font-bold border-2 border-slate-300 text-text-primary hover:bg-slate-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
