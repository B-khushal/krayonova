import { Suspense } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Contact Us | Start Your Next Project",
  description: "Get in touch with KrayoNova's engineering and design partners to discuss your AI product, web platform, or digital initiative.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-display font-medium text-text-main mb-6 leading-tight">
          Let&apos;s build <br/> <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">something great</span>
        </h1>
        <p className="text-xl text-text-muted font-light leading-relaxed">Tell us about your next project.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
        <Suspense fallback={<div className="glass-card p-10 rounded-3xl text-center">Loading form...</div>}>
          <ContactForm />
        </Suspense>

        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-display font-medium text-text-main mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white shadow-sm rounded-xl text-primary"><Mail className="w-6 h-6"/></div>
                <div>
                  <p className="text-text-main font-medium">Email Us</p>
                  <a href="mailto:hello@krayonova.com" className="text-text-muted hover:text-primary transition-colors">hello@krayonova.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white shadow-sm rounded-xl text-primary"><Phone className="w-6 h-6"/></div>
                <div>
                  <p className="text-text-main font-medium">Call Us</p>
                  <a href="tel:+15550000000" className="text-text-muted hover:text-primary transition-colors">+1 (555) 000-0000</a>
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
