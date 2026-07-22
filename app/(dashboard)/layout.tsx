import Link from "next/link";
import { LayoutDashboard, FolderKanban, Receipt, MessageSquare, Settings, Bell } from "lucide-react";
import Background from "@/components/Background";
import { getServerUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import BrandLogo from "@/components/BrandLogo";
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

  const sidebarLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "#", icon: FolderKanban },
    { name: "Invoices", href: "#", icon: Receipt },
    { name: "Messages", href: "#", icon: MessageSquare },
    { name: "Settings", href: "#", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Background />
      {/* Sidebar */}
      <aside className="w-64 fixed inset-y-0 left-0 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 z-20 flex flex-col">
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
           <BrandLogo href="/" wordmarkExtra={<span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">Client</span>} />
        </div>
        <div className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = link.name === "Dashboard";
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-text-muted hover:bg-gray-100/50 hover:text-text-main'}`}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            )
          })}
        </div>
        <div className="p-4 border-t border-gray-100">
          <LogoutButton className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:bg-red-50 hover:text-red-500 transition-all w-full text-left cursor-pointer" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col relative z-10">
        <header className="h-20 flex items-center justify-between px-8 bg-white/50 backdrop-blur-md border-b border-gray-100 sticky top-0">
          <h1 className="text-xl font-medium text-text-main">Dashboard</h1>
          <div className="flex items-center gap-6">
            <button aria-label="Notifications" className="text-text-muted hover:text-primary transition-colors relative cursor-pointer">
               <Bell className="w-5 h-5" />
               <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                {user.name ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) : "CL"}
              </div>
              <div className="text-sm">
                <p className="font-medium text-text-main">{user.name || "Client"}</p>
                <p className="text-text-muted text-xs">{user.company || "Enterprise"}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
