'use client'
import { useParams } from "next/navigation"
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Building2, BadgeDollarSign, BadgeInfo } from "lucide-react";
import { sidebarMenu } from "@/demoData-sidebar";
import ConversationsList, { Discussion } from "@/components/ConversationsList";

export default function FolderPage() {
  const params = useParams<{ folderId: string }>()
  const folder = sidebarMenu.find(f => f.url.endsWith(`/folder/${params.folderId}`));
  const folderTitle = folder?.title || params.folderId;

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
      dateTime: new Date().toISOString(), // Placeholder
      status: 'active', // Placeholder
      totalComments: Math.floor(Math.random() * 20) + 1, // Random placeholder
      commenters,
    };
  });

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
      <div className="mt-16">
        <h2 className="text-[14px] font-normal text-muted-foreground mb-2">Conversations</h2>
        <ConversationsList discussions={discussions} />
      </div>
    </div>
  );
} 