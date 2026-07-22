"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Root Global Error Boundary Caught Exception", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen w-full flex items-center justify-center bg-gray-50 text-gray-900 font-sans p-6">
        <div className="max-w-md w-full bg-white border border-gray-200 p-8 rounded-2xl shadow-xl text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Application Error</h1>
          <p className="text-sm text-gray-600 mb-6">
            A critical system error occurred. Please refresh or click below to try again.
          </p>
          <button
            onClick={() => reset()}
            className="w-full px-5 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition-all cursor-pointer"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
