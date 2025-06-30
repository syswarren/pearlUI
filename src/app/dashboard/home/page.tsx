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
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Welcome to Pearl</h2>
          <p className="text-muted-foreground">
            Start a new conversation by typing your message below
          </p>
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
      </div>
    </div>
  )
} 