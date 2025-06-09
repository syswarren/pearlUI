import { Users, FileText, Activity, Folder, Frame, PieChart, Map, House, Command, MoreHorizontal } from "lucide-react";

function toKebab(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

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
      name: "Activity",
      url: "/dashboard/activity",
      icon: Activity,
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
    title: "Dashboard",
    url: `/dashboard/folder/dashboard`,
    icon: Folder,
    isActive: true,
    items: [
      { title: "Overview", url: `/dashboard/folder/dashboard/conversation/overview` },
      { title: "Stats", url: `/dashboard/folder/dashboard/conversation/stats` }
    ]
  },
  {
    title: "Reports",
    url: `/dashboard/folder/reports`,
    icon: Folder,
    items: [
      { title: "Sales", url: `/dashboard/folder/reports/conversation/sales` },
      { title: "Inventory", url: `/dashboard/folder/reports/conversation/inventory` }
    ]
  },
  {
    title: "Documentation",
    url: `/dashboard/folder/documentation`,
    icon: Folder,
    items: [
      { title: "Introduction", url: `/dashboard/folder/documentation/conversation/introduction` },
      { title: "Tutorials", url: `/dashboard/folder/documentation/conversation/tutorials` }
    ]
  },
  {
    title: "Settings",
    url: `/dashboard/folder/settings`,
    icon: Folder,
    items: [
      { title: "Profile", url: `/dashboard/folder/settings/conversation/profile` },
      { title: "Team", url: `/dashboard/folder/settings/conversation/team` }
    ]
  }
];


export const sidebarProjects = [
  {
    name: "Design Engineering",
    url: "/dashboard/conversation/design-engineering",
    icon: Frame,
  },
  {
    name: "Sales & Marketing",
    url: "/dashboard/conversation/sales-marketing",
    icon: PieChart,
  },
  {
    name: "Travel",
    url: "/dashboard/conversation/travel",
    icon: Map,
  },
];

export const sidebarUser = {
  name: "Demo User",
  email: "demo@company.com",
  avatar: "/avatars/demo.jpg"
}; 