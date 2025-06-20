"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabNavLinks() {
  return (
    <div className="w-full border-b px-3">
      <div className="flex items-center">
        <Tabs defaultValue="api" className="w-full">
          <TabsList className="h-12 justify-start bg-transparent">
            <TabsTrigger 
              value="profile" 
              className="h-12 rounded-md px-2.5 text-sm text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="account" 
              className="h-12 rounded-md px-2.5 text-sm text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Account
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="h-12 rounded-md px-2.5 text-sm text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="api" 
              className="h-12 rounded-md px-2.5 text-sm text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              API
            </TabsTrigger>
            <TabsTrigger 
              value="members" 
              className="h-12 rounded-md px-2.5 text-sm text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Members
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
