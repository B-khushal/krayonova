import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-bg-gray text-text-main p-6 text-center">
      <div className="max-w-md w-full glass-card p-10 rounded-3xl border border-black/10 shadow-xl flex flex-col items-center">
        <BrandLogo href="/" className="mb-8 justify-center" size="lg" />
        
        <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 mb-4">
          404 Error
        </span>

        <h1 className="text-4xl font-display font-bold tracking-tight mb-3">
          Page Not Found
        </h1>

        <p className="text-text-muted text-sm mb-8 leading-relaxed">
          The requested page could not be located or may have been relocated to a new web location.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <Link
            href="/"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-text-main text-white font-medium hover:bg-black/90 transition-all shadow-md active:scale-95"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          
          <Link
            href="/services"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-black/10 text-text-main font-medium hover:bg-gray-50 transition-all shadow-sm active:scale-95"
          >
            <Search className="w-4 h-4" />
            Our Services
          </Link>
        </div>
      </div>
    </div>
  );
}
