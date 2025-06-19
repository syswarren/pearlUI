import { Feature67 } from "@/components/ui/feature67";
import { House, Calendar, FileText, Users, Folder, MessageCircle, KeyRound, Globe } from "lucide-react";

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
    description: "See your schedule and upcoming events.",
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
    status: "Ongoing",
  },
  {
    id: "documents",
    title: "Documents",
    description: "Access and manage documents.",
    icon: FileText,
    url: "/dashboard/documents",
    status: "Ongoing",
  },
  {
    id: "members",
    title: "Members",
    description: "View and manage team members.",
    icon: Users,
    url: "/dashboard/members",
    status: "Done",
  },
  {
    id: "folders",
    title: "Folder Page",
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
    status: "To do",
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
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground p-8">
      <Feature67
        features={pages}
        title="Pearl UI"
        description="Quickly access and preview the main sections of your dashboard. Click any block to jump to that page."
      />
    </div>
  );
}
