'use client'
import { useParams } from "next/navigation"

export default function StandaloneConversationPage() {
  const params = useParams<{ conversationId: string }>()
  return (
    <div>
      <h1>Standalone Conversation Page</h1>
      <p>Conversation ID: {params.conversationId}</p>
      <p>This is a standalone conversation (not in a folder). You can customize this template as needed.</p>
    </div>
  )
} 