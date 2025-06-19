import { Users, FileText, Calendar, Folder, House } from "lucide-react";

export const sidebarMainNavTitle = "Main nav";
export const sidebarMenuTitle = "Folders";
export const sidebarProjectsTitle = "Conversations";

export const sidebarMainNav = [
    {
      name: "Home",
      url: "/dashboard/home",
      icon: House,
    },
    {
      name: "Calendar",
      url: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      name: "Documents",
      url: "/dashboard/documents",
      icon: FileText,
    },
    {
      name: "Members",
      url: "/dashboard/members",
      icon: Users,
    },
  
  ];
  

export const sidebarMenu = [
  {
    title: "Acme Corp",
    url: `/dashboard/folder/acme-corp`,
    icon: Folder,
    isActive: true,
    items: [
      { title: "Latest update", url: `/dashboard/folder/acme-corp/conversation/latest-update` },
      { title: "Acme Corp - Expansion", url: `/dashboard/folder/acme-corp/conversation/acme-corp-expansion` },
      { title: "Acme Corp - Renewal 2025", url: `/dashboard/folder/acme-corp/conversation/acme-corp-renewal-2025` }
    ]
  },
  {
    title: "Ardent Media",
    url: `/dashboard/folder/ardent-media`,
    icon: Folder,
    items: [
      { title: "Call prep", url: `/dashboard/folder/ardent-media/conversation/call-prep` },
      { title: "Contact update", url: `/dashboard/folder/ardent-media/conversation/contact-update` },
      { title: "Ardent Media - New deal", url: `/dashboard/folder/ardent-media/conversation/ardent-media-new-deal` }
    ]
  },
  {
    title: "Velar Technologies",
    url: `/dashboard/folder/velar-technologies`,
    icon: Folder,
    items: [
      { title: "Pricing discussion", url: `/dashboard/folder/velar-technologies/conversation/pricing-discussion` },
      { title: "Demo prep", url: `/dashboard/folder/velar-technologies/conversation/demo-prep` }
    ]
  },
  {
    title: "Annual goals",
    url: `/dashboard/folder/annual-goals`,
    icon: Folder,
    items: [
      { title: "Forecast", url: `/dashboard/folder/annual-goals/conversation/forecast` },
      { title: "Priorities", url: `/dashboard/folder/annual-goals/conversation/priorities` }
    ]
  }
];


export const sidebarProjects = [
  {
    name: "Team update",
    url: "/dashboard/conversation/team-update",
  },
  {
    name: "Review proposal",
    url: "/dashboard/conversation/review-proposal",
  },
  {
    name: "Feedback on email draft",
    url: "/dashboard/conversation/feedback-on-email-draft",
  },
];

export const sidebarUser = {
  name: "Demo User",
  email: "demo@company.com",
  avatar: "/avatar.jpg"
}; 