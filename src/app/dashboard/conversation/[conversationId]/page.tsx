'use client'
import { useParams } from "next/navigation"
import { ChatInput, ChatInputTextArea, ChatInputSubmit } from "@/components/ui/chat-input"
import { useState } from "react"

export default function StandaloneConversationPage() {
  const params = useParams<{ conversationId: string }>()
  const [input, setInput] = useState("")
  const handleSubmit = () => {
    // For now, just clear the input
    setInput("")
  }
  return (
    <div className="flex flex-col min-h-svh">
      <div className="flex-1">
        <h1>Standalone Conversation Page</h1>
        <p>Conversation ID: {params.conversationId}</p>
        <p>This is a standalone conversation (not in a folder). You can customize this template as needed.</p>
      </div>
      <div className="sticky bottom-0 bg-background px-2 pb-2 pt-1">
        <ChatInput value={input} onChange={e => setInput(e.target.value)} onSubmit={handleSubmit} className="border-none">
          <ChatInputTextArea placeholder="Type your message..." />
          <ChatInputSubmit />
        </ChatInput>
      </div>
    </div>
  )
} 