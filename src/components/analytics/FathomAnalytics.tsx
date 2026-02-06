"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { load, trackPageview } from "fathom-client";

export function FathomAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    load("RFHDATOK", {
      auto: false,
    });
  }, []);

  useEffect(() => {
    if (!pathname) return;
    trackPageview({
      url: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ""),
      referrer: document.referrer,
    });
  }, [pathname, searchParams]);

  return null;
}
