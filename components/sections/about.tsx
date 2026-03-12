"use client";

import { motion } from "framer-motion";

const team = [
    { name: "John Doe", role: "Founder & CEO" },
    { name: "Jane Smith", role: "Head of Design" },
    { name: "Alex Johnson", role: "Lead Engineer" }
];

export function AboutSection() {
    return (
        <section id="about" className="relative z-20 py-24 bg-purple-200 dark:bg-black">
            <div className="container px-4 md:px-6 mx-auto max-w-screen-xl">
                <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">About KrayoNova</h2>
                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-6 py-2 text-left bg-background/50 backdrop-blur-sm rounded-r-lg">
                            &ldquo;KrayoNova was founded with a mission to help businesses transform ideas into powerful digital products.&rdquo;
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full mt-12"
                    >
                        {team.map((member, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full bg-background border border-primary/20 flex items-center justify-center mb-4 shadow-sm">
                                    <span className="text-muted-foreground font-semibold text-2xl">{member.name.charAt(0)}</span>
                                </div>
                                <h4 className="font-semibold text-lg">{member.name}</h4>
                                <p className="text-sm text-primary">{member.role}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
