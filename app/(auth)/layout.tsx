import Background from "@/components/Background";

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
