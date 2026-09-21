import { AdminEditor } from "@/components/admin/AdminEditor";
import { TournamentCreateForm } from "@/components/admin/TournamentForm";

export default function NewTournamentPage() {
  return (
    <AdminEditor title="Nuevo torneo" description="Complete la información del torneo.">
      <TournamentCreateForm />
    </AdminEditor>
  );
}
