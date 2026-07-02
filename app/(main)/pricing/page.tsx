"use client";

import { useDocument } from "@/hooks/use-content";
import { Check } from "lucide-react";
import CTA from "@/components/CTA";
import Link from "next/link";

export default function PricingPage() {
  const { data: pricingData, loading } = useDocument<any>("settings", "pricing");

  const fallbackPlans = [
    {
      name: "Starter",
      price: "$2,500",
      description: "For startups looking to build an MVP and validate their concept.",
      features: ["Strategic UI/UX Design", "Responsive Web App", "Basic AI Integration", "Standard Support"],
      highlight: false,
    },
    {
      name: "Professional",
      price: "$8,000",
      description: "For growing companies needing scalable platforms and automation.",
      features: ["Advanced AI Automation", "Full-Stack Web & Mobile App", "Cloud Infrastructure Setup", "Priority Support"],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations requiring highly secure, scalable solutions.",
      features: ["Dedicated Engineering Team", "Custom LLM & RAG Pipelines", "Compliance & SLA", "24/7 Dedicated Support"],
      highlight: false,
    }
  ];

  const plans = pricingData?.plans || fallbackPlans;

  return (
    <>
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-medium text-text-main mb-6">
            Transparent <span className="text-primary">Pricing</span>
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto font-light">
            Premium engineering services tailored to your growth stage.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-text-muted py-12">Loading pricing plans...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {plans.map((plan: any, i: number) => (
              <div 
                key={i} 
                className={`p-8 rounded-3xl glass-card flex flex-col justify-between ${
                  plan.highlight 
                    ? "ring-2 ring-primary relative scale-105 shadow-2xl bg-white/90" 
                    : "glass-border bg-white/80"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-display font-medium text-text-main mb-2">{plan.name}</h3>
                  <p className="text-text-muted mb-6 text-sm leading-relaxed">{plan.description}</p>
                  <div className="text-4xl font-display font-bold text-text-main mb-8">
                    {plan.price}
                    {plan.price !== "Custom" && <span className="text-lg text-text-muted font-normal">/mo</span>}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="p-1 rounded-full bg-primary/10 text-primary">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-text-main text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link 
                  href={`/contact?plan=${encodeURIComponent(plan.name)}`}
                  className={`w-full py-3.5 rounded-full font-medium transition-colors text-center inline-block text-sm ${
                    plan.highlight 
                      ? "bg-primary text-white hover:bg-primary/90" 
                      : "bg-gray-100 text-text-main hover:bg-gray-200"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
      <CTA />
    </>
  );
}
