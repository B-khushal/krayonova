import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { Suspense } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Background />
      <Navbar />
      <main className="min-h-screen pt-20">
        {children}
      </main>
      <Footer />
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
    </>
  );
}

