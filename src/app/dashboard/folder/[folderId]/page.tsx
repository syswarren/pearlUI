'use client'
import { useParams } from "next/navigation"
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Building2, BadgeDollarSign, BadgeInfo } from "lucide-react";
import { sidebarMenu } from "@/demoData-sidebar";

export default function FolderPage() {
  const params = useParams<{ folderId: string }>()
  const folder = sidebarMenu.find(f => f.url.endsWith(`/folder/${params.folderId}`));
  const folderTitle = folder?.title || params.folderId;
  return (
    <div className="px-4 mt-4 sm:px-6 mt-6 lg:px-8 mt-8">
      <PageHeader
        variant="enriched"
        title={folderTitle}
        logoUrl="/pearl-logo.svg"
        descriptionItems={[
          { icon: <Building2 className="size-4" />, label: "Tech" },
          { icon: <BadgeDollarSign className="size-4" />, label: "$1.2M ARR" },
          { icon: <BadgeInfo className="size-4" />, label: (
            <>
              <span className="inline md:hidden">Important</span>
              <span className="hidden md:inline">Could help reach your annual revenue goal</span>
            </>
          ) },
        ]}
        action={<Button variant="secondary">View in Salesforce</Button>}
      />
      {/* Folder content goes here */}
    </div>
  );
} 