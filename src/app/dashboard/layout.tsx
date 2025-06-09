"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import React from "react"
import { usePathname } from "next/navigation"
import { sidebarMenu } from "@/demoData-sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const segments = pathname.replace(/^\/+|\/+$/g, "").split("/")

  // Only show segments after "dashboard"
  const dashboardIndex = segments.indexOf("dashboard")
  const breadcrumbSegments = dashboardIndex >= 0 ? segments.slice(dashboardIndex + 1) : segments

  let folderTitle = null
  let conversationTitle = null

  // Try to find folder and conversation titles from the data
  if (breadcrumbSegments[0] === "folder" && breadcrumbSegments[1]) {
    const folder = sidebarMenu.find(f => f.url.endsWith(`/folder/${breadcrumbSegments[1]}`))
    folderTitle = folder?.title
    if (breadcrumbSegments[2] === "conversation" && breadcrumbSegments[3]) {
      const conversation = folder?.items?.find(
        c => c.url.endsWith(`/folder/${breadcrumbSegments[1]}/conversation/${breadcrumbSegments[3]}`)
      )
      conversationTitle = conversation?.title
    }
  }

  // Fallback: use formatted segment if not found in data
  function formatSegment(segment: string) {
    return segment
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  // Build the breadcrumb items
  const visibleSegments = []
  if (folderTitle) visibleSegments.push(folderTitle)
  if (conversationTitle) visibleSegments.push(conversationTitle)
  if (!folderTitle && breadcrumbSegments.length) visibleSegments.push(formatSegment(breadcrumbSegments[breadcrumbSegments.length - 1]))

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {visibleSegments.map((segment, idx) => (
                  <React.Fragment key={segment}>
                    <BreadcrumbItem>
                      {idx === visibleSegments.length - 1 ? (
                        <BreadcrumbPage>
                          {segment}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href="#">
                          {segment}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {idx < visibleSegments.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 