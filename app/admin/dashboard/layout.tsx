import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col bg-ivory lg:flex-row">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-navy/10 bg-navy px-6 py-4">
          <p className="font-display text-sm uppercase tracking-widest2 text-ivory">
            Panel administrativo
          </p>
          <div className="flex items-center gap-4">
            <span className="hidden font-sans text-xs text-ivory/50 sm:inline">
              {user?.email}
            </span>
            <LogoutButton />
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
