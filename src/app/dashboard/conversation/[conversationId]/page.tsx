'use client'
import { useParams } from "next/navigation"
import { AIInput, AIInputTextarea, AIInputToolbar, AIInputTools, AIInputButton, AIInputSubmit } from "@/components/ui/kibo-ui/ai/input"
import { AIResponse } from "@/components/ui/kibo-ui/ai/response"
import { useState } from "react"
import { Paperclip, AudioLines, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function StandaloneConversationPage() {
  const params = useParams<{ conversationId: string }>()
  const [messages, setMessages] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")
  const [selectedModel, setSelectedModel] = useState("GPT-4")

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
      <div className="bg-background flex justify-center">
        <div className="w-full max-w-[740px]">
          <AIInput onSubmit={handleSubmit}>
            <AIInputTextarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
            />
            <div className="flex items-center justify-between w-full mt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-accent transition-colors focus:outline-none focus:ring-0"
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
                <AIInputButton>
                  <Paperclip className="h-4 w-4" />
                </AIInputButton>
                <AIInputSubmit type="submit">
                  <AudioLines className="h-4 w-4" />
                </AIInputSubmit>
              </AIInputTools>
            </div>
          </AIInput>
        </div>
      </div>
    </div>
  )
} 