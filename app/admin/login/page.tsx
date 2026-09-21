import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Acceso administrativo",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="font-display text-lg uppercase tracking-widest2 text-ivory">
            Junko <span className="text-gold">Golf Club</span>
          </p>
          <p className="mt-2 font-sans text-xs uppercase tracking-widest2 text-ivory/50">
            Panel administrativo
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
