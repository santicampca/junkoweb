import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Acceso administrativo",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex flex-col items-center text-center">
          <Image src="/brand/logo.png" alt="Junko Golf Club" width={56} height={56} className="mb-4 h-14 w-14" />
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
