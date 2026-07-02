"use client";

type LoadingSkeletonProps = {
  variant?: "card" | "table" | "text" | "avatar";
  count?: number;
  className?: string;
};

export default function LoadingSkeleton({ variant = "text", count = 1, className = "" }: LoadingSkeletonProps) {
  const items = Array.from({ length: count });

  if (variant === "card") {
    return (
      <div className={`grid md:grid-cols-4 gap-6 ${className}`}>
        {items.map((_, i) => (
          <div key={i} className="admin-card p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="admin-shimmer h-3 w-20 rounded-md" />
              <div className="admin-shimmer w-9 h-9 rounded-xl" />
            </div>
            <div className="admin-shimmer h-8 w-16 rounded-md" />
            <div className="admin-shimmer h-3 w-24 rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className={`admin-card overflow-hidden ${className}`}>
        <div className="px-6 py-4 border-b border-border-soft">
          <div className="admin-shimmer h-3 w-32 rounded-md" />
        </div>
        {items.map((_, i) => (
          <div key={i} className="px-6 py-4 flex items-center gap-4 border-b border-border-soft last:border-0">
            <div className="admin-shimmer w-8 h-8 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="admin-shimmer h-3 w-40 rounded-md" />
              <div className="admin-shimmer h-2.5 w-24 rounded-md" />
            </div>
            <div className="admin-shimmer h-5 w-16 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "avatar") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="admin-shimmer w-10 h-10 rounded-full shrink-0" />
        <div className="space-y-2">
          <div className="admin-shimmer h-3 w-24 rounded-md" />
          <div className="admin-shimmer h-2.5 w-16 rounded-md" />
        </div>
      </div>
    );
  }

  // Text variant
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((_, i) => (
        <div key={i} className="admin-shimmer h-3 rounded-md" style={{ width: `${70 + Math.random() * 30}%` }} />
      ))}
    </div>
  );
}
