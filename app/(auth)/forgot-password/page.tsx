"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import BrandLogo from "@/components/BrandLogo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const redirectTo = `${window.location.origin}/reset-password`;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (resetError) throw resetError;
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card glass-border p-10 rounded-3xl w-full">
      <div className="text-center mb-8">
        <BrandLogo href="/" className="mb-8 justify-center" />
        <h1 className="text-3xl font-display font-medium text-text-main mb-2">Reset Password</h1>
        <p className="text-text-muted text-sm">Enter your email to receive a recovery link</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/10 border border-red-500/20 text-red-500 rounded-xl text-sm text-center">
          {error}
        </div>
      )}

      {success ? (
        <div className="space-y-6 text-center">
          <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-600 rounded-xl text-sm">
            Check your email inbox for the secure reset password link.
          </div>
          <Link href="/sign-in" className="inline-flex items-center justify-center w-full py-3.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-main mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="hello@example.com" 
              className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-text-main" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group mt-6 disabled:opacity-50"
          >
            {loading ? "Sending Link..." : "Send Reset Link"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      )}

      <p className="text-center mt-8 text-sm text-text-muted">
        Remember your password? <Link href="/sign-in" className="text-primary font-medium hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
