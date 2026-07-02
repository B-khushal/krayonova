"use client";

type BadgeProps = {
  variant?: "success" | "warning" | "danger" | "info" | "neutral" | "primary";
  children: React.ReactNode;
  size?: "sm" | "md";
  dot?: boolean;
};

export default function Badge({ variant = "neutral", children, size = "sm", dot = false }: BadgeProps) {
  const sizeClass = size === "md" ? "px-3 py-1 text-xs" : "px-2.5 py-0.5 text-[11px]";
  return (
    <span className={`admin-badge admin-badge-${variant} ${sizeClass}`}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full mr-0.5 ${
          variant === "success" ? "bg-success" :
          variant === "warning" ? "bg-warning" :
          variant === "danger" ? "bg-danger" :
          variant === "info" ? "bg-info" :
          variant === "primary" ? "bg-primary" :
          "bg-text-tertiary"
        }`} />
      )}
      {children}
    </span>
  );
}
