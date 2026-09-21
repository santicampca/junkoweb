import { AdminEditor } from "@/components/admin/AdminEditor";
import { MembershipCreateForm } from "@/components/admin/MembershipForm";

export default function NewMembershipPage() {
  return (
    <AdminEditor title="Nueva membresía" description="Complete la información de la membresía.">
      <MembershipCreateForm />
    </AdminEditor>
  );
}
