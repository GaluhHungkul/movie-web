"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-black px-6 text-white flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <div className="border border-white/20">
          {/* Top bar */}
          {/* <div className="flex items-center justify-between border-b border-white/20 px-5 py-4 text-xs uppercase tracking-[0.25em]">
            <span className="text-white/50">System Error</span>
            <span className="text-red-500">500</span>
          </div> */}

          <div className="grid md:grid-cols-[1fr_1.5fr]">
            {/* Error code */}
            <div className="flex items-center justify-center border-b border-white/20 p-10 md:border-b-0 md:border-r md:p-16">
              <span className="text-[clamp(8rem,20vw,15rem)] font-black leading-none tracking-[-0.08em] text-red-600">
                500
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-8 md:p-14">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-red-500">
                Something Went Wrong
              </p>

              <h1 className="max-w-xl text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl">
                Unexpected
                <br />
                error occurred.
              </h1>

              <p className="mt-6 max-w-md text-sm leading-6 text-white/50 md:text-base">
                Something went wrong while loading this page. Please try
                again, or return to the homepage.
              </p>

              {/* Actions */}
              <div className="mt-10 flex flex-wrap gap-3">
                <button
                  onClick={() => reset()}
                  className="bg-white px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-red-600 hover:text-white"
                >
                  Try Again
                </button>

                <Link
                  href="/"
                  className="border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white hover:text-black"
                >
                  ← Back Home
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          {/* <div className="flex items-center justify-between border-t border-white/20 px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white/30">
            <span>Internal Server Error</span>
            <span>ERR_INTERNAL</span>
          </div> */}
        </div>
      </div>
    </main>
  );
}