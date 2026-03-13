"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ContactSection() {
    const contactEmail = "krayonova@gmail.com";
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const subject = `New Quote Request: ${formData.name}`;
            const body = [
                `Name: ${formData.name}`,
                `Email: ${formData.email}`,
                `Company: ${formData.company || "N/A"}`,
                `Project Type: ${formData.projectType}`,
                `Budget: ${formData.budget}`,
                `Timeline: ${formData.timeline}`,
                "",
                "Project Description:",
                formData.description,
            ].join("\n");

            const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoUrl;

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
            }, 3000);
        } catch (error) {
            console.error('Error preparing email submission:', error);
            setIsSubmitting(false);
            const errorMessage = error instanceof Error ? error.message : 'Failed to prepare email. Please try again.';
            alert(errorMessage);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <section id="contact" className="relative z-20 py-24 bg-purple-200 dark:bg-background">
            <div className="container px-4 md:px-6 mx-auto max-w-screen-xl">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Get in Touch</h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            Ready to start your next big project? Get a free quote today.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="bg-background/50 border border-border/50 p-8 rounded-2xl shadow-sm h-full flex flex-col justify-center">
                            <h3 className="text-2xl font-semibold mb-8">Contact Information</h3>
                            <div className="space-y-8">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Email</p>
                                        <a href="mailto:krayonova@gmail.com" className="text-muted-foreground hover:text-primary transition-colors hover:underline">
                                            krayonova@gmail.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Phone</p>
                                        <a href="tel:+919959109048" className="text-muted-foreground hover:text-primary transition-colors hover:underline">
                                            +91 9959109048
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                                        <Instagram className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Instagram</p>
                                        <a href="https://instagram.com/krayonova" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:underline">
                                            @krayonova
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Location</p>
                                        <p className="text-muted-foreground">Hyderabad, Telangana</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {isSubmitted ? (
                            <div className="py-12 text-center">
                                <div className="mb-4 text-6xl">✓</div>
                                <h3 className="text-2xl font-bold mb-2 text-primary">Quote Request Submitted!</h3>
                                <p className="text-muted-foreground">
                                    We&apos;ll review your project details and get back to you within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2 text-left">
                                        <Label htmlFor="contact-name">Full Name *</Label>
                                        <Input 
                                            id="contact-name" 
                                            required
                                            placeholder="John Doe" 
                                            className="bg-background/50"
                                            value={formData.name}
                                            onChange={(e) => handleChange("name", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2 text-left">
                                        <Label htmlFor="contact-email">Email *</Label>
                                        <Input 
                                            id="contact-email" 
                                            type="email"
                                            required 
                                            placeholder="john@company.com" 
                                            className="bg-background/50"
                                            value={formData.email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 text-left">
                                    <Label htmlFor="contact-company">Company Name</Label>
                                    <Input 
                                        id="contact-company" 
                                        placeholder="Your Company Inc." 
                                        className="bg-background/50"
                                        value={formData.company}
                                        onChange={(e) => handleChange("company", e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2 text-left">
                                        <Label htmlFor="contact-projectType">Project Type *</Label>
                                        <Select
                                            required
                                            value={formData.projectType}
                                            onValueChange={(value) => handleChange("projectType", value)}
                                        >
                                            <SelectTrigger id="contact-projectType" className="bg-background/50">
                                                <SelectValue placeholder="Select type" />
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

                                    <div className="space-y-2 text-left">
                                        <Label htmlFor="contact-budget">Budget *</Label>
                                        <Select
                                            required
                                            value={formData.budget}
                                            onValueChange={(value) => handleChange("budget", value)}
                                        >
                                            <SelectTrigger id="contact-budget" className="bg-background/50">
                                                <SelectValue placeholder="Select budget" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="500-1000">$500 – $1,000</SelectItem>
                                                <SelectItem value="1000-5000">$1,000 – $5,000</SelectItem>
                                                <SelectItem value="5000-10000">$5,000 – $10,000</SelectItem>
                                                <SelectItem value="10000+">$10,000+</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2 text-left">
                                    <Label htmlFor="contact-timeline">Timeline *</Label>
                                    <Select
                                        required
                                        value={formData.timeline}
                                        onValueChange={(value) => handleChange("timeline", value)}
                                    >
                                        <SelectTrigger id="contact-timeline" className="bg-background/50">
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

                                <div className="space-y-2 text-left">
                                    <Label htmlFor="contact-description">Project Description *</Label>
                                    <Textarea 
                                        id="contact-description"
                                        required 
                                        placeholder="Tell us about your project requirements, goals, and any specific features you need..." 
                                        className="min-h-[120px] bg-background/50"
                                        value={formData.description}
                                        onChange={(e) => handleChange("description", e.target.value)}
                                    />
                                </div>

                                <Button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    size="lg" 
                                    className="w-full font-semibold"
                                >
                                    {isSubmitting ? "Submitting..." : "Request Quote"}
                                </Button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
