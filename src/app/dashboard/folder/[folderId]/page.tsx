'use client'
import { useParams, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Users, BadgeDollarSign, Paperclip, AudioLines } from "lucide-react";
import { sidebarMenu } from "@/demoData-sidebar";
import ConversationsList, { Discussion } from "@/components/ConversationsList";
import { AIInput, AIInputTextarea, AIInputTools, AIInputButton } from "@/components/ui/kibo-ui/ai/input";

export default function FolderPage() {
  const params = useParams<{ folderId: string }>()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('overview')
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const folder = sidebarMenu.find(f => f.url.endsWith(`/folder/${params.folderId}`));
  const folderTitle = folder?.title || params.folderId;

  // Get the active tab from URL or default to 'overview'
  useEffect(() => {
    const tab = searchParams.get('tab') || 'overview';
    setActiveTab(tab);
  }, [searchParams]);

  // Generate discussions from folder items
  const demoAvatars = [
    { id: 1, name: 'Demo User', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Demo User 2', imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, name: 'Demo User 3', imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 4, name: 'Demo User 4', imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg' },
  ];
  const discussions: Discussion[] = (folder?.items || []).map((item, idx) => {
    let commenters: import("@/components/ConversationsList").Commenter[] = [];
    if (idx % 3 === 0) commenters = demoAvatars.slice(0, 3);
    else if (idx % 3 === 1) commenters = [];
    else commenters = demoAvatars.slice(0, 1);
    return {
      id: idx + 1,
      title: item.title,
      href: item.url,
      author: { name: '', href: '' }, // Not shown
      date: '1d ago', // Placeholder
      dateTime: '2024-01-01T00:00:00.000Z', // Static placeholder
      status: 'active', // Placeholder
      totalComments: 5 + idx, // Static placeholder
      commenters,
    };
  });

  // Create navigation items
  const navigationItems = [
    { id: 'overview', label: 'Overview', href: `/dashboard/folder/${params.folderId}` },
    { id: 'touchpoints', label: 'Touchpoints', href: `/dashboard/folder/${params.folderId}` },
    { id: 'contacts', label: 'Contacts', href: `/dashboard/folder/${params.folderId}` },
    { id: 'documents', label: 'Documents', href: `/dashboard/folder/${params.folderId}` },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="mt-16">
            {/* Stats Section */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 w-full">
                <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-gray-300 dark:border-gray-700 pb-4 sm:pb-0 sm:pr-8 w-full sm:w-auto">
                  <span className="text-sm text-muted-foreground">Deal value</span>
                  <div className="flex items-center mt-2 gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      €850,000 / €1.2M
                    </span>
                    <span className="text-sm text-foreground opacity-60">71%</span>
                  </div>
                </div>
                <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-gray-300 dark:border-gray-700 pb-4 sm:pb-0 sm:pr-8 w-full sm:w-auto">
                  <span className="text-sm text-muted-foreground">Engagement score</span>
                  <div className="flex items-center mt-2 gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      8.5 / 10
                    </span>
                    <span className="text-sm text-foreground opacity-60">85%</span>
                  </div>
                </div>
                <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-gray-300 dark:border-gray-700 pb-4 sm:pb-0 sm:pr-8 w-full sm:w-auto">
                  <span className="text-sm text-muted-foreground">Last activity</span>
                  <div className="flex items-center mt-2 gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      2 days ago
                    </span>
                    <span className="text-sm text-foreground opacity-60">Active</span>
                  </div>
                </div>
                <div className="flex flex-col w-full sm:w-auto">
                  <span className="text-sm text-muted-foreground">Primary contact</span>
                  <div className="flex items-center mt-2 gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      Sophie Tremblay
                    </span>
                    <span className="text-sm text-foreground opacity-60">VP of Operations</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Summary Section */}
            <div className="mb-8">
              <h2 className="text-[14px] font-normal text-muted-foreground mb-3">Summary</h2>
              <div className="p-4 rounded-lg bg-gradient-to-r from-muted/100 to-transparent">
                <div className="text-sm text-foreground leading-relaxed max-w-3xl space-y-0">
                  <div><strong>Status:</strong> The deal is progressing well with strong engagement from the client.</div>
                  <div><strong>Initial discovery:</strong> Completed</div>
                  <div><strong>Technical validation:</strong> Approved by client's tech team</div>
                  <div><strong>Contract:</strong> In negotiation</div>
                  <div><strong>Budget:</strong> Awaiting final approval from our side</div>
                  <div><strong>Next steps:</strong> Finalize contract terms</div>
                </div>
              </div>
            </div>
            
            {/* Conversations Section */}
            <h2 className="text-[14px] font-normal text-muted-foreground mb-2">Conversations</h2>
            <ConversationsList discussions={discussions} />
            
            {/* View More Button */}
            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View more
              </Button>
            </div>
            
            {/* Chat Input */}
            <div className="mt-16">
              <AIInput onSubmit={(e) => {
                e.preventDefault()
                if (!inputValue.trim() || isLoading) return
                // Handle chat submission here
                console.log('Chat submitted:', inputValue)
                setInputValue("")
              }}>
                <AIInputTextarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about this account..."
                  disabled={isLoading}
                  className="resize-none"
                />
                <div className="flex items-center justify-end w-full mt-2">
                  <AIInputTools>
                    <AIInputButton variant="default" disabled={isLoading}>
                      <Paperclip className="h-4 w-4" />
                    </AIInputButton>
                    <AIInputButton variant="default" disabled={isLoading}>
                      <AudioLines className="h-4 w-4" />
                    </AIInputButton>
                  </AIInputTools>
                </div>
              </AIInput>
            </div>
          </div>
        );
      case 'touchpoints':
        return (
          <div className="mt-16">
            <h2 className="text-[14px] font-normal text-muted-foreground mb-2">Touchpoints</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Recent Interactions</h3>
                <p className="text-sm text-muted-foreground">No recent touchpoints found for this folder.</p>
              </div>
            </div>
          </div>
        );
      case 'contacts':
        return (
          <div className="mt-16">
            <h2 className="text-[14px] font-normal text-muted-foreground mb-2">Contacts</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Key Contacts</h3>
                <p className="text-sm text-muted-foreground">No contacts found for this folder.</p>
              </div>
            </div>
          </div>
        );
      case 'documents':
        return (
          <div className="mt-16">
            <h2 className="text-[14px] font-normal text-muted-foreground mb-2">Documents</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Related Documents</h3>
                <p className="text-sm text-muted-foreground">No documents found for this folder.</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="mt-16">
            <h2 className="text-[14px] font-normal text-muted-foreground mb-2">Conversations</h2>
            <ConversationsList discussions={discussions} />
          </div>
        );
    }
  };

  return (
    <div className="px-4 mt-4 sm:px-6 mt-6 lg:px-8 mt-8">
      <PageHeader
        variant="enriched"
        title={folderTitle}
        logoUrl="/logo_folder.png"
        descriptionItems={[
          { icon: <Users className="size-4" />, label: "50-100 employees" },
          { icon: <BadgeDollarSign className="size-4" />, label: "$1.2M ARR" },
        ]}
        action={<Button variant="secondary">View in Salesforce</Button>}
      />
      
      <div className="mt-10">
        <div className="border-b border-border">
          <div className="flex w-full overflow-x-auto scrollbar-hide">
            {navigationItems.map((item, index) => (
              <Link
                key={item.id}
                href={`${item.href}?tab=${item.id}`}
                className={`
                  flex-shrink-0 py-3 text-sm font-medium transition-colors relative
                  ${index === 0 ? 'ml-0 mr-4' : 'mx-4'}
                  ${activeTab === item.id 
                    ? 'text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                {item.label}
                {activeTab === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                )}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="mt-10 pb-12">
          {renderContent()}
        </div>
      </div>
    </div>
  );
} 