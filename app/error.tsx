"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Route Error Boundary Caught Exception", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full glass-card p-10 rounded-3xl border border-black/10 shadow-xl flex flex-col items-center">
        <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-red-500 bg-red-500/10 border border-red-500/20 mb-4">
          Unexpected Error
        </span>

        <h2 className="text-2xl font-display font-bold tracking-tight mb-2">
          Something went wrong
        </h2>

        <p className="text-text-muted text-sm mb-6 leading-relaxed">
          An unexpected error occurred while rendering this page view. Our team has been notified.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-black/10 text-text-main font-medium hover:bg-gray-50 transition-all shadow-sm active:scale-95"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
