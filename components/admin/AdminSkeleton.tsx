/** Shared loading skeleton for admin pages (light theme). */
export function AdminSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="h-6 w-40 rounded-sm bg-navy/10" />
        <div className="h-3 w-64 rounded-sm bg-navy/5" />
      </div>
      <div className="h-40 w-full rounded-sm border border-navy/10 bg-navy/[0.03]" />
      <div className="h-40 w-full rounded-sm border border-navy/10 bg-navy/[0.03]" />
    </div>
  );
}
