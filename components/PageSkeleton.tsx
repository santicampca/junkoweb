/** Shared loading skeleton for public, data-fetching pages (dark theme). */
export function PageSkeleton() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-club flex animate-pulse flex-col items-center gap-6">
        <div className="h-3 w-24 rounded-sm bg-ivory/10" />
        <div className="h-8 w-64 max-w-full rounded-sm bg-ivory/10" />
        <div className="h-px w-16 bg-ivory/10" />
        <div className="mt-6 grid w-full max-w-3xl gap-4">
          <div className="h-4 w-full rounded-sm bg-ivory/5" />
          <div className="h-4 w-5/6 rounded-sm bg-ivory/5" />
          <div className="h-4 w-4/6 rounded-sm bg-ivory/5" />
        </div>
      </div>
    </section>
  );
}
