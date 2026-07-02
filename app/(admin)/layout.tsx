import { getServerUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerUser();

  if (!user) {
    redirect("/sign-in");
  }

  const allowedRoles = ["super_admin", "admin", "content_manager", "sales_manager"];
  if (!allowedRoles.includes(user.role)) {
    redirect("/sign-in");
  }

  // Map role to display label
  const roleLabels: Record<string, string> = {
    super_admin: "Super Admin",
    admin: "Admin",
    content_manager: "Content Manager",
    sales_manager: "Sales Manager",
  };

  return (
    <AdminShell
      userName={user.name || user.email || "Admin"}
      userRole={roleLabels[user.role] || user.role}
    >
      {children}
    </AdminShell>
  );
}
