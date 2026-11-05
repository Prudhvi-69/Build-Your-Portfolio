"use client";

import { useEffect, useRef } from "react";

/**
 * Records one visit per browser session. The owner's own visits still count —
 * the dashboard labels them separately — but a refresh does not, so the number
 * reads as "people who opened this" rather than "times the page loaded".
 */
export default function ViewTracker({ slug }: { slug: string }) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;

    const key = `profolion:viewed:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Private mode can block storage; a visit is still worth counting.
    }

    void import("@/lib/account").then(({ registerPortfolioView }) =>
      registerPortfolioView(slug).catch(() => null)
    );
  }, [slug]);

  return null;
}
