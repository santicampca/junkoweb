export function AdminEditor({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-navy/10 bg-white p-6 sm:p-8">
      <h3 className="font-heading text-xl text-forest">{title}</h3>
      {description ? (
        <p className="mt-1 font-sans text-sm text-navy/50">{description}</p>
      ) : null}
      <div className="mt-6">{children}</div>
    </div>
  );
}

export function AdminField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-sans text-xs uppercase tracking-widest2 text-navy/50">
        {label}
      </span>
      {children}
    </label>
  );
}

export const adminInputClass =
  "border border-navy/15 bg-transparent px-3 py-2 font-sans text-sm text-navy transition-colors focus:border-gold";
