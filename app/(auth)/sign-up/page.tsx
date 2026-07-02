"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { syncSessionCookie } from "@/lib/auth/session";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            company,
            role: "client",
          },
        },
      });

      if (signUpError) throw signUpError;
      if (data?.session) {
        await syncSessionCookie(data.session.access_token);
      }

      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card glass-border p-10 rounded-3xl w-full">
      <div className="text-center mb-8">
        <Link href="/" className="text-2xl font-display font-bold text-text-main inline-block mb-8">KrayoNova</Link>
        <h1 className="text-3xl font-display font-medium text-text-main mb-2">Create Account</h1>
        <p className="text-text-muted text-sm">Join to get started with your next project</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/10 border border-red-500/20 text-red-500 rounded-xl text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-main mb-1">Full Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="John Doe" 
            className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-text-main" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-main mb-1">Email</label>
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
          <label className="block text-sm font-medium text-text-main mb-1">Company (Optional)</label>
          <input 
            type="text" 
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Acme Inc." 
            className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-text-main" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-main mb-1">Password</label>
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
          {loading ? "Creating Account..." : "Create Account"}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <p className="text-center mt-8 text-sm text-text-muted">
        Already have an account? <Link href="/sign-in" className="text-primary font-medium hover:underline">Sign in</Link>
      </p>
    </div>
  );
}

