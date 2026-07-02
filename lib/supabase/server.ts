import { createClient as createClientWithOptions } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createFallbackSupabaseClient, hasSupabaseConfig } from "./fallback";

export async function createClient() {
  const cookieStore = await cookies();
  const token = cookieStore.get("supabase-token")?.value;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  if (!hasSupabaseConfig()) {
    return createFallbackSupabaseClient() as any;
  }

  if (token) {
    return createClientWithOptions(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return createClientWithOptions(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function getServerUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("supabase-token")?.value;
    if (!token) return null;

    // Use admin client to verify the cryptographic token directly
    const { supabaseAdmin } = await import("./admin");
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !user) return null;

    // Fetch user profile from DB using admin client
    const { data: profile } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    return {
      uid: user.id,
      email: user.email,
      name: profile?.name || user.user_metadata?.name || "",
      role: profile?.role || user.user_metadata?.role || "client",
      company: profile?.company || user.user_metadata?.company || "",
    };
  } catch (error) {
    console.error("Error in getServerUser:", error);
    return null;
  }
}
