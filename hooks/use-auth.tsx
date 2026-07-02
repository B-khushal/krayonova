"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { clearSessionCookie, syncSessionCookie } from "@/lib/auth/session";

interface CompatibleUser {
  id: string;
  uid: string; // Alias for compatibility with components referencing user.uid
  email?: string;
  name?: string;
  company?: string;
}

interface AuthContextType {
  user: CompatibleUser | null;
  role: string | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CompatibleUser | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && session.user) {
        try {
          await syncSessionCookie(session.access_token);
        } catch (error) {
          console.error("Error syncing auth session cookie:", error);
        }

        try {
          const { data: profile } = await supabase
            .from("users")
            .select("role, name, company")
            .eq("id", session.user.id)
            .maybeSingle();

          const name = profile?.name || session.user.user_metadata?.name || "";
          const company = profile?.company || session.user.user_metadata?.company || "";
          const userRole = profile?.role || session.user.user_metadata?.role || "client";

          setUser({
            id: session.user.id,
            uid: session.user.id,
            email: session.user.email,
            name,
            company,
          });
          setRole(userRole);
        } catch (e) {
          console.error("Error fetching user role:", e);
          setUser({
            id: session.user.id,
            uid: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name || "",
            company: session.user.user_metadata?.company || "",
          });
          setRole("client");
        }
      } else {
        setUser(null);
        setRole(null);
        clearSessionCookie().catch((error) => {
          console.error("Error clearing auth session cookie:", error);
        });
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    await clearSessionCookie().catch((error) => {
      console.error("Error clearing auth session cookie:", error);
    });
    setUser(null);
    setRole(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
