"use client"

import * as React from "react"
import { Search, Settings, Users, FileText, Calendar, Activity, Map } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface CommandPaletteProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setIsOpen = isControlled ? onOpenChange : setInternalOpen

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen?.(!isOpen)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [isOpen, setIsOpen])

  const runCommand = React.useCallback((command: () => unknown) => {
    setIsOpen?.(false)
    command()
  }, [setIsOpen])

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput placeholder="Search commands..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => window.location.href = '/dashboard/home')}>
            <Search className="mr-2 h-4 w-4" />
            <span>Go to Home</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.href = '/dashboard/activity')}>
            <Activity className="mr-2 h-4 w-4" />
            <span>Go to Activity</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.href = '/dashboard/calendar')}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Go to Calendar</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.href = '/dashboard/documents')}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Go to Documents</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.href = '/dashboard/territory')}>
            <Map className="mr-2 h-4 w-4" />
            <span>Go to Territory</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Settings">
          <CommandItem onSelect={() => runCommand(() => window.location.href = '/dashboard/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.href = '/dashboard/members')}>
            <Users className="mr-2 h-4 w-4" />
            <span>Manage Members</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
} 