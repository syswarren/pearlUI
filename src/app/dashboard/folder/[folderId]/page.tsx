'use client'
import { useParams, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Building2, BadgeDollarSign, BadgeInfo } from "lucide-react";
import { sidebarMenu } from "@/demoData-sidebar";
import ConversationsList, { Discussion } from "@/components/ConversationsList";

export default function FolderPage() {
  const params = useParams<{ folderId: string }>()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('overview')
  
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
            <h2 className="text-[14px] font-normal text-muted-foreground mb-2">Conversations</h2>
            <ConversationsList discussions={discussions} />
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
          { icon: <Building2 className="size-4" />, label: "Tech" },
          { icon: <BadgeDollarSign className="size-4" />, label: "$1.2M ARR" },
          { icon: <BadgeInfo className="size-4" />, label: (
            <>
              <span className="inline lg:hidden">Important</span>
              <span className="hidden lg:inline">Could help reach your annual revenue goal</span>
            </>
          ) },
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