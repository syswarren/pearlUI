'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AIInput, AIInputTextarea, AIInputToolbar, AIInputTools, AIInputButton, AIInputSubmit } from "@/components/ui/kibo-ui/ai/input"
import { Paperclip, AudioLines, ChevronDown, Send, Calendar, Mail, Database } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  const router = useRouter()
  const [inputValue, setInputValue] = useState("")
  const [selectedModel, setSelectedModel] = useState("GPT-4")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    setIsLoading(true)

    // Generate a new conversation ID
    const conversationId = `conv-${Date.now()}`
    
    // Create the initial message for the new conversation
    const initialMessage = {
      id: '1',
      content: inputValue,
      from: 'user' as const,
      timestamp: new Date()
    }

    // Store the conversation data in localStorage or sessionStorage
    // This is a simple approach - in a real app you'd save to a database
    const newConversation = {
      id: conversationId,
      title: inputValue.length > 50 ? inputValue.substring(0, 50) + '...' : inputValue,
      messages: [initialMessage],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Store in localStorage for demo purposes
    const existingConversations = JSON.parse(localStorage.getItem('conversations') || '[]')
    existingConversations.push(newConversation)
    localStorage.setItem('conversations', JSON.stringify(existingConversations))

    // Navigate to the new conversation
    router.push(`/dashboard/conversation/${conversationId}`)
  }

  return (
    <div className="flex items-center justify-center h-[calc(100vh-120px)] px-4 sm:px-6 lg:px-8">
      {/* Centered chat input */}
      <div className="w-full max-w-2xl">
        <div className="flex flex-col px-4 gap-4 mb-10 w-full max-w-2xl">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold leading-8 text-foreground">
              Good morning, Julie
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 w-full px-4 sm:px-0">
            <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-gray-300 dark:border-gray-700 pb-4 sm:pb-0 sm:pr-8 w-full sm:w-auto">
              <span className="text-sm text-muted-foreground">Quota Progress</span>
              <div className="flex items-center mt-2 gap-2">
                <span className="text-sm font-semibold text-foreground">
                  €500,000 / €1.5M
                </span>
                <span className="text-sm text-foreground opacity-60">33%</span>
              </div>
            </div>
            <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-gray-300 dark:border-gray-700 pb-4 sm:pb-0 sm:pr-8 w-full sm:w-auto">
              <span className="text-sm text-muted-foreground">Pipeline progress</span>
              <div className="flex items-center mt-2 gap-2">
                <span className="text-sm font-semibold text-foreground">
                  €100,000 / €3M
                </span>
                <span className="text-sm text-foreground opacity-60">3.3%</span>
              </div>
            </div>
            <div className="flex flex-col w-full sm:w-auto">
              <span className="text-sm text-muted-foreground">Quarter Progress</span>
              <div className="flex items-center mt-2 gap-2">
                <span className="text-sm font-semibold text-foreground">
                  €250,000 / €325,000
                </span>
                <span className="text-sm text-foreground opacity-60">77%</span>
              </div>
            </div>
          </div>
        </div>
        
        <AIInput onSubmit={handleSubmit}>
          <AIInputTextarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What would you like to discuss today?"
            disabled={isLoading}
            className="min-h-[80px] max-h-[200px] resize-none"
          />
          <div className="flex items-center justify-between w-full mt-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-accent transition-colors focus:outline-none focus:ring-0"
                  disabled={isLoading}
                >
                  {selectedModel}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedModel("GPT-4")}>
                  GPT-4
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedModel("GPT-3.5")}>
                  GPT-3.5
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedModel("Claude")}>
                  Claude
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
        {/* Cards section moved here */}
        <div className="flex flex-col items-center sm:flex-row gap-4 justify-center mt-8">
          <Card className="w-[90%] h-[150px] sm:w-[210px] sm:h-[120px] rounded-[12px] overflow-hidden group">
            <CardContent className="flex flex-col h-full">
              <div className="flex flex-col">
                <div className="font-semibold text-[14px]">Prep my next meeting</div>
                <div className="text-muted-foreground text-[14px]">with Acme Corp</div>
              </div>
              <img src="/PrepMeetingIllu.svg" alt="Prep meeting" className="h-16 self-end opacity-80 mt-auto mr-[-24px] filter invert dark:filter-none transition-transform duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1" style={{ transform: 'rotate(-15deg)' }} />
            </CardContent>
          </Card>
          <Card className="w-[90%] h-[150px] sm:w-[210px] sm:h-[120px] rounded-[12px] overflow-hidden group">
            <CardContent className="flex flex-col h-full">
              <div className="flex flex-col">
                <div className="font-semibold text-[14px]">Draft a follow-up email</div>
                <div className="text-muted-foreground text-[14px]">to John Doe from Acme Corp</div>
              </div>
              <img src="/draftIllu.svg" alt="Draft email" className="h-24 self-end opacity-90 mt-[-10px] mr-[-20px] filter invert dark:filter-none transition-transform duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1" style={{ transform: 'rotate(15deg)' }} />
            </CardContent>
          </Card>
          <Card className="w-[90%] h-[150px] sm:w-[210px] sm:h-[120px] rounded-[12px] overflow-hidden group">
            <CardContent className="flex flex-col h-full">
              <div className="flex flex-col">
                <div className="font-semibold text-[14px]">Update Salesforce</div>
                <div className="text-muted-foreground text-[14px]">with collected information</div>
              </div>
              <img src="/crm_illu.svg" alt="Update Salesforce" className="h-20 self-end opacity-70 mt-[6px] mr-[-36px] filter invert dark:filter-none transition-transform duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1" style={{ transform: 'rotate(-15deg)' }} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 