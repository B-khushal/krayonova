"use client";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
};

export default function PageHeader({ title, description, actions, icon }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary shrink-0">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">{title}</h1>
          {description && (
            <p className="text-sm text-text-tertiary mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
}
