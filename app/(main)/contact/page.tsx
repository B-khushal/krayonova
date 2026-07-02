"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { cms } from "@/lib/cms";

function ContactForm() {
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
    } catch (err: any) {
      console.error(err);
      setError("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="glass-card glass-border p-10 rounded-3xl bg-white/80">
      {success ? (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-display font-medium text-text-main">Message Sent!</h2>
          <p className="text-text-muted">Thank you for reaching out. A client partner will contact you shortly.</p>
          <button 
            onClick={() => setSuccess(false)}
            className="mt-6 px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors text-sm font-medium"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-900/10 border border-red-500/20 text-red-500 rounded-xl text-sm text-center">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-main mb-2">First Name</label>
              <input 
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-text-main" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-2">Last Name</label>
              <input 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-text-main" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-text-main" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-2">Project Details</label>
            <textarea 
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
            className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {submitting ? "Sending..." : "Send Message"}
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-display font-medium text-text-main mb-6 leading-tight">
          Let&apos;s build <br/> <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">something great</span>
        </h1>
        <p className="text-xl text-text-muted">Tell us about your next project.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
        <Suspense fallback={<div className="glass-card p-10 rounded-3xl text-center">Loading form...</div>}>
          <ContactForm />
        </Suspense>

        <div className="space-y-10">
          <div>
            <h3 className="text-2xl font-display font-medium text-text-main mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white shadow-sm rounded-xl text-primary"><Mail className="w-6 h-6"/></div>
                <div>
                  <p className="text-text-main font-medium">Email Us</p>
                  <p className="text-text-muted">hello@krayonova.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white shadow-sm rounded-xl text-primary"><Phone className="w-6 h-6"/></div>
                <div>
                  <p className="text-text-main font-medium">Call Us</p>
                  <p className="text-text-muted">+1 (555) 000-0000</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white shadow-sm rounded-xl text-primary"><MapPin className="w-6 h-6"/></div>
                <div>
                  <p className="text-text-main font-medium">Headquarters</p>
                  <p className="text-text-muted">123 Innovation Drive<br/>San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
