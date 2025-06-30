'use client'
import { useParams } from "next/navigation"
import { AIInput, AIInputTextarea, AIInputToolbar, AIInputTools, AIInputButton, AIInputSubmit } from "@/components/ui/kibo-ui/ai/input"
import { AIResponse } from "@/components/ui/kibo-ui/ai/response"
import { AIMessage, AIMessageContent, AIMessageAvatar } from "@/components/ui/kibo-ui/ai/message"
import { AIConversation, AIConversationContent, AIConversationScrollButton } from "@/components/ui/kibo-ui/ai/conversation"
import { useState, useEffect } from "react"
import { Paperclip, AudioLines, ChevronDown, Send } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { sampleConversations, type ConversationMessage, type Conversation } from "@/demoData"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  from: 'user' | 'assistant'
  timestamp: Date
}

export default function StandaloneConversationPage() {
  const params = useParams<{ conversationId: string }>()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [selectedModel, setSelectedModel] = useState("GPT-4")
  const [isLoading, setIsLoading] = useState(false)
  const isMobile = useIsMobile()

  // Load conversation data from sample data or localStorage
  useEffect(() => {
    const conversationId = params.conversationId as string
    
    // First check sample conversations
    const sampleConversation = sampleConversations.find(conv => conv.id === conversationId)
    
    if (sampleConversation) {
      setMessages(sampleConversation.messages)
    } else {
      // Check localStorage for user-created conversations
      try {
        const storedConversations = JSON.parse(localStorage.getItem('conversations') || '[]')
        const storedConversation = storedConversations.find((conv: Conversation) => conv.id === conversationId)
        
        if (storedConversation) {
          setMessages(storedConversation.messages)
        } else {
          // Default welcome message for new conversations
          setMessages([
            {
              id: '1',
              content: 'Hello! How can I help you today?',
              from: 'assistant',
              timestamp: new Date()
            }
          ])
        }
      } catch (error) {
        console.error('Error loading conversation from localStorage:', error)
        // Default welcome message if there's an error
        setMessages([
          {
            id: '1',
            content: 'Hello! How can I help you today?',
            from: 'assistant',
            timestamp: new Date()
          }
        ])
      }
    }
  }, [params.conversationId])

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

    // Update the conversation in localStorage
    const conversationId = params.conversationId as string
    try {
      const storedConversations = JSON.parse(localStorage.getItem('conversations') || '[]')
      const conversationIndex = storedConversations.findIndex((conv: Conversation) => conv.id === conversationId)
      
      if (conversationIndex !== -1) {
        storedConversations[conversationIndex].messages.push(userMessage)
        storedConversations[conversationIndex].updatedAt = new Date()
        localStorage.setItem('conversations', JSON.stringify(storedConversations))
      }
    } catch (error) {
      console.error('Error updating conversation in localStorage:', error)
    }

    // Simulate AI response with more realistic content
    setTimeout(() => {
      const responses = [
        `I understand you're asking about "${userMessage.content}". Let me help you with that. Could you provide more details about what specifically you'd like to know?`,
        `Great question! "${userMessage.content}" is an important topic. Here are some key points to consider:\n\n1. **First consideration** - This is crucial for success\n2. **Second consideration** - This helps with implementation\n3. **Third consideration** - This ensures scalability\n\nWould you like me to elaborate on any of these points?`,
        `Regarding "${userMessage.content}", I can provide several insights. The approach depends on your specific needs and constraints. What's your primary goal with this?`,
        `I see you're interested in "${userMessage.content}". This is a common challenge that many teams face. Let me share some best practices and strategies that have worked well in similar situations.`
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        from: 'assistant',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
      
      // Update the conversation in localStorage with AI response
      try {
        const storedConversations = JSON.parse(localStorage.getItem('conversations') || '[]')
        const conversationIndex = storedConversations.findIndex((conv: Conversation) => conv.id === conversationId)
        
        if (conversationIndex !== -1) {
          storedConversations[conversationIndex].messages.push(aiMessage)
          storedConversations[conversationIndex].updatedAt = new Date()
          localStorage.setItem('conversations', JSON.stringify(storedConversations))
        }
      } catch (error) {
        console.error('Error updating conversation in localStorage:', error)
      }
      
      setIsLoading(false)
    }, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds
  }

  return (
    <div className={cn(
      "flex flex-col",
      isMobile 
        ? "h-screen -mt-4 -mx-4" 
        : "h-[calc(90vh+64px)] -mt-4 -mx-4"
    )} style={{ marginTop: isMobile ? '-64px' : '-64px' }}>
      {/* Messages area - scrollable and extends under breadcrumb */}
      <div className={cn(
        "flex overflow-hidden flex justify-center",
        isMobile ? "flex-1 pb-0" : "flex-1"
      )}>
        <div className="w-full max-w-[740px]">
          <AIConversation className="h-full">
            <AIConversationContent className={cn(
              "pt-4",
              isMobile ? "pb-0" : "pb-4"
            )}>
              {messages.map((message, index) => (
                <AIMessage 
                  key={message.id} 
                  from={message.from}
                  style={index === 0 ? { marginTop: '65px' } : {}}
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
      </div>

      {/* Input area - fixed at bottom with conditional styling for mobile */}
      <div className={cn(
        "flex justify-center px-4",
        isMobile 
          ? "fixed bottom-0 left-0 right-0 bg-background" 
          : "mb-5"
      )}>
        <div className="w-full max-w-[740px]">
          <AIInput 
            onSubmit={handleSubmit}
          >
            <AIInputTextarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
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
    </div>
  )
} 