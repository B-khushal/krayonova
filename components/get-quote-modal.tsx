"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GetQuoteModalProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function GetQuoteModal({ trigger, open, onOpenChange }: GetQuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "",
          budget: "",
          timeline: "",
          description: "",
        });
        if (onOpenChange) onOpenChange(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit form. Please try again.';
      alert(errorMessage);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Get a Project Quote</DialogTitle>
          <DialogDescription>
            Tell us about your project and we&apos;ll get back to you within 24 hours with a detailed quote.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center"
          >
            <div className="mb-4 text-6xl">✓</div>
            <h3 className="text-2xl font-bold mb-2 text-primary">Quote Request Submitted!</h3>
            <p className="text-muted-foreground">
              We&apos;ll review your project details and get back to you within 24 hours.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                placeholder="Your Company Inc."
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectType">Project Type *</Label>
                <Select
                  required
                  value={formData.projectType}
                  onValueChange={(value: string) => handleChange("projectType", value)}
                >
                  <SelectTrigger id="projectType">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="webapp">Web Application</SelectItem>
                    <SelectItem value="mobileapp">Mobile App</SelectItem>
                    <SelectItem value="dashboard">Dashboard / Admin Panel</SelectItem>
                    <SelectItem value="management">Management System</SelectItem>
                    <SelectItem value="hosting">Cloud Hosting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Project Budget *</Label>
                <Select
                  required
                  value={formData.budget}
                  onValueChange={(value: string) => handleChange("budget", value)}
                >
                  <SelectTrigger id="budget">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5000-10000">₹5000 – ₹10,000</SelectItem>
                    <SelectItem value="20000-50000">₹20,000 – ₹50,000</SelectItem>
                    <SelectItem value="50000-100000">₹50,000 – ₹1,00,000</SelectItem>
                    <SelectItem value="100000+">₹1,00,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline *</Label>
              <Select
                required
                value={formData.timeline}
                onValueChange={(value: string) => handleChange("timeline", value)}
              >
                <SelectTrigger id="timeline">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">ASAP</SelectItem>
                  <SelectItem value="1month">1 Month</SelectItem>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                required
                placeholder="Tell us about your project requirements, goals, and any specific features you need..."
                rows={5}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
            >
              {isSubmitting ? "Submitting..." : "Request Quote"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
