import { getServerUser } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import Image from "next/image";
import { displayText } from "@/lib/utils";

export default async function DashboardPage() {
  const user = await getServerUser();
  if (!user) {
    redirect("/sign-in");
  }

  // Fetch client-specific projects (matching company name)
  let projects: any[] = [];
  try {
    const { data } = await supabaseAdmin
      .from("portfolio")
      .select("*")
      .eq("client", user.company || "_none_")
      .order("order", { ascending: true });

    if (data) {
      projects = data.map(p => ({
        id: p.id,
        name: displayText(p.title, "Project"),
        industry: displayText(p.industry, "Digital Development"),
        status: displayText(p.status, "In Progress"),
        order: p.order,
      }));
    }
  } catch (err) {
    console.error("Error querying projects for client:", err);
  }

  // Fetch client lead/consultation messages
  let clientLeads: any[] = [];
  try {
    const { data } = await supabaseAdmin
      .from("leads")
      .select("*")
      .eq("email", user.email)
      .order("created_at", { ascending: false });

    if (data) {
      clientLeads = data.map(l => ({
        id: l.id,
        firstName: l.name?.split(" ")[0] || l.name || "Inquiry",
        lastName: l.name?.split(" ").slice(1).join(" ") || "",
        email: l.email,
        company: l.company,
        source: l.source,
        status: l.status,
        details: l.notes,
        createdAt: l.created_at ? {
          toDate: () => new Date(l.created_at)
        } : null
      }));
    }
  } catch (err) {
    console.error("Error querying client leads:", err);
  }

  // Metrics calculations
  const activeProjectsCount = projects.filter(p => p.status === "Published" || p.status === "In Progress").length;
  const totalSubmissions = clientLeads.length;
  const latestStatus = clientLeads[0]?.status || "No Requests";

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card glass-border p-6 rounded-2xl bg-white/80">
          <h3 className="text-text-muted text-sm font-medium mb-1">Your Active Projects</h3>
          <p className="text-3xl font-display font-medium text-text-main">{activeProjectsCount}</p>
        </div>
        <div className="glass-card glass-border p-6 rounded-2xl bg-white/80">
          <h3 className="text-text-muted text-sm font-medium mb-1">CRM Inquiries</h3>
          <p className="text-3xl font-display font-medium text-text-main">{totalSubmissions}</p>
        </div>
        <div className="glass-card glass-border p-6 rounded-2xl bg-white/80">
          <h3 className="text-text-muted text-sm font-medium mb-1">Latest Request Status</h3>
          <p className="text-xl font-display font-medium text-primary mt-1">{latestStatus}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-xl font-medium text-text-main mb-4">Your Project Portfolio</h2>
          
          {projects.length === 0 ? (
            <div className="glass-card glass-border p-8 rounded-2xl bg-white/80 text-center text-text-muted">
              No active projects associated with <span className="font-semibold">{user.company || "your company"}</span>. 
              Submit a request using the Contact Form to get started.
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="glass-card glass-border p-6 rounded-2xl bg-white/80 flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-primary font-bold">
                    {displayText(project.name, "P")[0]}
                  </div>
                  <div>
                    <h4 className="font-medium text-text-main">{displayText(project.name, "Project")}</h4>
                    <p className="text-sm text-text-muted">{displayText(project.industry, "Digital Development")}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-2 ${
                    displayText(project.status, "In Progress") === "Published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {displayText(project.status, "In Progress")}
                  </span>
                  <p className="text-sm font-medium text-text-main">
                    {displayText(project.status, "In Progress") === "Published" ? "100%" : "65%"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-medium text-text-main mb-4">Request Logs & Messages</h2>
          <div className="glass-card glass-border rounded-2xl bg-white/80 overflow-hidden">
            {clientLeads.length === 0 ? (
              <div className="p-8 text-center text-text-muted text-sm">
                No inquiries submitted yet.
              </div>
            ) : (
              clientLeads.slice(0, 5).map((lead) => {
                const date = lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : "Recently";
                return (
                  <div key={lead.id} className="p-4 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">{lead.status || "New"}</span>
                      <span className="text-xs text-text-muted">{date}</span>
                    </div>
                    <p className="text-sm font-medium text-text-main line-clamp-1">{lead.firstName || "Inquiry"}</p>
                    <p className="text-xs text-text-muted line-clamp-2">{lead.details}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
