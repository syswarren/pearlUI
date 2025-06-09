"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import Image from "next/image"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { sidebarMenu, sidebarProjects, sidebarUser, sidebarMainNav, sidebarMainNavTitle, sidebarMenuTitle, sidebarProjectsTitle } from "@/demoData-sidebar"
import { NavMainNav } from "@/components/nav-projects"
import { demoCompany } from "@/demoData"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-7 items-center justify-center">
                  <Image src="/pearl-logo.svg" alt="Pearl Logo" width={28} height={28} className="size-7" style={{ filter: 'var(--logo-filter)' }} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Pearl</span>
                  <span className="truncate text-xs opacity-60">Alpha</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMainNav items={sidebarMainNav} label={sidebarMainNavTitle} hideLabel={true} />
        <NavMain items={sidebarMenu} label={sidebarMenuTitle} />
        <NavProjects projects={sidebarProjects} label={sidebarProjectsTitle} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
