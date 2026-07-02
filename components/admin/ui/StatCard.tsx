"use client";

import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
    label?: string;
  };
  accentColor?: "primary" | "success" | "warning" | "danger" | "info";
};

const accentStyles = {
  primary: {
    iconBg: "bg-primary-light",
    iconColor: "text-primary",
  },
  success: {
    iconBg: "bg-success-muted",
    iconColor: "text-success",
  },
  warning: {
    iconBg: "bg-warning-muted",
    iconColor: "text-warning",
  },
  danger: {
    iconBg: "bg-danger-muted",
    iconColor: "text-danger",
  },
  info: {
    iconBg: "bg-info-muted",
    iconColor: "text-info",
  },
};

export default function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  accentColor = "primary",
}: StatCardProps) {
  const accent = accentStyles[accentColor];

  return (
    <div className="admin-card p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">{label}</p>
        {Icon && (
          <div className={`w-9 h-9 rounded-xl ${accent.iconBg} flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${accent.iconColor}`} />
          </div>
        )}
      </div>
      <div>
        <p className="text-3xl font-display font-bold text-text-primary">{value}</p>
        {trend && (
          <p className={`mt-1.5 ${trend.direction === "up" ? "stat-trend-up" : trend.direction === "down" ? "stat-trend-down" : "text-text-tertiary text-xs"}`}>
            {trend.direction === "up" && <ArrowUpRight className="w-3 h-3" />}
            {trend.direction === "down" && <ArrowDownRight className="w-3 h-3" />}
            {trend.value}
            {trend.label && <span className="font-normal ml-1 opacity-70">{trend.label}</span>}
          </p>
        )}
      </div>
    </div>
  );
}
