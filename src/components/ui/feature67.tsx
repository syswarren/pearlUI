import React from "react";
import Link from "next/link";
import {
  Bolt,
  Building,
  Cloud,
  MessagesSquare,
  Rocket,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const defaultFeatures = [
  {
    id: "feature-1",
    title: "Feature 1",
    description:
      "Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur.",
    icon: Cloud,
    url: undefined,
    status: undefined,
  },
  {
    id: "feature-2",
    title: "Feature 2",
    description:
      "Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur.",
    icon: Star,
    url: undefined,
    status: undefined,
  },
  {
    id: "feature-3",
    title: "Feature 3",
    description:
      "Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur.",
    icon: Bolt,
    url: undefined,
    status: undefined,
  },
  {
    id: "feature-4",
    title: "Feature 4",
    description:
      "Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur.",
    icon: MessagesSquare,
    url: undefined,
    status: undefined,
  },
  {
    id: "feature-5",
    title: "Feature 5",
    description: "Nam vitae molestie arcu. Quisque eu libero orci.",
    icon: Rocket,
    url: undefined,
    status: undefined,
  },
  {
    id: "feature-6",
    title: "Feature 6",
    description:
      "Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur.",
    icon: Building,
    url: undefined,
    status: undefined,
  },
];

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  url?: string;
  status?: string;
}

interface Feature67Props {
  features?: Feature[];
  title?: string;
  description?: string;
}

const getStatusBadgeStyle = (status?: string) => {
  if (status === 'Done') return { backgroundColor: 'oklch(92.5% 0.084 155.995)', color: '#14532d' };
  if (status === 'Work in progress') return { backgroundColor: 'oklch(90.1% 0.076 70.697)', color: '#7c2d12' };
  if (status === 'To do') return { backgroundColor: 'oklch(55.1% 0.027 264.364)', color: '#fff' };
  return {};
};

const Feature67: React.FC<Feature67Props> = ({ features = defaultFeatures, title, description }) => {
  return (
    <section className="py-32">
      <div className="container flex flex-col items-start gap-8 lg:gap-12 lg:px-16 xl:flex-row xl:gap-32">
        <div className="flex flex-col gap-2 lg:max-w-1/3 xl:max-w-3xl">
          <h3 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
            {title || "Feature group"}
          </h3>
          {description && (
            <p className="text-muted-foreground text-base md:text-lg">
              {description}
            </p>
          )}
        </div>
        <div className="grid w-full gap-6 md:grid-cols-2">
          {features.map((feature) =>
            feature.url ? (
              <Link
                key={feature.id}
                href={feature.url}
                className="relative flex flex-col justify-between rounded-lg border border-border bg-accent p-6 md:p-8 hover:bg-accent/70 transition-colors min-h-40"
              >
                {feature.status && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge style={getStatusBadgeStyle(feature.status)}>
                      {feature.status}
                    </Badge>
                  </div>
                )}
                <div className="flex">
                  <feature.icon className="mr-3 size-5 shrink-0 lg:mr-6 lg:size-6" />
                  <div>
                    <div className="mb-3 h-5 text-sm font-semibold text-accent-foreground md:text-base">
                      {feature.title}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground md:text-base">
                      {feature.description}
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div
                key={feature.id}
                className="relative flex flex-col justify-between rounded-lg border border-border bg-accent p-6 md:p-8 min-h-40"
              >
                {feature.status && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge style={getStatusBadgeStyle(feature.status)}>
                      {feature.status}
                    </Badge>
                  </div>
                )}
                <div className="flex">
                  <feature.icon className="mr-3 size-5 shrink-0 lg:mr-6 lg:size-6" />
                  <div>
                    <div className="mb-3 h-5 text-sm font-semibold text-accent-foreground md:text-base">
                      {feature.title}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground md:text-base">
                      {feature.description}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export { Feature67 };
