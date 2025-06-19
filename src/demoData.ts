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

export interface ConversationMessage {
  id: string
  content: string
  from: 'user' | 'assistant'
  timestamp: Date
}

export interface Conversation {
  id: string
  title: string
  messages: ConversationMessage[]
  createdAt: Date
  updatedAt: Date
}

export const sampleConversations: Conversation[] = [
  {
    id: '1',
    title: 'Project Planning Discussion',
    messages: [
      {
        id: '1',
        content: 'Hello! How can I help you with your project planning today?',
        from: 'assistant',
        timestamp: new Date('2024-01-15T10:00:00Z')
      },
      {
        id: '2',
        content: 'I need help creating a project timeline for our new web application.',
        from: 'user',
        timestamp: new Date('2024-01-15T10:01:00Z')
      },
      {
        id: '3',
        content: 'I\'d be happy to help you create a project timeline! To get started, could you tell me:\n\n1. What type of web application are you building?\n2. What is your target launch date?\n3. How many team members do you have?\n4. What are the main features you want to include?',
        from: 'assistant',
        timestamp: new Date('2024-01-15T10:01:30Z')
      }
    ],
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:01:30Z')
  },
  {
    id: '2',
    title: 'Technical Architecture Review',
    messages: [
      {
        id: '1',
        content: 'Hi there! I\'m ready to help you review your technical architecture.',
        from: 'assistant',
        timestamp: new Date('2024-01-14T14:00:00Z')
      },
      {
        id: '2',
        content: 'We\'re considering using React with TypeScript for our frontend and Node.js for our backend. What do you think?',
        from: 'user',
        timestamp: new Date('2024-01-14T14:02:00Z')
      },
      {
        id: '3',
        content: 'That\'s an excellent choice! React with TypeScript provides great type safety and developer experience, while Node.js offers excellent performance and a rich ecosystem. Here are some considerations:\n\n**Frontend (React + TypeScript):**\n- ✅ Strong typing reduces runtime errors\n- ✅ Better IDE support and autocomplete\n- ✅ Easier refactoring and maintenance\n- ✅ Large community and ecosystem\n\n**Backend (Node.js):**\n- ✅ JavaScript/TypeScript across the stack\n- ✅ Excellent performance for I/O operations\n- ✅ Rich package ecosystem (npm)\n- ✅ Easy deployment and scaling\n\nWould you like me to help you plan the specific architecture patterns or discuss any concerns?',
        from: 'assistant',
        timestamp: new Date('2024-01-14T14:03:00Z')
      }
    ],
    createdAt: new Date('2024-01-14T14:00:00Z'),
    updatedAt: new Date('2024-01-14T14:03:00Z')
  }
] 