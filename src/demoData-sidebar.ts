import { Users, FileText, Activity, Folder, Frame, PieChart, Map, House, Command, MoreHorizontal } from "lucide-react";

export const sidebarMainNavTitle = "Main nav";
export const sidebarMenuTitle = "Folders";
export const sidebarProjectsTitle = "Conversations";

export const sidebarMainNav = [
    {
      name: "Home",
      url: "/quick-access",
      icon: House,
    },
    {
      name: "Activity",
      url: "/favorites",
      icon: Activity,
    },
    {
      name: "Documents",
      url: "/recent",
      icon: FileText,
    },
    {
      name: "Members",
      url: "/recent",
      icon: Users,
    },
  
  ];
  

export const sidebarMenu = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Folder,
    isActive: true,
    items: [
      { title: "Overview", url: "/dashboard/overview" },
      { title: "Stats", url: "/dashboard/stats" }
    ]
  },
  {
    title: "Reports",
    url: "/reports",
    icon: Folder,
    items: [
      { title: "Sales", url: "/reports/sales" },
      { title: "Inventory", url: "/reports/inventory" }
    ]
  },
  {
    title: "Documentation",
    url: "/docs",
    icon: Folder,
    items: [
      { title: "Introduction", url: "/docs/intro" },
      { title: "Tutorials", url: "/docs/tutorials" }
    ]
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Folder,
    items: [
      { title: "Profile", url: "/settings/profile" },
      { title: "Team", url: "/settings/team" }
    ]
  }
];


export const sidebarProjects = [
  {
    name: "Design Engineering",
    url: "#",
    icon: Frame,
  },
  {
    name: "Sales & Marketing",
    url: "#",
    icon: PieChart,
  },
  {
    name: "Travel",
    url: "#",
    icon: Map,
  },
];

export const sidebarUser = {
  name: "Demo User",
  email: "demo@company.com",
  avatar: "/avatars/demo.jpg"
}; 