import PageHeader from "@/components/PageHeader";

export default function ActivityPage() {
  return (
    <div className="px-4 mt-4 sm:px-6 mt-6 lg:px-8 mt-8">
      <PageHeader variant="minimal" title="Activity" />
      {/* Activity content goes here */}
      <div className="mt-6">
        <p className="text-muted-foreground">Activity tracking functionality coming soon...</p>
      </div>
    </div>
  );
} 