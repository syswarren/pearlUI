import { Feature67 } from "@/components/ui/feature67";
import { House, Calendar, FileText, Users, Folder, MessageCircle, KeyRound, Globe, Palette, Settings } from "lucide-react";

const pages = [
  {
    id: "home",
    title: "Home",
    description: "The main dashboard overview.",
    icon: House,
    url: "/dashboard/home",
    status: "Ongoing",
  },
  {
    id: "calendar",
    title: "Calendar",
    description: "⚠️ UI ONLY (Not functional and not optimized) See your schedule and upcoming events.",
    icon: Calendar,
    url: "/dashboard/calendar",
    status: "Ongoing",
  },
  {
    id: "territory",
    title: "Territory",
    description: "Manage and view territory information.",
    icon: Globe,
    url: "/dashboard/territory",
    status: "To do",
  },
  {
    id: "documents",
    title: "Documents",
    description: "Access and manage documents.",
    icon: FileText,
    url: "/dashboard/documents",
    status: "To do",
  },
  {
    id: "settings",
    title: "Settings",
    description: "Manage integrations, members, and account settings.",
    icon: Settings,
    url: "/dashboard/settings",
    status: "Done",
  },
  {
    id: "members",
    title: "Settings > Members",
    description: "View and manage team members.",
    icon: Users,
    url: "/dashboard/settings?tab=team",
    status: "Done",
  },
  {
    id: "integrations",
    title: "Settings > Integrations",
    description: "View and manage integrations.",
    icon: Users,
    url: "/dashboard/settings?tab=integrations",
    status: "Done",
  },
  {
    id: "notifications",
    title: "Settings > Notifications",
    description: "View and manage notifications.",
    icon: Users,
    url: "/dashboard/settings?tab=notifications",
    status: "Done",
  },
  {
    id: "account",
    title: "Settings > Account",
    description: "View and manage account settings.",
    icon: Users,
    url: "/dashboard/settings?tab=account",
    status: "Done",
  },
  {
    id: "folders",
    title: "Folder / Account Page",
    description: "Organize conversations in folders.",
    icon: Folder,
    url: "/dashboard/folder/acme-corp",
    status: "Ongoing",
  },
  {
    id: "conversations",
    title: "Conversation Page",
    description: "Collaborate and discuss in conversations.",
    icon: MessageCircle,
    url: "/dashboard/conversation/team-update",
    status: "Ongoing",
  },
  {
    id: "login",
    title: "Login Page",
    description: "Login to Pearl.",
    icon: KeyRound,
    url: "/login",
    status: "Done",
  },

];

export default function Home() {
  // Sort pages by status: Done first, then Ongoing, then To do
  const sortedPages = [...pages].sort((a, b) => {
    const statusOrder = { "Done": 0, "Ongoing": 1, "To do": 2 };
    return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
  });

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground p-8">
      <Feature67
        features={sortedPages}
        title="Pearl UI"
        description="Quickly access and preview the main sections of your dashboard. Click any block to jump to that page."
      />
    </div>
  );
}
