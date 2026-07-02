"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { syncSessionCookie } from "@/lib/auth/session";
import BrandLogo from "@/components/BrandLogo";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      if (!signInData.user || !signInData.session) throw new Error("Sign in failed");

      await syncSessionCookie(signInData.session.access_token);

      // Fetch user role
      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", signInData.user.id)
        .maybeSingle();

      const role = profile?.role || "client";
      
      if (["super_admin", "admin", "content_manager", "sales_manager"].includes(role)) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card glass-border p-10 rounded-3xl w-full">
      <div className="text-center mb-8">
        <BrandLogo href="/" className="mb-8 justify-center" />
        <h1 className="text-3xl font-display font-medium text-text-main mb-2">Welcome Back</h1>
        <p className="text-text-muted text-sm">Sign in to your client dashboard</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/10 border border-red-500/20 text-red-500 rounded-xl text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSignIn} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-text-main mb-2">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="hello@example.com" 
            className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-text-main" 
          />
        </div>
        <div>
           <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-text-main">Password</label>
            <Link href="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
          </div>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••" 
            className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-text-main" 
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group mt-6 disabled:opacity-50"
        >
          {loading ? "Signing In..." : "Sign In"}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <p className="text-center mt-8 text-sm text-text-muted">
        Don&apos;t have an account? <Link href="/sign-up" className="text-primary font-medium hover:underline">Sign up</Link>
      </p>
    </div>
  );
}

