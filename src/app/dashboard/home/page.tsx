import PageHeader from "@/components/PageHeader";

export default function HomePage() {
  return (
    <div className="px-4 mt-4 sm:px-6 mt-6 lg:px-8 mt-8">
      <PageHeader variant="minimal" title="Home" />
      {/* Home content goes here */}
      <div className="mt-6">
        <p className="text-muted-foreground">Welcome to your dashboard! This is your main overview page.</p>
      </div>
    </div>
  );
} 