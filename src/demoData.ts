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
    id: 'team-update',
    title: 'Team Update',
    messages: [
      {
        id: '1',
        content: 'Hello! How can I help you with your team update today?',
        from: 'assistant',
        timestamp: new Date('2024-01-15T10:00:00Z')
      },
      {
        id: '2',
        content: 'I need help creating a team update for our weekly meeting.',
        from: 'user',
        timestamp: new Date('2024-01-15T10:01:00Z')
      },
      {
        id: '3',
        content: 'I\'d be happy to help you create a team update! To get started, could you tell me:\n\n1. What are the key accomplishments from this week?\n2. What challenges did the team face?\n3. What are the priorities for next week?\n4. Are there any blockers or dependencies?',
        from: 'assistant',
        timestamp: new Date('2024-01-15T10:01:30Z')
      }
    ],
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:01:30Z')
  },
  {
    id: 'review-proposal',
    title: 'Review Proposal',
    messages: [
      {
        id: '1',
        content: 'Hi there! I\'m ready to help you review your proposal.',
        from: 'assistant',
        timestamp: new Date('2024-01-14T14:00:00Z')
      },
      {
        id: '2',
        content: 'We\'re working on a proposal for a new client project. Can you help us review it?',
        from: 'user',
        timestamp: new Date('2024-01-14T14:02:00Z')
      },
      {
        id: '3',
        content: 'Absolutely! I\'d be happy to help review your proposal. To provide the most helpful feedback, could you share:\n\n**Proposal Details:**\n- What type of project is this?\n- What\'s the estimated timeline and budget?\n- Who are the key stakeholders?\n\n**Review Focus Areas:**\n- Are you looking for technical feasibility review?\n- Do you need help with pricing strategy?\n- Should we focus on competitive positioning?\n\nOnce you share the proposal details, I can provide specific recommendations and improvements.',
        from: 'assistant',
        timestamp: new Date('2024-01-14T14:03:00Z')
      }
    ],
    createdAt: new Date('2024-01-14T14:00:00Z'),
    updatedAt: new Date('2024-01-14T14:03:00Z')
  },
  {
    id: 'feedback-on-email-draft',
    title: 'Feedback on Email Draft',
    messages: [
      {
        id: '1',
        content: 'Hello! I\'m here to help you review and improve your email draft.',
        from: 'assistant',
        timestamp: new Date('2024-01-13T16:00:00Z')
      },
      {
        id: '2',
        content: 'I have an email draft for a client follow-up. Can you help me improve it?',
        from: 'user',
        timestamp: new Date('2024-01-13T16:01:00Z')
      },
      {
        id: '3',
        content: 'Of course! I\'d be happy to help you improve your email draft. To provide the best feedback, please share:\n\n**Email Context:**\n- Who is the recipient?\n- What\'s the purpose of this email?\n- What action do you want them to take?\n\n**Current Draft:**\n- Share your email content\n- Let me know if you have any specific concerns\n\nI can help with:\n- Tone and professionalism\n- Clarity and conciseness\n- Call-to-action effectiveness\n- Grammar and structure\n\nPlease paste your email draft and I\'ll provide specific suggestions!',
        from: 'assistant',
        timestamp: new Date('2024-01-13T16:02:00Z')
      }
    ],
    createdAt: new Date('2024-01-13T16:00:00Z'),
    updatedAt: new Date('2024-01-13T16:02:00Z')
  }
] 