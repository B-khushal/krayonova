import ClientDashboardShell from "@/components/dashboard/ClientDashboardShell";
import { getServerUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { generateSEO } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = generateSEO({
  title: "Client Portal Dashboard",
  description: "Client portal dashboard for KrayoNova project status and management.",
  noIndex: true,
});

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <ClientDashboardShell user={user}>
      {children}
    </ClientDashboardShell>
  );
}
