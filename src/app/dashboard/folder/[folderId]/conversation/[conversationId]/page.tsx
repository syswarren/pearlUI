'use client'

import { useParams } from "next/navigation"
import { AIInput, AIInputTextarea, AIInputToolbar, AIInputTools, AIInputButton, AIInputSubmit } from "@/components/ui/kibo-ui/ai/input"
import { AIResponse } from "@/components/ui/kibo-ui/ai/response"
import { AIMessage, AIMessageContent, AIMessageAvatar } from "@/components/ui/kibo-ui/ai/message"
import { AIConversation, AIConversationContent, AIConversationScrollButton } from "@/components/ui/kibo-ui/ai/conversation"
import { useState, useEffect } from "react"
import { Paperclip, AudioLines, Send } from "lucide-react"
import { sampleConversations, type ConversationMessage } from "@/demoData"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  from: 'user' | 'assistant'
  timestamp: Date
}

export default function FolderConversationPage() {
  const params = useParams()
  const conversationId = params.conversationId as string
  const isMobile = useIsMobile()
  
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Load sample conversation data if available
  useEffect(() => {
    const sampleConversation = sampleConversations.find(conv => conv.id === conversationId)
    
    if (sampleConversation) {
      setMessages(sampleConversation.messages)
    } else {
      // Default welcome message for new folder conversations
      setMessages([
        {
          id: '1',
          content: `Welcome to the conversation in folder "${params.folderId}"! How can I help you with this project?`,
          from: 'assistant',
          timestamp: new Date()
        }
      ])
    }
  }, [params.conversationId, params.folderId])

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

    // Simulate AI response with folder-specific content
    setTimeout(() => {
      const folderResponses = [
        `I understand you're working on the "${params.folderId}" project. Regarding "${userMessage.content}", let me help you with that. What specific aspect would you like to focus on?`,
        `Great question about the "${params.folderId}" project! "${userMessage.content}" is an important consideration. Here are some key points:\n\n1. **Project-specific insight** - This relates to your current folder\n2. **Implementation strategy** - How to approach this within your project scope\n3. **Next steps** - Recommended actions for this folder\n\nWould you like me to elaborate on any of these areas?`,
        `For the "${params.folderId}" project, "${userMessage.content}" is a key topic. Let me provide some context and recommendations that are specifically relevant to this project's needs and goals.`,
        `I see you're asking about "${userMessage.content}" in the context of "${params.folderId}". This is a common challenge in project management. Let me share some best practices that are particularly relevant to your current project.`
      ]
      
      const randomResponse = folderResponses[Math.floor(Math.random() * folderResponses.length)]
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        from: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
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
            <div className="flex items-center justify-end w-full mt-2">
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