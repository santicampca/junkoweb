import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="font-sans text-xs uppercase tracking-widest2 text-navy/40">
          Panel administrativo
        </p>
        <h1 className="font-heading text-2xl text-forest">No encontramos ese registro</h1>
        <p className="max-w-sm font-sans text-sm text-navy/60">
          El elemento que busca no existe o fue eliminado.
        </p>
        <Link href="/admin/dashboard" className="btn-primary">
          Volver al panel
        </Link>
      </div>
    </div>
  );
}
