import Background from "@/components/Background";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Account Authentication",
  description: "Secure client and admin portal authentication for KrayoNova platforms.",
  noIndex: true,
});

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-6">
      <Background />
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
