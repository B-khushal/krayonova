import { NextResponse } from "next/server";
import { buildSessionCookieOptions, SESSION_COOKIE_NAME } from "@/lib/auth/session";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

async function verifySessionToken(token: string) {
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function POST(request: Request) {
  const { token } = await request.json().catch(() => ({ token: "" }));

  if (!token || typeof token !== "string") {
    return NextResponse.json({ error: "Missing session token" }, { status: 400 });
  }

  const user = await verifySessionToken(token);

  if (!user?.id) {
    return NextResponse.json({ error: "Invalid session token" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, buildSessionCookieOptions());
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    ...buildSessionCookieOptions(),
    maxAge: 0,
  });
  return response;
}