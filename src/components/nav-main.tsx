"use client"

import { ChevronRight, Plus, type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import React from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
  label = "Platform",
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[],
  label?: string
}) {
  const pathname = usePathname();
  // Track user-toggled open state for folders
  const [openFolders, setOpenFolders] = React.useState<Record<string, boolean>>({});

  // Helper to determine if a folder or any of its children is active
  const isFolderActive = (item: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: { title: string; url: string }[];
  }) => {
    if (pathname === item.url) return true;
    if (item.items) {
      return item.items.some((subItem: { title: string; url: string }) => pathname === subItem.url);
    }
    return false;
  };

  // Handler for toggling folder open/close
  const handleToggle = (title: string) => {
    setOpenFolders((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between" style={{ paddingRight: 4 }}>
        <SidebarGroupLabel>{label}</SidebarGroupLabel>
        <button
          type="button"
          className="ml-2 flex items-center justify-center rounded-md p-1 hover:bg-sidebar-accent transition-colors"
          title="New folder"
          onClick={() => {/* TODO: Implement new folder logic */}}
        >
          <Plus className="w-3 h-3 text-muted-foreground" />
          <span className="sr-only">New folder</span>
        </button>
      </div>
      <SidebarMenu>
        {items.map((item) => {
          const active = isFolderActive(item);
          const isOpen =
            openFolders[item.title] !== undefined
              ? openFolders[item.title]
              : active; // open if active by default
          return (
            <Collapsible key={item.title} asChild open={isOpen}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url}>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction
                        className="data-[state=open]:rotate-90"
                        onClick={(e) => {
                          e.preventDefault();
                          handleToggle(item.title);
                        }}
                      >
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
