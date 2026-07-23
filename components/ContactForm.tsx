"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2 } from "lucide-react";
import { cms } from "@/lib/cms";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const plan = searchParams?.get("plan");
    if (plan) {
      setDetails(`Interested in the ${plan} Plan. Let's discuss details.`);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await cms.create("leads", {
        firstName,
        lastName,
        email,
        details,
        status: "New",
        createdAt: new Date(),
      });
      setSuccess(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setDetails("");
    } catch {
      setError("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="glass-card glass-border p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-white/80">
      {success ? (
        <div className="text-center py-8 sm:py-12 space-y-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-display font-medium text-text-main">Message Sent!</h2>
          <p className="text-text-muted">Thank you for reaching out. A client partner will contact you shortly.</p>
          <button 
            onClick={() => setSuccess(false)}
            className="mt-6 px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors text-sm font-medium cursor-pointer"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {error && (
            <div className="p-3 bg-red-900/10 border border-red-500/20 text-red-500 rounded-xl text-sm text-center">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="first-name-input" className="block text-sm font-medium text-text-main mb-2">First Name</label>
              <input 
                id="first-name-input"
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-text-main" 
              />
            </div>
            <div>
              <label htmlFor="last-name-input" className="block text-sm font-medium text-text-main mb-2">Last Name</label>
              <input 
                id="last-name-input"
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-text-main" 
              />
            </div>
          </div>
          <div>
            <label htmlFor="email-input" className="block text-sm font-medium text-text-main mb-2">Email</label>
            <input 
              id="email-input"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-text-main" 
            />
          </div>
          <div>
            <label htmlFor="details-input" className="block text-sm font-medium text-text-main mb-2">Project Details</label>
            <textarea 
              id="details-input"
              rows={4} 
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
              placeholder="Describe your goals, tech stack, or selected plan details..."
              className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-text-main"
            ></textarea>
          </div>
          <button 
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
          >
            {submitting ? "Sending..." : "Send Message"}
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      )}
    </div>
  );
}
