"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) throw updateError;
      setSuccess(true);
      setTimeout(() => {
        router.push("/sign-in");
      }, 2500);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card glass-border p-10 rounded-3xl w-full">
      <div className="text-center mb-8">
        <Link href="/" className="text-2xl font-display font-bold text-text-main inline-block mb-8">KrayoNova</Link>
        <h1 className="text-3xl font-display font-medium text-text-main mb-2">New Password</h1>
        <p className="text-text-muted text-sm">Enter your new secure password below</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/10 border border-red-500/20 text-red-500 rounded-xl text-sm text-center">
          {error}
        </div>
      )}

      {success ? (
        <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-600 rounded-xl text-sm text-center">
          Password updated successfully! Redirecting you to login...
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-main mb-2">New Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••" 
              className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-text-main" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-2">Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Updating..." : "Update Password"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      )}
    </div>
  );
}
