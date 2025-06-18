'use client'
import { useParams } from "next/navigation"
import { AIInput, AIInputTextarea, AIInputToolbar, AIInputTools, AIInputButton, AIInputSubmit } from "@/components/ui/kibo-ui/ai/input"
import { AIResponse } from "@/components/ui/kibo-ui/ai/response"
import { useState } from "react"
import { Paperclip, AudioLines } from "lucide-react"

export default function StandaloneConversationPage() {
  const params = useParams<{ conversationId: string }>()
  const [messages, setMessages] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    setMessages([...messages, inputValue])
    setInputValue("")
    // Here you would typically also send the message to your AI backend
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      {/* Messages area - scrollable */}
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            <AIResponse>{message}</AIResponse>
          </div>
        ))}
      </div>

      {/* Input area - fixed at bottom */}
      <div className="border-t bg-background">
        <AIInput onSubmit={handleSubmit}>
          <AIInputTextarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
          />
          <AIInputToolbar>
            <AIInputTools>
              <AIInputButton>
                <Paperclip className="h-4 w-4" />
              </AIInputButton>
              <AIInputSubmit type="submit">
                <AudioLines className="h-4 w-4" />
              </AIInputSubmit>
            </AIInputTools>
          </AIInputToolbar>
        </AIInput>
      </div>
    </div>
  )
} 