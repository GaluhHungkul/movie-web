import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg text-white flex justify-center items-center px-6">
      <div className="w-full max-w-5xl">
        <div className="border border-white/20">
          {/* Top bar */}
          {/* <div className="flex items-center justify-between border-b border-white/20 px-5 py-4 text-xs uppercase tracking-[0.25em]">
            <span className="text-white/50">Error</span>
            <span className="text-red-500">404</span>
          </div> */}

          <div className="grid md:grid-cols-[1fr_1.5fr]">
            {/* Big number */}
            <div className="flex items-center justify-center border-b md:border-b-0 md:border-r border-white/20 p-10 md:p-16">
              <span className="text-[clamp(8rem,20vw,15rem)] font-black leading-none tracking-[-0.08em] text-red-600">
                404
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-8 md:p-14">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-red-500">
                Page Not Found
              </p>

              <h1 className="max-w-xl text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl">
                This page
                <br />
                doesn&apos;t exist.
              </h1>

              <p className="mt-6 max-w-md text-sm leading-6 text-white/50 md:text-base">
                The page you&apos;re looking for may have been moved, deleted,
                or never existed in the first place.
              </p>

              <div className="mt-10">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 bg-white px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-red-600 hover:text-white"
                >
                  <span>←</span>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          {/* <div className="flex items-center justify-between border-t border-white/20 px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white/30">
            <span>Something went wrong</span>
            <span>ERR_NOT_FOUND</span>
          </div> */}
        </div>
      </div>
    </main>
  );
}