"use client";

import { useState } from "react";
import { useCollection } from "@/hooks/use-content";
import { Briefcase, MapPin, Clock, ArrowRight, X, Send } from "lucide-react";
import { cms } from "@/lib/cms";
import CTA from "@/components/CTA";

export default function CareersPage() {
  const { data: dbJobs, loading } = useCollection<any>("careers", { orderBy: { field: "order" }});
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [applying, setApplying] = useState(false);
  const [success, setSuccess] = useState(false);

  const fallbackJobs = [
    { id: "1", title: "Senior AI Engineer", department: "Engineering", location: "San Francisco, CA / Remote", type: "Full-time", description: "Design, build, and deploy custom agentic workflows and LLM pipelines for enterprise systems.", requirements: ["5+ years experience in software engineering", "Expertise with PyTorch, OpenAI, and LangChain", "Strong mathematical foundation in deep learning"] },
    { id: "2", title: "Lead UI/UX Architect", department: "Design", location: "New York, NY / Hybrid", type: "Full-time", description: "Shape the aesthetic future of KrayoNova's products, emphasizing premium typography and luxury layouts.", requirements: ["6+ years UX experience in premium/agency digital spaces", "Mastery of Figma, Framer, and web animation principles", "Excellent storytelling and communication skills"] },
    { id: "3", title: "Cloud Platform Lead", department: "Engineering", location: "Remote", type: "Full-time", description: "Scale global AWS and GCP clusters to handle multi-million request loads with zero downtime.", requirements: ["5+ years of production DevOps/SRE operations", "Expertise with Terraform, Docker, Kubernetes", "Profound understanding of system security"] }
  ];

  const jobs = dbJobs.length > 0 ? dbJobs : fallbackJobs;

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setApplying(true);

    try {
      // Save application details in leads collection
      await cms.create("leads", {
        firstName: name,
        lastName: "",
        email,
        status: "Applied",
        details: `Job Application: Applied for ${selectedJob.title}.\nPortfolio/Resume: ${portfolioUrl}\nCover Letter: ${coverLetter}`,
        createdAt: new Date()
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelectedJob(null);
        setName("");
        setEmail("");
        setPortfolioUrl("");
        setCoverLetter("");
      }, 3000);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setApplying(false);
    }
  };

  return (
    <>
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-[70vh]">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-6 inline-block">
            We are hiring
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-medium text-text-main mb-6 leading-tight">
            Build the <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">intelligent systems</span> of tomorrow
          </h1>
          <p className="text-xl text-text-muted font-light leading-relaxed">
            Join a small, hyper-focused team of engineers and designers crafting premium software and AI solutions for industry leaders.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-text-muted py-12">Loading positions...</div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {jobs.map((job) => (
              <div 
                key={job.id} 
                className="nova-card p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-primary/30"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-3 items-center">
                    <h3 className="text-2xl font-display font-bold text-text-main">{job.title}</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase font-mono tracking-tight">
                      {job.department}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-text-muted">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-400" />{job.location}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gray-400" />{job.type}</span>
                  </div>
                  <p className="text-text-muted text-sm pt-2 line-clamp-2 max-w-2xl">{job.description}</p>
                </div>
                <button 
                  onClick={() => setSelectedJob(job)}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-primary hover:text-white rounded-full font-medium transition-all text-sm shrink-0"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-fade-in">
          <div className="glass-card glass-border rounded-3xl p-8 max-w-lg w-full relative max-h-[90vh] overflow-y-auto bg-white/90">
            <button 
              onClick={() => setSelectedJob(null)}
              className="absolute top-6 right-6 p-2 text-text-muted hover:text-text-main transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {success ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display font-medium text-text-main">Application Submitted!</h3>
                <p className="text-text-muted">Thank you for your interest. We will review your application shortly.</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary font-mono">{selectedJob.department}</span>
                  <h3 className="text-2xl font-display font-medium text-text-main mt-1">Apply for {selectedJob.title}</h3>
                  <p className="text-text-muted text-sm mt-1">{selectedJob.location}</p>
                </div>

                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Jane Doe" 
                      className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">Email</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="jane@example.com" 
                      className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">Portfolio or Resume Link</label>
                    <input 
                      type="url" 
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      required
                      placeholder="https://github.com/janedoe" 
                      className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">Cover Letter / Message</label>
                    <textarea 
                      rows={4} 
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      required
                      placeholder="Tell us briefly why you want to build tomorrow's digital systems with us..." 
                      className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={applying}
                    className="w-full py-3.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 mt-6"
                  >
                    {applying ? "Submitting..." : "Submit Application"}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      
      <CTA />
    </>
  );
}
