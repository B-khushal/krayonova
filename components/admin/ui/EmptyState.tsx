"use client";

import { FileText, type LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
};

export default function EmptyState({
  icon: Icon = FileText,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-bg-secondary flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-text-tertiary" />
      </div>
      <h3 className="text-sm font-semibold text-text-primary mb-1">{title}</h3>
      {description && (
        <p className="text-xs text-text-tertiary max-w-sm mb-4">{description}</p>
      )}
      {action && (
        action.href ? (
          <a href={action.href} className="admin-btn-primary text-xs py-2 px-4">
            {action.label}
          </a>
        ) : (
          <button onClick={action.onClick} className="admin-btn-primary text-xs py-2 px-4">
            {action.label}
          </button>
        )
      )}
    </div>
  );
}
