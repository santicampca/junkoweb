import { notFound } from "next/navigation";
import { AdminEditor } from "@/components/admin/AdminEditor";
import { MembershipEditForm } from "@/components/admin/MembershipForm";
import { createClient } from "@/lib/supabase/server";
import { updateMembership } from "@/lib/actions/memberships";

export default async function EditMembershipPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: membership } = await supabase
    .from("memberships")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!membership) notFound();

  const action = async (formData: FormData) => {
    "use server";
    await updateMembership(id, formData);
  };

  return (
    <AdminEditor title="Editar membresía" description={membership.title}>
      <MembershipEditForm membership={membership} action={action} />
    </AdminEditor>
  );
}
