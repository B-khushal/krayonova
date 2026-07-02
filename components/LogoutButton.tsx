"use client";

import { useAuth } from "@/hooks/use-auth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton({ className }: { className?: string }) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logout();
    router.push("/sign-in");
  };

  return (
    <button 
      onClick={handleLogout}
      className={className || "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-all w-full text-left"}
    >
      <LogOut className="w-5 h-5" />
      Sign Out
    </button>
  );
}
