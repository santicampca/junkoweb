import { notFound } from "next/navigation";
import { AdminEditor } from "@/components/admin/AdminEditor";
import { TournamentEditForm } from "@/components/admin/TournamentForm";
import { createClient } from "@/lib/supabase/server";
import { updateTournament } from "@/lib/actions/tournaments";
import type { Tournament } from "@/lib/types";

export default async function EditTournamentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("tournaments")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();
  const tournament = data as Tournament;

  const action = async (formData: FormData) => {
    "use server";
    await updateTournament(id, formData);
  };

  return (
    <AdminEditor title="Editar torneo" description={tournament.title}>
      <TournamentEditForm tournament={tournament} action={action} />
    </AdminEditor>
  );
}
