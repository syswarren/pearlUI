import { SquareTerminal, Bot, BookOpen, Settings2, Frame, PieChart, Map } from "lucide-react";

export const demoCompany = {
  name: "Pearl",
  menu: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "Overview", url: "/dashboard/overview" },
        { title: "Stats", url: "/dashboard/stats" }
      ]
    },
    {
      title: "Reports",
      url: "/reports",
      icon: Bot,
      items: [
        { title: "Sales", url: "/reports/sales" },
        { title: "Inventory", url: "/reports/inventory" }
      ]
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: BookOpen,
      items: [
        { title: "Introduction", url: "/docs/intro" },
        { title: "Tutorials", url: "/docs/tutorials" }
      ]
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        { title: "Profile", url: "/settings/profile" },
        { title: "Team", url: "/settings/team" }
      ]
    },
    {
      title: "New Section",
      url: "/new",
      icon: Bot,
      items: []
    }
  ],
  projects: [
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
    {
      name: "New Project",
      url: "/new",
      icon: Map
    }
  ],
  user: {
    name: "Demo User",
    email: "demo@company.com",
    avatar: "/avatar.jpg"
  }
}; 