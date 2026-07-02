"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { logPageViewServer } from "@/lib/actions";

export default function AnalyticsTracker() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    const trackPageView = async () => {
      try {
        await logPageViewServer({
          path: pathname,
          search: searchParams?.toString() || "",
          referrer: typeof document !== "undefined" ? document.referrer : "",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : ""
        });
      } catch (err) {
        console.error("Failed to track page view:", err);
      }
    };

    trackPageView();
  }, [pathname, searchParams]);

  return null;
}
