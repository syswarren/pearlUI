import { Feature67 } from "@/components/ui/feature67";
import { House, Activity, FileText, Users, Folder, MessageCircle, KeyRound } from "lucide-react";

const pages = [
  {
    id: "home",
    title: "Home",
    description: "The main dashboard overview.",
    icon: House,
    url: "/dashboard/home",
    status: "Work in progress",
  },
  {
    id: "activity",
    title: "Activity",
    description: "See recent activity and updates.",
    icon: Activity,
    url: "/dashboard/activity",
    status: "Work in progress",
  },
  {
    id: "documents",
    title: "Documents",
    description: "Access and manage documents.",
    icon: FileText,
    url: "/dashboard/documents",
    status: "Work in progress",
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
    url: "/dashboard/folder/1",
    status: "Work in progress",
  },
  {
    id: "conversations",
    title: "Conversation Page",
    description: "Collaborate and discuss in conversations.",
    icon: MessageCircle,
    url: "/dashboard/conversation/1",
    status: "To do",
  },
  {
  id: "login",
  title: "Login Page",
  description: "Login to Pearl.",
  icon: KeyRound,
  url: "/login",
  status: "To do",
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
