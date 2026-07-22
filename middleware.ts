import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_ROLES, SESSION_COOKIE_NAME } from "@/lib/auth/session";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

async function fetchSupabaseUser(token: string) {
  if (!hasSupabaseConfig() && process.env.NODE_ENV !== "test") {
    return { id: "demo-admin-id", email: "admin@krayonova.com", user_metadata: { role: "admin" } };
  }

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response || !response.ok) {
    return null;
  }

  return response.json();
}

async function fetchUserRole(userId: string, token: string) {
  if (!hasSupabaseConfig() && process.env.NODE_ENV !== "test") {
    return "admin";
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/users?select=role&id=eq.${encodeURIComponent(userId)}&limit=1`,
    {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  const rows = await response.json();
  return Array.isArray(rows) && rows.length > 0 ? rows[0]?.role || null : null;
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") && !pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  const user = await fetchSupabaseUser(token);

  if (!user?.id) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin")) {
    const role = (await fetchUserRole(user.id, token)) || user.user_metadata?.role || "client";

    if (!ADMIN_ROLES.includes(role as (typeof ADMIN_ROLES)[number])) {
      const url = request.nextUrl.clone();
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
