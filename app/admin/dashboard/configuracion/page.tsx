import { AdminEditor } from "@/components/admin/AdminEditor";
import { UpdatePasswordForm } from "@/components/admin/UpdatePasswordForm";
import { createClient } from "@/lib/supabase/server";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="font-heading text-2xl text-forest">Configuración</h2>
        <p className="mt-1 font-sans text-sm text-navy/50">
          Preferencias de la cuenta administrativa.
        </p>
      </div>

      <AdminEditor title="Cuenta" description={user?.email}>
        <UpdatePasswordForm />
      </AdminEditor>
    </div>
  );
}
