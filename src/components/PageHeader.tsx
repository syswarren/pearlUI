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
          {/* Mobile: logo centered above content */}
          {logoUrl && (
            <div className="flex justify-center mb-2 sm:hidden">
              <img
                src={logoUrl}
                alt="Logo"
                className="rounded object-cover"
                style={{ width: 62, height: 62, marginRight: 0 }}
              />
            </div>
          )}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            {/* Desktop: logo left of content */}
            {logoUrl && (
              <img
                src={logoUrl}
                alt="Logo"
                className="rounded object-cover hidden sm:block"
                style={{ width: 62, height: 62, marginRight: 0 }}
              />
            )}
            <div className="flex flex-col gap-2">
              <h1
                className="text-2xl font-semibold"
                style={{ color: "var(--color-foreground)" }}
              >
                {title}
              </h1>
              {descriptionItems.length > 0 && (
                <ul
                  className="flex flex-row gap-2 pl-0 overflow-x-auto justify-center sm:justify-start"
                  style={{ paddingLeft: 0 }}
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
          </div>
        </div>
        {action && (
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none w-full sm:w-auto flex justify-center sm:justify-start">
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