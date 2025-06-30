'use client'

import { useState, useEffect } from "react"
import { AIInput, AIInputTextarea, AIInputToolbar, AIInputTools, AIInputButton, AIInputSubmit } from "@/components/ui/kibo-ui/ai/input"
import { AIResponse } from "@/components/ui/kibo-ui/ai/response"
import { AIMessage, AIMessageContent, AIMessageAvatar } from "@/components/ui/kibo-ui/ai/message"
import { AIConversation, AIConversationContent, AIConversationScrollButton } from "@/components/ui/kibo-ui/ai/conversation"
import { Paperclip, AudioLines, ChevronDown, Send, X, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  from: 'user' | 'assistant'
  timestamp: Date
}

interface ChatPanelProps {
  isOpen: boolean
  onToggle: () => void
  className?: string
}

export default function ChatPanel({ isOpen, onToggle, className }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m here to help you with your work. What would you like to discuss?',
      from: 'assistant',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [selectedModel, setSelectedModel] = useState("GPT-4")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      from: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand your question. Let me help you with that. Could you provide more context about what you're working on?",
        "That's an interesting point! Here are some thoughts on that:\n\n1. **Key consideration** - This is important\n2. **Next steps** - Here's what I recommend\n3. **Follow-up** - Something to keep in mind\n\nWould you like me to elaborate on any of these areas?",
        "Great question! This relates to several aspects of your work. Let me break it down and provide some actionable insights.",
        "I see what you're asking about. This is a common challenge, and here are some best practices that might help."
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        from: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000 + Math.random() * 2000)
  }

  return (
    <div
      className={cn(
        "bg-sidebar text-sidebar-foreground flex flex-col border-l transition-all duration-300 ease-in-out",
        isOpen ? "w-[24rem]" : "w-12",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-sidebar-border">
        {isOpen ? (
          <>
            <h3 className="font-semibold text-sm">Chat Assistant</h3>
            <Button
              onClick={onToggle}
              variant="ghost"
              size="icon"
              className="h-6 w-6"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button
            onClick={onToggle}
            variant="ghost"
            size="icon"
            className="h-6 w-6 mx-auto"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Content */}
      {isOpen && (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            <AIConversation className="flex-1">
              <AIConversationContent className="pt-4 pb-4">
                {messages.map((message) => (
                  <AIMessage 
                    key={message.id} 
                    from={message.from}
                  >
                    <AIMessageContent>
                      <AIResponse>{message.content}</AIResponse>
                    </AIMessageContent>
                  </AIMessage>
                ))}
                {isLoading && (
                  <AIMessage from="assistant">
                    <AIMessageContent>
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        <span className="text-sm text-muted-foreground">Pearl is thinking...</span>
                      </div>
                    </AIMessageContent>
                  </AIMessage>
                )}
              </AIConversationContent>
              <AIConversationScrollButton />
            </AIConversation>
          </div>

          {/* Input Area */}
          <div className="p-3 bg-sidebar">
            <AIInput onSubmit={handleSubmit}>
              <AIInputTextarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="min-h-[60px] max-h-[120px] resize-none bg-background"
              />
              <div className="flex items-center justify-between w-full mt-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-accent transition-colors focus:outline-none focus:ring-0 bg-background"
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
        </>
      )}

      {/* Collapsed State - Show icon */}
      {!isOpen && (
        <div className="flex-1 flex items-center justify-center">
          <MessageCircle className="h-6 w-6 text-sidebar-foreground/70" />
        </div>
      )}
    </div>
  )
} 