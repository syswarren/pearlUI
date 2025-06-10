import React from "react";

export type PageHeaderEnrichedItem = {
  icon: React.ReactNode;
  label: React.ReactNode;
};

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  variant?: "default" | "enriched" | "minimal";
  logoUrl?: string; // for enriched
  descriptionItems?: PageHeaderEnrichedItem[]; // for enriched
}

export function PageHeader({
  title,
  description,
  action,
  className,
  variant = "default",
  logoUrl,
  descriptionItems = [],
}: PageHeaderProps) {
  if (variant === "minimal") {
    return (
      <div className={className ?? ""}>
        <h1
          className="text-2xl font-semibold"
          style={{ color: "var(--color-foreground)" }}
        >
          {title}
        </h1>
      </div>
    );
  }

  if (variant === "enriched") {
    return (
      <div className={`sm:flex sm:items-center ${className ?? ""}`}>
        <div className="sm:flex-auto w-full">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
            {logoUrl && (
              <img
                src={logoUrl}
                alt="Logo"
                className="rounded object-cover mb-2 sm:mb-0"
                style={{ width: 32, height: 32 }}
              />
            )}
            <h1
              className="text-2xl font-semibold"
              style={{ color: "var(--color-foreground)" }}
            >
              {title}
            </h1>
          </div>
          {descriptionItems.length > 0 && (
            <ul
              className="flex flex-row gap-6 mt-2 pl-0 overflow-x-auto"
              style={{ paddingLeft: 0, paddingTop: logoUrl ? 0 : undefined }}
            >
              {descriptionItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center justify-center">{item.icon}</span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {action && (
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none w-full sm:w-auto">
            {action}
          </div>
        )}
      </div>
    );
  }

  // default
  return (
    <div className={`sm:flex sm:items-center ${className ?? ""}`}>
      <div className="sm:flex-auto">
        <h1
          className="text-2xl font-semibold"
          style={{ color: "var(--color-foreground)" }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          {action}
        </div>
      )}
    </div>
  );
}

export default PageHeader; 