export function AdminEmptyState({ message }: { message: string }) {
  return (
    <div className="border border-dashed border-navy/15 bg-navy/[0.02] px-6 py-10 text-center">
      <p className="font-sans text-sm text-navy/40">{message}</p>
    </div>
  );
}

export function AdminErrorState({ message }: { message?: string }) {
  return (
    <div className="border border-red-200 bg-red-50 px-6 py-4">
      <p className="font-sans text-sm text-red-700">
        {message ?? "No pudimos cargar esta información. Intenta nuevamente."}
      </p>
    </div>
  );
}
